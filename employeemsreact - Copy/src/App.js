import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Home from "./Home";
import EmployeesView from "./component/employee/EmployeeView.js"; // Adjusted component name
import NavBar from "./component/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import AddEmployee from "./component/employee/AddEmployee"; // Adjusted component name
import EditEmployee from "./component/employee/EditEmployee"; // Adjusted component name
import EmployeeProfile from "./component/employee/EmployeeProfile"; // Adjusted component name


function App() {
	return (
		<main className="container mt-5">
			<Router>
			
				<NavBar />
				<Routes>
					<Route
						exact
						path="/"
						element={<Home />}
					></Route>
					<Route
						exact
						path="/view-employees" // Adjusted route path
						element={<EmployeesView />}
					></Route>
					<Route
						exact
						path="/add-employees" // Adjusted route path
						element={<AddEmployee />}
					></Route>
					<Route
						exact
						path="/edit-employee/:id" // Adjusted route path
						element={<EditEmployee />}
					></Route>
					<Route
						exact
						path="/employee-profile/:id" // Adjusted route path
						element={<EmployeeProfile />}
					></Route>
				</Routes>
			</Router>
		</main>
	);
}

export default App;
