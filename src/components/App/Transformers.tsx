import React, { useState, useEffect, useRef, useCallback } from "react";
import {
	MdAlignHorizontalLeft,
	MdNotifications,
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
	MdSearch,
} from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import useSearch from "../../hooks/useSearch";
import IAnalysisData from "../../services/IAnalysisData";
import * as services from "../../services/GetDataServices";
import { FaCommentAlt, FaReddit, FaUserEdit } from "react-icons/fa";
import { VscSymbolKeyword } from "react-icons/vsc";
import useKeywords from "../../hooks/useKeywords";
import { HBarChart } from "../Charts/HBarChart";
import useAnalysis from "../../hooks/useAnalysis";
import { AreaChart } from "../Charts/AreaChart";

function Transformers() {
	const [result, setResult] = useState(null);
	const [ready, setReady] = useState(false);
	const [inputText, setInputText] = useState("");
	const { inputValue, handleInputChange } = useSearch();
	const { currentIndex, handleNextWord, handlePreviousWord, topKeywords, getKeywords } =
		useKeywords();
	const { topicExtraction, getAnalys } = useAnalysis();
	const [data, setData] = useState<IAnalysisData[]>([]);

	const getData = async () => {
		const res = await services.getAnalysis();
		const analysis = res.data;
		setData(analysis);
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
		worker.current?.removeEventListener("message", onMessageReceived);
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
				<ul className="row-header d-flex justify-content-center">
					<li>
						<h3>Análisis de texto</h3>
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
				<ul className="row-header d-flex justify-content-center">
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
				</ul>
			</div>
		</main>
	);
}

export default Transformers;
