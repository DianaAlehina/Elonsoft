import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from '@mui/icons-material/Search';


export const currencies = [
	{
		value: 'ЮФУ',
		label: 'ЮФУ',
	},
	{
		value: 'ДГТУ',
		label: 'ДГТУ',
	},
	{
		value: 'РИНХ',
		label: 'РИНХ',
	},
];

export const departs = [
	{
		value: 'Журналистика',
		label: 'Журналистика',
	},
	{
		value: 'Информационная безопасность',
		label: 'Информационная безопасность',
	},
	{
		value: 'Экономика',
		label: 'Экономика',
	},
];

export const years = [
	{
		value: '2020',
		label: '2020',
	},
	{
		value: '2021',
		label: '2021',
	},
	{
		value: '2022',
		label: '2022',
	},
];

const Filter = () => {
	const [currency, setCurrency] = React.useState('ЮФУ');
	const [depart, setDepart] = React.useState('Информационная безопасность');
	const [year, setYear] = React.useState('2020');

	const handleChangeCurrency = (event) => {
		setCurrency(event.target.value);
	};
	const handleDepart = (event) => {
		setDepart(event.target.value);
	};
	const handleYaer = (event) => {
		setYear(event.target.value);
	};
	return (
		<>
			<TextField
				label="Поиск"
				id="outlined-start-adornment"
				sx={{ m: 1, width: '80ch' }}
				InputProps={{
					startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
				}}
			/>
			<TextField
				id="outlined-select-currency"
				select
				label="Вуз"
				value={currency}
				onChange={handleChangeCurrency}
				sx={{ m: 1, width: '80ch' }}
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
				value={depart}
				onChange={handleDepart}
				sx={{ m: 1, width: '65ch' }}
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
				label="Год выпуска"
				value={year}
				onChange={handleYaer}
				sx={{ m: 1, width: '20ch' }}
			>
				{years.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
		</>
	)
}

export default Filter
