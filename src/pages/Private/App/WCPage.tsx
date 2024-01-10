import "../../../styles/app.css";

import React, { useEffect, useState } from "react";
import { FaCommentAlt, FaReddit, FaUserEdit } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { VscSymbolKeyword } from "react-icons/vsc";
import { useSelector } from "react-redux";

import WordCloud from "../../../components/Charts/WordCloud";
import RowFilter from "../../../components/Header/RowFilter";
import useKeywords from "../../../hooks/useKeywords";
import { AppStore } from "../../../redux/store";
import SettingsStatus from "./SettingsStatus";

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
	const [generate, setGenerate] = useState(false);
	const { data, wcKeywords, getKeywords } = useKeywords();
	const analysis = useSelector((store: AppStore) => store.analisis);
	const analisisFiltered = useSelector((store: AppStore) => store.filtered);
	const words = wcKeywords.map(([text, size]) => ({ text, size }));

	const handleButtonClick = () => {
		setGenerate((prevGenerate) => !prevGenerate);
	};

	useEffect(() => {
		getKeywords();
	}, [analysis, analisisFiltered]);

	const refreshContent = () => {
		getKeywords();
	};

	return (
		<main className="main-index">
			<div className="chart-container main-word-cloud">
				{/* <RowUser /> */}
				<ul className="d-flex flex-row-reverse">
					<SettingsStatus />
				</ul>
				<ul className="row-header">
					<RowFilter refreshContent={refreshContent} />
					<div onClick={handleButtonClick}>
						<PiArrowsClockwiseBold className="refresh-icon" />
					</div>
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
