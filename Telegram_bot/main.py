from collections import defaultdict
import telebot
from datetime import datetime
import datetime
from telebot import types
import psycopg2
from psycopg2 import Error
from data import token, user, password, host, port, database
bot = telebot.TeleBot(token)

BEGIN, START, UNIVERSITY, FACULTY, YEAR, ADDITION, NAME, PHONE, EMAIL, PHOTO, CONFIRM, SAVE = range(12)
USER_STATE = defaultdict(lambda: BEGIN)
DATA = {}
data_list = {"email": "", "password_hash": '', "full_name": '', "phone_number": "", "graduated_in": "", "avatar": "",
             "about_myself": '', "faculty_id": "", "university_id": '', "status": "", "telegram_username": ""}


def connect_db():
    try:
        connection = psycopg2.connect(user=user,
                                      password=password,
                                      host=host,
                                      port=port,
                                      database=database)
        cursor = connection.cursor()
        print("Информация о сервере PostgreSQL")
        print(connection.get_dsn_parameters(), "\n")
        return cursor, connection
    except (Exception, Error) as error:
        print("Ошибка при работе с PostgreSQL", error)


def get_universities():
    cursor, conn = connect_db()
    cursor.execute("SELECT * from universities")
    record = cursor.fetchall()
    print("Результат", record[0][1])
    print("Результат", record)
    cursor.close()
    conn.close()
    return record


def get_university_id(university):
    cursor, conn = connect_db()
    cursor.execute("SELECT id from universities where name = (%s) ", (university,))
    record = cursor.fetchall()
    print("Результат", record[0][0])
    cursor.close()
    conn.close()
    return record[0][0]


def get_university(university_id):
    cursor, conn = connect_db()
    cursor.execute("SELECT name from universities where id = (%s) ", (university_id,))
    record = cursor.fetchone()
    if not record:
        return '*'
    print("Результат", record[0])
    cursor.close()
    conn.close()
    return record[0]


def get_faculty_id(faculty):
    cursor, conn = connect_db()
    cursor.execute("SELECT id from faculties where name = (%s) ", (faculty,))
    record = cursor.fetchall()
    if not record:
        cursor.execute("SELECT id from faculties where name = (%s) ", (faculty + " ",))
        record = cursor.fetchall()
        if not record:
            print("check it!!!!!!", faculty)
            return '*'
    print("Результат", record[0][0])
    cursor.close()
    conn.close()
    return record[0][0]


def get_faculty(faculty_id):
    cursor, conn = connect_db()
    cursor.execute("SELECT name from faculties where id = (%s) ", (faculty_id,))
    record = cursor.fetchone()
    if not record:
        return '*'
    print("Результат", record[0])
    cursor.close()
    conn.close()
    return record[0]


def get_faculties(university_id):
    cursor, conn = connect_db()
    cursor.execute("SELECT * from faculties where university_id = (%s) ", (university_id,))
    record = cursor.fetchall()
    print("Результат", record)
    cursor.close()
    conn.close()
    return record


def get_data_by_nickname(nickname):
    cursor, conn = connect_db()
    cursor.execute("SELECT * from users where telegram_username = (%s) ", (nickname,))
    record = cursor.fetchone()
    # print("Результат", record)
    cursor.close()
    conn.close()
    return record


def create_universities_keyboard():
    kb = types.ReplyKeyboardMarkup(row_width=1)
    universities = get_universities()
    buttons = [types.InlineKeyboardButton(text=u[1]) for u in universities]
    kb.add(*buttons)
    return kb


def create_faculties_keyboard(university_id):
    kb = types.ReplyKeyboardMarkup(row_width=1)
    faculties = get_faculties(university_id)
    buttons = [types.InlineKeyboardButton(text=f[1]) for f in faculties]
    kb.add(*buttons)
    return kb


def get_state(message):
    return USER_STATE[message.chat.id]


def update_state(message, state):
    USER_STATE[message.chat.id] = state


@bot.message_handler(commands=['reset'])
def handle_confirmation(message):
    # db_delete_val(message.from_user.id)
    bot.send_message(message.chat.id, 'Все удалено :(')


@bot.message_handler(commands=['whois'])
def handle_confirmation(message):
    if len(message.text.split(' ')) < 2:
        bot.send_message(message.from_user.id, 'Ой, а кого ищем то? Формат команды "/whois username"')
        return
    nick = message.text.split(' ')[1]
    record = get_data_by_nickname(nick)
    print(record)
    if not record:
        bot.send_message(message.from_user.id, 'Такого человека не знаем :(')
        return
    faculty = get_faculty(record[8])
    university = get_university(record[9])
    bot.send_message(message.from_user.id, 'Знаем таких...:)')
    bot.send_message(message.from_user.id,
                     'Это же {}!\nemail: {}\nphone: {}\n\n{}\n{}\nгод выпуска: {}'.format(record[3],
                                                                                          record[1],
                                                                                          record[4],
                                                                                          university,
                                                                                          faculty,
                                                                                          record[5].year
                                                                                          ))


