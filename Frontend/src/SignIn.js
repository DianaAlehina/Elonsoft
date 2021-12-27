import styled from '@emotion/styled';
import { Form, Formik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import {ReactComponent as Logorus} from "./svg/logorus.svg"
import {ReactComponent as SfeduLogo} from "./svg/sfedu-logo.svg";


const FullScreen = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: #353E47;
  z-index: 100;
`;

const schema = Yup.object().shape({
	login: Yup.string().required(),
	password: Yup.string().required()
});

const SingIn = () => {

	const onSubmit = (values) => {
		console.log(values)
	};

	return (
		<FullScreen>
		<div>
			<Container component="main" maxWidth="xs">
				<Logorus  style={{transform: "translate(130%, 20%)"}}/>
				<Box
					sx={{
						padding: 3,
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						backgroundColor: '#FFFFFF',
						borderRadius: 2
					}}
				>
			<h1>Вход</h1>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={onSubmit}
			>
				{({
					  values,
					  errors,
					  touched,
					  handleChange,
					  handleBlur,
					  handleSubmit,
					  isSubmitting,
					  /* and other goodies */
				  }) => (
					<form onSubmit={handleSubmit}>
						<TextField
							name="email"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							margin="normal"
							fullWidth
						/>
						{errors.email && touched.email && errors.email}
						<TextField
							type="password"
							name="password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							margin="normal"
							fullWidth
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Запомнить меня"
						/>
						{errors.password && touched.password && errors.password}
						<Button
							type="submit"
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								ml: 1,
								backgroundColor: '#353E47',
								position: 'static',
								width: '336px',
								height: '56px',
							}}
						>
							Войти
						</Button>
					</form>
				)}
			</Formik>
				</Box>
				<Grid container style={{transform: "translate(40%, 20%)"}}>
					<Grid item xs>
						<Link href="#" variant="body2"  style={{textDecoration: 'none'}} >
							Забыли пароль?
						</Link>
					</Grid>
				</Grid>
					</Container>
		</div>
			</FullScreen>
	)
}

export default SingIn;
