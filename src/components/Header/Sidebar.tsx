import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/app.css";
import { MdDashboard, MdSettings, MdOutlineDoubleArrow } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import { TbHexagonLetterT } from "react-icons/tb";

interface SidebarProps {
	setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentTab }) => {
	const [currentTabName, setCurrentTabName] = useState("Análisis NLP");
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

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

	const handleTabClick = (tab: string) => {
		setCurrentTab(tab);
		setCurrentTabName(tab);
		if (isMobileView) {
			setIsNavCollapsed(true);
		}
	};

	const handleNavToggle = () => {
		setIsNavCollapsed(!isNavCollapsed);
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
							currentTabName === "Análisis NLP" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Análisis NLP");
							handleNavToggle();
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
						Inicio
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/"
						className={`navBar nav-link text-white ${
							currentTabName === "Nube de Palabras" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Nube de Palabras");
							handleNavToggle();
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
						to="/"
						className={`navBar nav-link text-white ${currentTabName === "Extracción de tema" ? "active" : ""}`}
						onClick={() => {
							handleTabClick("Extracción de tema");
							handleNavToggle();
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
				<li>
					<a href="#" className="nav-link text-white">
						<MdSettings
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Another
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<MdSettings
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Another
					</a>
				</li>
			</ul>
			<hr></hr>
			<ul className="nav nav-pills flex-column">
				<li className="nav-item">
					<Link
						to="/"
						className={`navBar nav-link text-white ${
							currentTabName === "Settings" ? "active" : ""
						}`}
						onClick={() => {
							handleTabClick("Settings");
							handleNavToggle();
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
						Settings
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/"
						className="navBar nav-link text-white"
						onClick={() => {
							handleNavToggle();
							window.location.reload();
						}}
					>
						<MdOutlineDoubleArrow
							style={{
								marginRight: "1rem",
								width: "1.2rem",
								height: "1.5rem",
								marginTop: "-.3rem",
							}}
						/>
						Landing
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
