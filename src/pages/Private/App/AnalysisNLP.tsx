import "../../../styles/app.css";

import React, { useEffect, useState } from "react";
import { FaCommentAlt, FaReddit, FaUserEdit } from "react-icons/fa";
import {
	MdDonutLarge,
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
	MdOutlineSentimentDissatisfied,
	MdOutlineSentimentNeutral,
	MdOutlineSentimentSatisfied,
} from "react-icons/md";
import { VscSymbolKeyword } from "react-icons/vsc";
import { useSelector } from "react-redux";

import { DonutChart } from "../../../components/Charts/DonutChart";
import BarsChart from "../../../components/Charts/VBarChart";
import RowFilter from "../../../components/Header/RowFilter";
import useAnalysis from "../../../hooks/useAnalysis";
import useKeywords from "../../../hooks/useKeywords";
import useSentiments from "../../../hooks/useSentiments";
import { AppStore } from "../../../redux/store";
import IAnalysisData from "../../../services/interfaces/IAnalysisData";
import SettingsStatus from "./SettingsStatus";

const AnalysisNLP = () => {
	const { currentIndex, handleNextWord, handlePreviousWord, topKeywords, getKeywords } =
		useKeywords();
	const { positiveSentiments, negativeSentiments, neutralSentiments, getSentiments } =
		useSentiments();
	const { vaderAnalysis, transformerAnalysis, getAnalys } = useAnalysis();

	const [data, setData] = useState<IAnalysisData>({} as IAnalysisData);
	const [vaderAnalysisTC, setVaderAnalysisTC] = useState<number>(0);
	const [transformerAnalysisTC, setTransformerAnalysisTC] = useState<number>(0);

	const analysis = useSelector((store: AppStore) => store.analisis);
	const analisisFiltered = useSelector((store: AppStore) => store.filtered);
	const GetData = () => {
		const vaderAnalysisTC = analisisFiltered.total_posts
			? analisisFiltered.vader_analysis.total_average
			: analysis.vader_analysis.total_average;
		const transformerAnalysisTC = analisisFiltered.total_posts
			? analisisFiltered.transformer_analysis.total_average
			: analysis.transformer_analysis.total_average;
		analisisFiltered.total_posts ? setData(analisisFiltered) : setData(analysis);
		setVaderAnalysisTC(vaderAnalysisTC);
		setTransformerAnalysisTC(transformerAnalysisTC);
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

	// Definir las labels y los scores para el gráfico de donut de sentimientos a partir de los datos de Transformers
	const transformerAnalysisScores = transformerAnalysis.map(([label, score]) => score);
	const transformerAnalysisLabels = transformerAnalysis.map(([label, score]) => label);

	useEffect(() => {
		GetData();
		getKeywords();
		getSentiments();
		getAnalys();
	}, [analysis, analisisFiltered]);

	const refreshContent = () => {
		GetData();
		getKeywords();
		getSentiments();
		getAnalys();
	};

	return (
		<main className="main-index">
			<div className="chart-container">
				{/* <RowUser /> */}
				<ul className="d-flex flex-row-reverse">
					<SettingsStatus />
				</ul>
				<ul className="row-header">
					<RowFilter refreshContent={refreshContent} isAnalisis={true} />
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
						<h3>{data.total_posts}</h3>
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
						<h3>{data.total_comments}</h3>
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
						<h3>{data.total_authors}</h3>
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
				<ul className="row-second-nlp">
					<li className="donut-chart-v">
						<div>
							<MdDonutLarge
								style={{
									marginRight: "1rem",
									width: "2rem",
									height: "2rem",
								}}
							/>
							Análisis de Sentimientos (Vader)
						</div>
						<DonutChart
							labels={vaderAnalysisLabels}
							data={vaderAnalysisScores}
							title="Análisis de Sentimientos"
							borderColors={["#ffd500ff", "#00aeffff", "#FF00FFff"]}
							backgroundColors={["#ffd500cc", "#00aeffcc", "#FF00FFcc"]}
						/>
					</li>
					<li className="donut-chart-t">
						<div>
							<MdDonutLarge
								style={{
									marginRight: "1rem",
									width: "2rem",
									height: "2rem",
								}}
							/>
							Análisis de Sentimientos (Transformers)
						</div>
						<DonutChart
							labels={transformerAnalysisLabels}
							data={transformerAnalysisScores}
							title="Análisis de Sentimientos"
							borderColors={["#0000FFcc", "#FF0000ff", "#00FF00ff"]}
							backgroundColors={["#0000FFcc", "#FF0000cc", "#00FF00cc"]}
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
							Emociones positivas
						</div>
						<BarsChart
							labels={positiveSentimentsLabels}
							data={positiveSentimentsScores}
							title="Emociones positivos"
							backG={[
								"#00CCC9cc",
								"#00A3A0cc",
								"#00F0ECcc",
								"#007A78cc",
								"#00E6E3cc",
								"#00524Fcc",
								"#00BEBBcc",
								"#00E6E3cc",
								"#00A3A0cc",
								"#00CCC9cc",
							]}
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
							Emociones negativas
						</div>
						<BarsChart
							labels={negativeSentimentsLabels}
							data={negativeSentimentsScores}
							title="Emociones negativos"
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
							Emociones neutrales
						</div>
						<BarsChart
							labels={neutralSentimentsLabels}
							data={neutralSentimentsScores}
							title="Emociones neutrales"
							backG={["#CCBE00cc", "#A39800cc", "#F0E000cc", "#7A7200cc"]}
						/>
					</li>
				</ul>
			</div>
		</main>
	);
};

export default AnalysisNLP;
