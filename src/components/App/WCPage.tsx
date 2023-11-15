import React, { useEffect, useRef, useState } from "react";
import "../../styles/app.css";
import WordCloud from "../Charts/WordCloud";
import * as services from "../Services/GetDataServices";
import IAnalysisData from "../Services/IAnalysisData";
import { MdNotifications, MdSearch, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { FaReddit, FaCommentAlt, FaUserEdit } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { VscSymbolKeyword } from "react-icons/vsc";
import _ from "lodash";

const KeywordDisplay = ({ wcKeywords }: any) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNextWord = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % wcKeywords.length);
	};

	return (
		<>
			<h3>{wcKeywords[currentIndex]?.[0]}</h3>
			<div onClick={handleNextWord} className="b-fixed">
				<MdOutlineKeyboardDoubleArrowRight className="next-icon" />
			</div>
		</>
	);
};

const WCPage = () => {
	const [data, setData] = useState<IAnalysisData[]>([]);
	const [generate, setGenerate] = useState(false);
	const [wcKeywords, setWcKeywords] = useState<[string, number][]>([]);
	const [inputValue, setInputValue] = useState("");

	const handleButtonClick = () => {
		setGenerate((prevGenerate) => !prevGenerate);
	};

	const handleInputChange = (event: any) => {
		setInputValue(event.target.value);
	};

	const getData = async () => {
		try {
			const res = await services.getAnalysis();
			const analysis = res.data;

			const commentKeywords = analysis[0]?.keywords?.comment;

			// Filtrar las 10 palabras con la puntuación más alta de los comentarios
			const wcKeywords: [string, number][] = Object.entries(commentKeywords || {})
				.filter(
					([word, score]) =>
						isNaN(Number(word)) &&
						typeof score === "number" &&
						word.length <= 15 &&
						!word.includes("chatgpt") &&
						!/\d/.test(word)
				)
				.sort(([, scoreA]: any, [, scoreB]: any) => scoreB - scoreA)
				.slice(0, 60)
				.map(([word, score], index) => [word, 60 - index]) as [string, number][];

			setWcKeywords(wcKeywords);
			setData(analysis);
		} catch (error) {
			console.error("Error al obtener datos:", error);
		}
	};

	const words = wcKeywords.map(([text, size]) => ({ text, size }));

	useEffect(() => {
		getData();
	}, []);

	return (
		<main className="main-index">
			<div className="chart-container main-word-cloud">
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
						<div onClick={handleButtonClick}>
							<PiArrowsClockwiseBold className="refresh-icon" />
						</div>
					</li>
				</ul>
				<ul className="word-cloud">
					<div className="pOne">
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
						<li className="keywords">
							<div className="t-fixed">
								<VscSymbolKeyword
									style={{
										marginRight: "1rem",
										width: "1.5rem",
										height: "1.5rem",
									}}
								/>
								Palabras clave
							</div>
							<KeywordDisplay wcKeywords={wcKeywords} classD="b-fixed" classT="next-icon" />
						</li>
					</div>
					<div className="pTwo" key={generate.toString()}>
						<WordCloud words={words} width={900} height={400} />
					</div>
				</ul>
			</div>
		</main>
	);
};

export default WCPage;
