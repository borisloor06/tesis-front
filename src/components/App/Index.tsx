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
import * as services from "../Services/GetDataServices";
import IAnalysisData from "../Services/IAnalysisData";
import {
	MdNotifications,
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
	MdOutlineSentimentSatisfied,
	MdOutlineSentimentDissatisfied,
	MdOutlineSentimentNeutral,
	MdSearch,
	MdDonutLarge,
} from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { FaReddit, FaCommentAlt, FaUserEdit } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { VscSymbolKeyword } from "react-icons/vsc";
import _, { set } from "lodash";

const Index = () => {
	const [data, setData] = useState<IAnalysisData[]>([]);

	const [inputValue, setInputValue] = useState("");
	const [topKeywords, setTopKeywords] = useState<[string, number][]>([]);
	const [positiveSentiments, setPositiveSentiments] = useState<[string, number][]>([]);
	const [negativeSentiments, setNegativeSentiments] = useState<[string, number][]>([]);
	const [neutralSentiments, setNeutralSentiments] = useState<[string, number][]>([]);

	const [vaderAnalysis, setVaderAnalysis] = useState<[string, number][]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNextWord = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % topKeywords.length);
	};

	const handlePreviousWord = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? topKeywords.length - 1 : (prevIndex - 1) % topKeywords.length
		);
	};
	const handleInputChange = (event: any) => {
		setInputValue(event.target.value);
	};
	const getData = async () => {
		const res = await services.getAnalysis();
		const analysis = res.data;
		const postKeywords = analysis[0]?.keywords?.posts;
		const sentimentsData = analysis[0]?.transformer_analysis;
		const vaderAnalysisData = analysis[0]?.vader_analysis.labels;

		const positiveSentiments: [string, number][] = [];
		const negativeSentiments: [string, number][] = [];
		const neutralSentiments: [string, number][] = [];
		const vaderAnalysis: [string, number][] = Object.entries(vaderAnalysisData || {});

		for (const [key, value] of Object.entries(sentimentsData || {})) {
			if (
				key === "admiration" ||
				key === "amusement" ||
				key === "approval" ||
				key === "caring" ||
				key === "curiosity" ||
				key === "desire" ||
				key === "excitement" ||
				key === "gratitude" ||
				key === "joy" ||
				key === "love" ||
				key === "optimism" ||
				key === "pride" ||
				key === "realization" ||
				key === "relief"
			) {
				positiveSentiments.push([key, value as number]);
			} else if (
				key === "anger" ||
				key === "annoyance" ||
				key === "disappointment" ||
				key === "disapproval" ||
				key === "disgust" ||
				key === "embarrassment" ||
				key === "fear" ||
				key === "grief" ||
				key === "remorse" ||
				key === "sadness"
			) {
				negativeSentiments.push([key, value as number]);
			} else {
				neutralSentiments.push([key, value as number]);
			}
		}

		// Filtrar las 10 palabras con la puntuación más alta de los títulos
		const topKeywords: [string, number][] = Object.entries(postKeywords || {})
			.filter(([word, score]) => isNaN(Number(word)) && typeof score === "number")
			.sort(([, scoreA]: any, [, scoreB]: any) => scoreB - scoreA)
			.slice(0, 21) as [string, number][];

		setPositiveSentiments(positiveSentiments);
		setNegativeSentiments(negativeSentiments);
		setNeutralSentiments(neutralSentiments);
		setVaderAnalysis(vaderAnalysis);
		setTopKeywords(topKeywords);
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
						<h3>Dashboard</h3>
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
						<h3>{data.map((item) => parseFloat(item.average_author_comment_count.toFixed(2)))}</h3>
					</li>
				</ul>
				<ul className="row-second">
					<li className="donut-chart">
						<div>
							<MdDonutLarge
								style={{
									marginRight: "1rem",
									width: "2rem",
									height: "2rem",
								}}
							/>
							Análisis de Sentimientos
						</div>
						<DonutChart
							labels={vaderAnalysisLabels}
							data={vaderAnalysisScores}
							title="Análisis de Sentimientos"
						/>
					</li>
					<li className="bar-chart">
						<div>
							<MdOutlineSentimentSatisfied
								style={{
									marginRight: "1rem",
									width: "2rem",
									height: "2rem",
								}}
							/>
							Sentimientos positivos
						</div>
						<BarsChart
							labels={positiveSentimentsLabels}
							data={positiveSentimentsScores}
							title="Sentimientos positivos"
							backG={["#00CCC9cc", "#00A3A0cc", "#00F0ECcc", "#007A78cc", "#00E6E3cc", "#00524Fcc"]}
						/>
					</li>
					<li className="bar-chart2">
						<div>
							<MdOutlineSentimentDissatisfied
								style={{
									marginRight: "1rem",
									width: "2rem",
									height: "2rem",
								}}
							/>
							Sentimientos negativos
						</div>
						<BarsChart
							labels={negativeSentimentsLabels}
							data={negativeSentimentsScores}
							title="Sentimientos negativos"
							backG={["#CC0E00bb", "#A30B00cc", "#F01000cc", "#7A0800cc", "#510600cc", "#E60F00cc"]}
						/>
					</li>
					<li className="bar-chart3">
						<div>
							<MdOutlineSentimentNeutral
								style={{
									marginRight: "1rem",
									width: "2rem",
									height: "2rem",
								}}
							/>
							Sentimientos neutrales
						</div>
						<BarsChart
							labels={neutralSentimentsLabels}
							data={neutralSentimentsScores}
							title="Sentimientos neutrales"
							backG={["#CCBE00cc", "#A39800cc", "#F0E000cc", "#7A7200cc"]}
						/>
					</li>
				</ul>
			</div>
		</main>
	);
};

export default Index;
