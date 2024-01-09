import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { useSelector } from "react-redux";

import RowUser from "../../../components/Header/RowUser";
import useAnalysis from "../../../hooks/useAnalysis";
import useKeywords from "../../../hooks/useKeywords";
import useSearch from "../../../hooks/useSearch";
import { AppStore } from "../../../redux/store";
import IAnalysisData from "../../../services/interfaces/IAnalysisData";

function Settings() {
	const [result, setResult] = useState(null);
	const [ready, setReady] = useState(false);
	const [inputText, setInputText] = useState("");
	const { inputValue, handleInputChange } = useSearch();
	const { currentIndex, handleNextWord, handlePreviousWord, topKeywords, getKeywords } =
		useKeywords();
	const { topicExtraction, getAnalys } = useAnalysis();
	const [data, setData] = useState<IAnalysisData>({} as IAnalysisData);
	const analysis = useSelector((store: AppStore) => store.analisis);

	const getData = () => {
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
	}, []);

	return (
		<main className="main-index">
			<div className="chart-container">
				<RowUser />
				<ul className="row-header d-flex justify-content-center">
					<li>
						<h3>Análisis de texto</h3>
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
					</li>
				</ul>
			</div>
		</main>
	);
}

export default Settings;
