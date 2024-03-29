import "../../styles/app.css";

import React, { useEffect, useState } from "react";
import { BiSolidAnalyse } from "react-icons/bi";
import { FaCloud, FaHistory } from "react-icons/fa";
import { MdDashboard, MdOutlineDoubleArrow, MdSettings } from "react-icons/md";
import { TbHexagonLetterT } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
	const [currentTabName, setCurrentTabName] = useState("Dashboard");
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);
	const location = useLocation();

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth <= 768);
			setIsNavCollapsed(true);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				setCurrentTabName("Dashboard");
				break;
			case "/private/analysis-nlp":
				setCurrentTabName("Análisis NLP");
				break;
			case "/private/wc-page":
				setCurrentTabName("Nube de Palabras");
				break;
			case "/private/transformers":
				setCurrentTabName("Extracción de tema");
				break;
			case "/private/history":
				setCurrentTabName("Comentarios");
				break;
			case "/private/posts":
				setCurrentTabName("Posts");
				break;
			case "/private/extraction":
				setCurrentTabName("Nueva Extracción");
				break;
			case "/private/settings":
				setCurrentTabName("Configuraciones");
				break;
			case "/private/profile":
				setCurrentTabName("Perfil");
				break;
			default:
				setCurrentTabName("Dashboard"); // Valor predeterminado
		}
	}, [location.pathname]);

	const handleTabClick = (tab: string) => {
		setCurrentTabName(tab);
		if (isMobileView) {
			setIsNavCollapsed(true);
		}
	};

	return (
		<div className="sidebar">
			<div className="d-flex flex-column  p-3 text-white" style={{ width: "18rem" }}>
				<span className="fs-4">{currentTabName}</span>
			</div>
			<hr></hr>
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<Link
						to="/"
						className={`navBar nav-link text-white ${
							currentTabName === "Dashboard" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Dashboard");
						}}
					>
						<MdDashboard
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/private/analysis-nlp"
						className={`navBar nav-link text-white ${
							currentTabName === "Análisis NLP" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Análisis NLP");
						}}
					>
						<BiSolidAnalyse
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Análisis NLP
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/private/wc-page"
						className={`navBar nav-link text-white ${
							currentTabName === "Nube de Palabras" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Nube de Palabras");
						}}
					>
						<FaCloud
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Nube de Palabras
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/private/transformers"
						className={`navBar nav-link text-white ${
							currentTabName === "Extracción de tema" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Extracción de tema");
						}}
					>
						<TbHexagonLetterT
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Extracción de tema
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/private/history"
						className={`navBar nav-link text-white ${
							currentTabName === "Comentarios" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Comentarios");
						}}
					>
						<FaHistory
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Comentarios
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/private/posts"
						className={`navBar nav-link text-white ${currentTabName === "Posts" ? "active" : ""}`}
						onClick={() => {
							handleTabClick("Posts");
						}}
					>
						<FaHistory
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Posts
					</Link>
				</li>
			</ul>
			<hr></hr>
			<ul className="nav nav-pills flex-column">
				<li className="nav-item">
					<Link
						to="/private/settings"
						className={`navBar nav-link text-white ${
							currentTabName === "Configuraciones" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Configuraciones");
						}}
					>
						<MdSettings
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Configuraciones
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/landing" className="navBar nav-link text-white">
						<MdOutlineDoubleArrow
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Inicio
					</Link>
				</li>
				{/* <Logout /> */}
			</ul>
		</div>
	);
};

export default Sidebar;
