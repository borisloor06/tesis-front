import "../../../styles/app.css";
import Sidebar from "../../../components/Header/Sidebar";
import { Outlet } from "react-router-dom";

function Home() {
	return (
		<div className="main-container">
			<Sidebar />
			<Outlet />
		</div>
	);
}

export default Home;
