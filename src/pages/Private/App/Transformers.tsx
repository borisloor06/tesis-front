import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCommentAlt, FaReddit, FaUserEdit } from "react-icons/fa";
import {
	MdAlignHorizontalLeft,
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { VscSymbolKeyword } from "react-icons/vsc";
import { useSelector } from "react-redux";

import { HBarChart } from "../../../components/Charts/HBarChart";
import RowFilter from "../../../components/Header/RowFilter";
import useAnalysis from "../../../hooks/useAnalysis";
import useKeywords from "../../../hooks/useKeywords";
import useSearch from "../../../hooks/useSearch";
import { AppStore } from "../../../redux/store";
import IAnalysisData from "../../../services/interfaces/IAnalysisData";
import SettingsStatus from "./SettingsStatus";

function Transformers() {
	const [result, setResult] = useState(null);
	const [ready, setReady] = useState(false);
	const [inputText, setInputText] = useState("");
	const { inputValue, handleInputChange } = useSearch();
	const { currentIndex, handleNextWord, handlePreviousWord, topKeywords, getKeywords } =
		useKeywords();
	const { topicExtraction, getAnalys } = useAnalysis();
	const [data, setData] = useState<IAnalysisData>({} as IAnalysisData);
	const analysis = useSelector((store: AppStore) => store.analisis);
	const analisisFiltered = useSelector((store: AppStore) => store.filtered);
	const getData = () => {
		analisisFiltered.total_posts ? setData(analisisFiltered) : setData(analysis);
	};

	const topicExtractionScores = topicExtraction.map(([label, score]) => score);
	const topicExtractionLabels = topicExtraction.map(([label, score]) => label);

	// Keep track of the classification result and the model loading status.

	// Create a reference to the worker object.
	const worker = useRef<Worker | null>(null);

	// We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
	useEffect(() => {
		if (!worker.current) {
			// Create the worker if it does not yet exist.
			worker.current = new Worker(new URL("./worker.js", import.meta.url), {
				type: "module",
			});
		}

		// Create a callback function for messages from the worker thread.
		const onMessageReceived = (e: any) => {
			switch (e.data.status) {
				case "initiate":
					setReady(false);
					break;
				case "ready":
					setReady(true);
					break;
				case "complete":
					setResult(e.data.output[0]);
					break;
			}

			console.log(e.data.status);
		};

		// Attach the callback function as an event listener.
		worker.current.removeEventListener("message", onMessageReceived);
	});

	const classify = useCallback((text: string) => {
		if (worker.current) {
			worker.current.postMessage({ text });
		}
	}, []);

	useEffect(() => {
		getData();
		getKeywords();
		getAnalys();
	}, [analysis, analisisFiltered]);

	const refreshContent = () => {
		getData();
		getKeywords();
		getAnalys();
	};

	return (
		<main className="main-index">
			<div className="chart-container">
				{/* <RowUser /> */}
				<ul className="d-flex flex-row-reverse">
					<SettingsStatus />
				</ul>
				<ul className="row-header d-flex justify-content-center">
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
				<ul className="row-second-topic">
					<li className="statistics">
						<div>
							<MdAlignHorizontalLeft
								style={{
									marginRight: "1rem",
									marginLeft: ".5rem",
									width: "1.5rem",
									height: "1.5rem",
								}}
							/>
							Frecuencia de temas por comentarios
						</div>
						<HBarChart
							labels={topicExtractionLabels}
							data={topicExtractionScores}
							backG={["#A6F548ff", "#F28A49cc", "#49EDF2ff", "#B449F2cc", "#649B9Dcc"]}
						/>
					</li>
				</ul>
				<hr></hr>
				{/* <ul className="row-header d-flex justify-content-center">
					<li>
						<h3>Análisis de texto con Transformers</h3>
					</li>
				</ul>
				<ul className="row-input">
					<div>
						<input
							type="text"
							className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
							placeholder="Enter text here"
							onInput={(e: any) => {
								classify(e.target.value);
							}}
						/>

						{ready !== null && (
							<pre className="bg-gray-100 p-2 rounded">
								{!ready || !result ? "Loading..." : JSON.stringify(result, null, 2)}
							</pre>
						)}
					</div>
				</ul> */}
			</div>
		</main>
	);
}

export default Transformers;
