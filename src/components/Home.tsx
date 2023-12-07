import { useState } from "react";
import Sidebar from "./Header/Sidebar";
import Index from "./App/Dashboard";
import Transformers from "./App/Transformers";
import WCPage from "./App/WCPage";
import "../styles/app.css";
import AnalysisNLP from "./App/AnalysisNLP";

function Home() {
	const [currentTab, setCurrentTab] = useState("Dashboard");

	const renderTab = () => {
		switch (currentTab) {
			case "Dashboard":
				return <Index />;
			case "Análisis NLP":
				return <AnalysisNLP />;
			case "Another":
				return <Transformers />;
			case "Nube de Palabras":
				return <WCPage />;
			case "Extracción de tema":
				return <Transformers />;
			default:
				return <Index />;
		}
	};

	return (
		<div className="main-container">
			<Sidebar setCurrentTab={setCurrentTab} />
			{renderTab()}
		</div>
	);
}

export default Home;
