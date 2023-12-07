import React, { useEffect, useRef, useState } from "react";
import "../../styles/app.css";
import LineChart from "../Charts/LineChart";
import BarsChart from "../Charts/VBarChart";
import PieChart from "../Charts/PieChart";
import { DonutChart } from "../Charts/DonutChart";
import { AreaChart } from "../Charts/AreaChart";
import { PolarChart } from "../Charts/PolarChart";
import { RadarChart } from "../Charts/RadarChart";
import { ScatterChart } from "../Charts/ScatterChart";
import { BubbleChart } from "../Charts/BubbleChart";
import { HBarChart } from "../Charts/HBarChart";
import * as services from "../../services/GetDataServices";
import IAnalysisData from "../../services/IAnalysisData";
import {
	MdNotifications,
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
	MdOutlineSentimentSatisfied,
	MdOutlineSentimentDissatisfied,
	MdOutlineSentimentNeutral,
	MdSearch,
	MdDonutLarge,
	MdDateRange,
} from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { FaReddit, FaCommentAlt, FaUserEdit } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { VscSymbolKeyword } from "react-icons/vsc";
import _, { get, set } from "lodash";
import useSearch from "../../hooks/useSearch";
import useKeywords from "../../hooks/useKeywords";
import useSentiments from "../../hooks/useSentiments";
import useAnalysis from "../../hooks/useAnalysis";

