import React, { useEffect, useState } from "react";
import "../../../styles/app.css";
import WordCloud from "../../../components/Charts/WordCloud";
import { MdNotifications, MdSearch, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { FaReddit, FaCommentAlt, FaUserEdit } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { VscSymbolKeyword } from "react-icons/vsc";
import _ from "lodash";
import useSearch from "../../../hooks/useSearch";
import useKeywords from "../../../hooks/useKeywords";
import RowUser from "../../../components/Header/RowUser";
import RowFilter from "../../../components/Header/RowFilter";

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

	const words = wcKeywords.map(([text, size]) => ({ text, size }));

	const handleButtonClick = () => {
		setGenerate((prevGenerate) => !prevGenerate);
	};

	useEffect(() => {
		getKeywords();
	}, []);

	return (
		<main className="main-index">
			<div className="chart-container main-word-cloud">
				<RowUser />
				<ul className="row-header">
					<RowFilter />
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
