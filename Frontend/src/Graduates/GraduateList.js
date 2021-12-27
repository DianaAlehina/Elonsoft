import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import {ReactComponent as SfeduLogo} from "../svg/sfedu-logo.svg"
import Button from "@mui/material/Button";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Confirmed from "./Tabs/Confirmed";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {Formik} from "formik";
import MenuItem from "@mui/material/MenuItem";
import {
	currencies,
	departs,
	years
} from "./Filter";

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: #E5E5E5;
  z-index: 100;
`

const Header = styled.div`
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  position: fixed;
  background-color: #353E47;
  z-index: 100;
`;

const Title = styled.span`
	align-items: center;
	padding: 8px 24px 8px 32px;
	color: white;
	font-style: italic;
	font-size: 20px;
	font-weight: bold;
	margin-top: 5px;
	display: block-inline
`;

const StyledContainer = styled.div`
	margin: 40px;
	margin-top: 100px;
`

const TableHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const StyledTableContainer = styled.div`
	margin-top: 50px;
  background-color: white;
	
`

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const GraduateList = () => {
	const [value, setValue] = React.useState(0);
	const [open, setOpen] = React.useState(true);
	const [currency, setCurrency] = React.useState('ЮФУ');
	const [depart, setDepart] = React.useState('Информационная безопасность');
	const [year, setYear] = React.useState('2020');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);


	const handleChangeCurrency = (event) => {
		setCurrency(event.target.value);
	};
	const handleDepart = (event) => {
		setDepart(event.target.value);
	};
	const handleYaer = (event) => {
		setYear(event.target.value);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onSubmit = (values) => {
		console.log(values)
	};


	return (
		<Background>
			<Header>
				<SfeduLogo style={{transform: "translate(50%, 20%)"}}/>
				<Title>ЮФУ</Title>
			</Header>
			<StyledContainer>
				<TableHeader>
					<h1>Выпускники</h1>
					<Button
						onClick={handleOpen}
						variant="contained"
						sx={{
							mt: 3,
							mb: 2,
							ml: 1,
							backgroundColor: '#353E47',
							position: 'static',
							width: '170px',
							height: '50px',
							fontSize: '17px',
						}}
					>
						+ Выпускник
					</Button>
				</TableHeader>
				<StyledTableContainer>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Подтвержденные" {...a11yProps(0)} />
						<Tab label="Заявки" {...a11yProps(1)} />
						<Tab label="Архив" {...a11yProps(2)} />
					</Tabs>
					<TabPanel value={value} index={0}>
						<Confirmed/>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Confirmed/>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Confirmed/>
					</TabPanel>
				</StyledTableContainer>

			</StyledContainer>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Создать выпускника
					</Typography>
					<Formik
						initialValues={{
							fio: '',
							depart: '',
							subDep: '',
							date: '',
							number: '',
							email: '',
							telegram: '' ,
							character: '' ,
						}}
						onSubmit={onSubmit}
					>
						{({
							  values,
							  handleChange,
							  handleBlur,
							  handleSubmit,
						  }) => (
							<form onSubmit={handleSubmit}>
								<TextField
									label="ФИО"
									name="fio"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.fio}
									margin="normal"
									fullWidth
								/>
								<TextField
									id="outlined-select-currency"
									select
									label="Вуз"
									name="depart"
									value={currency}
									onChange={handleChangeCurrency}
									sx={{mt:1, width: '50ch' }}
								>
									{currencies.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									id="outlined-select-currency"
									select
									label="Факультет"
									name="subDep"
									value={depart}
									onChange={handleDepart}
									sx={{mt:2, width: '50ch' }}
								>
									{departs.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									id="outlined-select-currency"
									select
									name="date"
									label="Год выпуска"
									value={year}
									onChange={handleYaer}
									sx={{mt:2, width: '50ch' }}
								>
									{years.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									label="Телефон"
									name="number"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.number}
									margin="normal"
									fullWidth
								/>
								<TextField
									label="Email"
									name="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									margin="normal"
									fullWidth
								/>
								<TextField
									label="Telegram"
									name="telegram"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.telegram}
									margin="normal"
									fullWidth
								/>
								<TextField
									label="Чем полезен"
									name="character"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.character}
									margin="normal"
									sx={{mt:2, width: '50ch', height:'10ch' }}
								/>
								<Button
									onClick={handleClose}
									variant="contained"
									sx={{
										mt: 3,
										mb: 2,
										ml: 19,
										backgroundColor: '#ffffff',
										position: 'static',
										width: '110px',
										height: '56px',
										color: "black"
									}}
								>
									Отмена
								</Button>
								<Button
									type="submit"
									variant="contained"
									sx={{
										mt: 3,
										mb: 2,
										ml: 1,
										backgroundColor: '#353E47',
										position: 'static',
										width: '130px',
										height: '56px',
									}}
								>
									Сохранить
								</Button>
							</form>
						)}
					</Formik>
				</Box>
			</Modal>
		</Background>
	)
}

export default GraduateList;
