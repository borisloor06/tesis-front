import React, { useState, useEffect, useRef, useCallback } from "react";
import { pipeline, env } from "@xenova/transformers";
import { MdNotifications, MdSearch } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";

function Transformers() {
	const [result, setResult] = useState(null);
	const [ready, setReady] = useState(false);
	const [inputText, setInputText] = useState("");
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event: any) => {
		setInputValue(event.target.value);
	};
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
				<ul>
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
