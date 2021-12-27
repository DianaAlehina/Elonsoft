import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReactComponent as Telega } from '../../svg/telega.svg';
import Filter from "../Filter";

function createData(name, number, email, depart, subDep, date, character, telegram) {
	return { name, number, email, depart, subDep, date, character, telegram };
}

const rows = [
	createData('Petrov Ivan', 7887878, 'lalla@la', 'HIGH', 'subHIGH', '2522 г.', 'cook', '@lala'),
	createData('Petrov Ivan', 7887878, 'lalla@la', 'HIGH', 'subHIGH', '2522 г.', 'cook', '@lala'),
	createData('Petrov Ivan', 7887878, 'lalla@la', 'HIGH', 'subHIGH', '2522 г.', 'cook', '@lala'),
	createData('Petrov Ivan', 7887878, 'lalla@la', 'HIGH', 'subHIGH', '2522 г.', 'cook', '@lala'),
	createData('Petrov Ivan', 7887878, 'lalla@la', 'HIGH', 'subHIGH', '2522 г.', 'cook', '@lala'),
	createData('Petrov Ivan', 7887878, 'lalla@la', 'HIGH', 'subHIGH', '2522 г.', 'cook', '@lala'),
	createData('Petrov Ivan', 7887878, 'lalla@la', 'HIGH', 'subHIGH', '2522 г.', 'cook', '@lala'),
	createData('Petrov Ivan', 7887878, 'lalla@la', 'HIGH', 'subHIGH', '2522 г.', 'cook', '@lala'),

];

const Confirmed = () => {
	return (
		<>
		<Filter/>
		<TableContainer >
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell style={{color: '#afaeae'}}>Выпускник</TableCell>
						<TableCell style={{color: '#afaeae'}} align="left">Вуз, факультет</TableCell>
						<TableCell style={{color: '#afaeae'}} align="left">Выпуск</TableCell>
						<TableCell style={{color: '#afaeae'}} align="left">Чем полезен</TableCell>
						<TableCell style={{color: '#afaeae'}} align="left"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
						>
							<TableCell align="left">
								{row.name}
								<br/>
								<span style={{color: '#afaeae'}}>{row.number}</span>
								<br/>
								<span style={{color: '#afaeae'}}>{row.email}</span>
							</TableCell>
							<TableCell align="left">
								{row.depart}
								<br/>
								<span style={{color: '#afaeae'}}>{row.subDep}</span>
							</TableCell>
							<TableCell align="left">{row.date}</TableCell>
							<TableCell align="left">{row.character}</TableCell>
							<TableCell align="right">
								<a style={{color: 'blue', textDecoration: 'none'}} href={`http://t.me/${row.telegram}`}>
									{row.telegram}
									<Telega style={{transform: "translate(50%, 20%)"}}/>
								</a>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
			</>
	);
}

export default Confirmed;
