import { useState } from "react";
import Sidebar from "../Header/Sidebar";
import Index from "./Index";
import Transformers from "./Transformers";
import WCPage from "./WCPage";
import "../../styles/app.css";

function Home() {
	const [currentTab, setCurrentTab] = useState("Inicio");

	const renderTab = () => {
		switch (currentTab) {
			case "Análisis NLP":
				return <Index />;
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
