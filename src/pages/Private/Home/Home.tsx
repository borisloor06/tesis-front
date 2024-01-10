/* eslint-disable no-console */
import "../../../styles/app.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "../../../components/Header/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { createAnalisis } from "../../../redux/states/analisis";
import { fetchData } from "../../../services/GetDataServices";
import IAnalysisData from "../../../services/interfaces/IAnalysisData";

function Home() {
	const dispatch = useDispatch();
	const { getAnalysis } = fetchData();
	const [loading, setLoading] = useState(true);
	const [isSettings, setIsSettings] = useState(false);

	useEffect(() => {
		setLoading(true);
		if (window.location.pathname === "/private/settings") {
			setIsSettings(true);
		}
		getAnalysis()
			.then((analisis) => {
				// eslint-disable-next-line no-console
				const analysisData = analisis.data as IAnalysisData[];
				if (analysisData.length > 0) {
					dispatch(createAnalisis(analysisData[0]));
				}
			})
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, [dispatch]);

	return (
		<div className="main-container">
			<Sidebar />
			{loading ? isSettings ? <Outlet /> : <Loader /> : <Outlet />}
		</div>
	);
}

export default Home;
