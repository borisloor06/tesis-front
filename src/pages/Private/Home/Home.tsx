/* eslint-disable no-console */
import "../../../styles/app.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "../../../components/Header/Sidebar";
import { createAnalisis } from "../../../redux/states/analisis";
import * as services from "../../../services/GetDataServices";
import IAnalysisData from "../../../services/interfaces/IAnalysisData";

function Home() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		services
			.getAnalysis()
			.then((analisis) => {
				// eslint-disable-next-line no-console
				const analysisData = analisis.data as IAnalysisData[];
				if (analysisData.length > 0) {
					dispatch(createAnalisis(analysisData[0]));
					setLoading(false);
				}
			})
			.catch((error) => console.log(error));
	}, [dispatch]);

	return (
		<div className="main-container">
			<Sidebar />
			{!loading && <Outlet />}
		</div>
	);
}

export default Home;