@bot.message_handler(func=lambda message: get_state(message) == BEGIN, content_types=['text'])
def get_text_messages(message):
    print(message.from_user.username)
    bot.send_message(message.from_user.id, 'Хочешь подать заявку на вступление в ассоциацию? Введи команду /add')
    update_state(message, START)


@bot.message_handler(commands=['start'])
def handle_confirmation(message):
    bot.send_message(message.from_user.id, 'Ок, начнем сначала. Хорошо? Напиши /add как захочешь возобновить '
                                           'заполнение анкеты', reply_markup=types.ReplyKeyboardRemove())
    update_state(message, START)


@bot.message_handler(func=lambda message: get_state(message) == START, commands=['add'])
def handle_university_name(message):
    data_list["telegram_username"] = message.from_user.username
    bot.send_message(message.chat.id, 'Напиши название университета :)', reply_markup=create_universities_keyboard())
    print(message.text)
    update_state(message, UNIVERSITY)


@bot.message_handler(func=lambda message: get_state(message) == UNIVERSITY)
def handle_faculty(message):
    university_id = get_university_id(message.text)
    data_list["university_id"] = university_id
    bot.send_message(message.chat.id, 'А факультет какой?', reply_markup=create_faculties_keyboard(university_id))
    print(message.text)
    update_state(message, FACULTY)


@bot.message_handler(func=lambda message: get_state(message) == FACULTY)
def handle_year(message):
    faculty_id = get_faculty_id(message.text)
    data_list["faculty_id"] = faculty_id
    bot.send_message(message.chat.id, 'Напиши год выпуска, пожалуйста', reply_markup=types.ReplyKeyboardRemove())
    print(message.text)
    update_state(message, YEAR)


@bot.message_handler(func=lambda message: get_state(message) == YEAR)
def handle_addition(message):
    if (not message.text.isdigit()) or len(message.text) < 4:
        bot.send_message(message.chat.id, "Напиши числом")
        update_state(message, FACULTY)
        return
    data_list["graduated_in"] = datetime.datetime.strptime(message.text + '-01-01', '%Y-%m-%d')
    print(data_list["graduated_in"])
    bot.send_message(message.chat.id, 'Какой вклад ты можешь привнести?')
    print(message.text)
    update_state(message, ADDITION)


@bot.message_handler(func=lambda message: get_state(message) == ADDITION)
def handle_name(message):
    data_list["about_myself"] = message.text
    bot.send_message(message.chat.id, 'Укажи свое ФИО')
    print(message.text)
    update_state(message, NAME)


@bot.message_handler(func=lambda message: get_state(message) == NAME)
def handle_phone(message):
    data_list["full_name"] = message.text
    bot.send_message(message.chat.id, 'Телефончик дашь? ;)')
    print(message.text)
    update_state(message, PHONE)


@bot.message_handler(func=lambda message: get_state(message) == PHONE)
def handle_email(message):
    data_list["phone_number"] = message.text
    bot.send_message(message.chat.id, 'А мыло?))')
    print(message.text)
    update_state(message, EMAIL)


@bot.message_handler(func=lambda message: get_state(message) == EMAIL)
def handle_photo(message):
    data_list["email"] = message.text
    bot.send_message(message.chat.id, 'Теперь фото, как на паспорт')
    print(message.text)
    update_state(message, PHOTO)


@bot.message_handler(func=lambda message: get_state(message) == PHOTO, content_types=['photo'])
def handle_confirm(message):
    photo_id = message.photo[-1].file_id
    photo_file = bot.get_file(photo_id)
    downloaded_file = bot.download_file(photo_file.file_path)
    data_list["avatar"] = psycopg2.Binary(downloaded_file)
    update_state(message, CONFIRM)
    bot.send_message(message.chat.id, 'Могу отправлять данные?')


@bot.message_handler(func=lambda message: get_state(message) == PHOTO, content_types=['text'])
def handle_photo(message):
    bot.send_message(message.chat.id, 'Мне бы фоточку, а не это все')


@bot.message_handler(func=lambda message: get_state(message) == CONFIRM)
def handle_finish(message):
    if 'нет' in message.text.lower():
        bot.send_message(message.chat.id, 'Ну ладно, как хочешь.')
    else:
        print(data_list)
        cursor, conn = connect_db()
        query = """INSERT INTO users (email, full_name, phone_number, graduated_in, avatar, about_myself, faculty_id, 
        university_id, telegram_username) VALUES
         (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (data_list["email"], data_list["full_name"], data_list["phone_number"], data_list["graduated_in"],
                  data_list["avatar"], data_list["about_myself"], data_list["faculty_id"], data_list["university_id"],
                  data_list["telegram_username"])
        cursor.execute(query, values)
        conn.commit()
        bot.send_message(message.chat.id, 'Сделано!')
    update_state(message, START)


bot.polling()
