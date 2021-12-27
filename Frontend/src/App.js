import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import SingIn from "./SignIn";
import GraduateList from "./Graduates/GraduateList";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SingIn />} />
				<Route path="/login" element={<SingIn />} />
				<Route path="/graduates" element={<GraduateList />} />
			</Routes>
		</Router>
	);
}