const Dashboard = () => {
	const { currentIndex, handleNextWord, handlePreviousWord, topKeywords, getKeywords } =
		useKeywords();
	const { positiveSentiments, negativeSentiments, neutralSentiments, getSentiments } =
		useSentiments();
	const { vaderAnalysis, getAnalys } = useAnalysis();
	const { inputValue, handleInputChange } = useSearch();

	const [data, setData] = useState<IAnalysisData[]>([]);

	const getData = async () => {
		const res = await services.getAnalysis();
		const analysis = res.data;
		setData(analysis);
	};

	// Definir las labels y los scores para el gráfico de barras de sentimientos positivos
	const positiveSentimentsLabels = positiveSentiments.map(([label, score]) => label);
	const positiveSentimentsScores = positiveSentiments.map(([label, score]) => score);

	// Definir las labels y los scores para el gráfico de barras de sentimientos negativos
	const negativeSentimentsLabels = negativeSentiments.map(([label, score]) => label);
	const negativeSentimentsScores = negativeSentiments.map(([label, score]) => score);

	// Definir las labels y los scores para el gráfico de barras de sentimientos neutrales
	const neutralSentimentsLabels = neutralSentiments.map(([label, score]) => label);
	const neutralSentimentsScores = neutralSentiments.map(([label, score]) => score);

	// Definir las labels y los scores para el gráfico de donut de sentimientos a partir de los datos de Vader
	const vaderAnalysisLabels = vaderAnalysis.map(([label, score]) => label);
	const vaderAnalysisScores = vaderAnalysis.map(([label, score]) => score);

	useEffect(() => {
		getData();
		getKeywords();
		getSentiments();
		getAnalys();
	}, []);

	return (
		<main className="main-index">
			<div className="chart-container">
				<ul className="row-user">
					<li className="search-container">
						<input
							type="search"
							name="Search"
							id="sh"
							placeholder="Introduce a word"
							value={inputValue}
							onChange={handleInputChange}
							onFocus={() => document.querySelector(".search-icon")?.classList.add("hide-icon")}
							onBlur={() => {
								if (!inputValue)
									document.querySelector(".search-icon")?.classList.remove("hide-icon");
							}}
						/>
						<MdSearch className="search-icon" />
					</li>
					<li>
						<MdNotifications
							style={{
								marginRight: "1rem",
								width: "2rem",
								height: "2rem",
							}}
						/>
						<HiUserCircle
							style={{
								width: "2rem",
								height: "2rem",
							}}
						/>
					</li>
				</ul>
				<ul className="row-header">
					<li>
						<h3>Datos de la extracción</h3>
					</li>
					<li>
						<div>Mostrando:</div>
						<select className="filter-select">
							<option value="0">Este año</option>
							<option value="1">Este mes</option>
						</select>
					</li>
				</ul>
				<ul className="row-first">
					<li>
						<div>
							<FaReddit
								style={{
									marginRight: "1rem",
									width: "2rem",
									height: "2rem",
								}}
							/>
							Total de Posts
						</div>
						<h3>{data.map((item) => item.total_posts)}</h3>
					</li>
					<li>
						<div>
							<FaCommentAlt
								style={{
									marginRight: "1rem",
									width: "1.5rem",
									height: "1.5rem",
								}}
							/>
							Total de Comentarios
						</div>
						<h3>{data.map((item) => item.total_comments)}</h3>
					</li>
					<li>
						<div>
							<FaUserEdit
								style={{
									marginRight: "1rem",
									width: "1.5rem",
									height: "1.5rem",
								}}
							/>
							Total de autores
						</div>
						<h3>{data.map((item) => item.total_authors)}</h3>
					</li>
					<li>
						<div>
							<VscSymbolKeyword
								style={{
									marginRight: "1rem",
									width: "1.5rem",
									height: "1.5rem",
								}}
							/>
							Palabras clave en títulos
						</div>
						<div className="top-keys">
							<MdOutlineKeyboardDoubleArrowLeft onClick={handlePreviousWord} className="ni-kw" />
							<h3>{topKeywords[currentIndex]?.[0]}</h3>
							<MdOutlineKeyboardDoubleArrowRight onClick={handleNextWord} className="ni-kw" />
						</div>
					</li>
				</ul>
				<hr></hr>
				<ul className="row-second">
					<div className="media">
						<li>
							<div>
								<IoStatsChart
									style={{
										marginRight: "1rem",
										width: "1.5rem",
										height: "1.5rem",
									}}
								/>
								Media de comentarios por Post
							</div>
							<h3>{data.map((item) => parseFloat(item.average_comment_post_count.toFixed(2)))}</h3>{" "}
						</li>
						<li>
							<div>
								<IoStatsChart
									style={{
										marginRight: "1rem",
										width: "1.5rem",
										height: "1.5rem",
									}}
								/>
								Puntuación media por comentario
							</div>
							<h3>{data.map((item) => parseFloat(item.average_comment_score.toFixed(2)))}</h3>
						</li>
						<li>
							<div>
								<IoStatsChart
									style={{
										marginRight: "1rem",
										width: "1.5rem",
										height: "1.5rem",
									}}
								/>
								Media de comentarios por autor
							</div>
							<h3>
								{data.map((item) => parseFloat(item.average_author_comment_count.toFixed(2)))}
							</h3>
						</li>
					</div>
					<li className="statistics">
						<div className="dates">
							<div>
								<MdDateRange
									style={{
										marginRight: "1rem",
										width: "2rem",
										height: "2rem",
									}}
								/>
								<h6>
									Fecha Inicio:{" "}
									{data.map((item) =>
										new Date(item.comments_dates.fecha_inicio).toLocaleDateString("es-ES")
									)}
								</h6>
							</div>
							<div>
								<MdDateRange
									style={{
										marginRight: "1rem",
										marginLeft: "5rem",
										width: "2rem",
										height: "2rem",
									}}
								/>
								<h6>
									Fecha Fin:{" "}
									{data.map((item) =>
										new Date(item.comments_dates.fecha_fin).toLocaleDateString("es-ES")
									)}
								</h6>
							</div>
						</div>
						{/*Este gráfico está de muestra, habría que modificar para que aparezca la cantidad de comentarios y de posts por mes */}
						<LineChart />
					</li>
				</ul>
			</div>
		</main>
	);
};

export default Dashboard;
