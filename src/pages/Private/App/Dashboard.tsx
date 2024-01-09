import "../../../styles/app.css";

import React, { useEffect, useState } from "react";
import { FaCommentAlt, FaReddit, FaUserEdit } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import {
	MdDateRange,
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { VscSymbolKeyword } from "react-icons/vsc";
import { useSelector } from "react-redux";

import LineChart from "../../../components/Charts/LineChart";
import useKeywords from "../../../hooks/useKeywords";
import { AppStore } from "../../../redux/store";
import IResumeData from "../../../services/interfaces/IResumeData";

const Dashboard = () => {
	const { currentIndex, handleNextWord, handlePreviousWord, topKeywords, getKeywords } =
		useKeywords();
	const [resumeData, setResumeData] = useState<IResumeData[]>([]);
	const analysis = useSelector((store: AppStore) => store.analisis);

	// const getResumeData = async () => {
	// 	const res = await services.getResumeData();
	// 	const resume = res.analysis;
	// 	console.log(resume);

	// 	setResumeData(resume);
	// };

	// const posts_count = resumeData.posts;
	// console.log(posts_count);
	const commentsDates = Object.entries(analysis.comments_grouped.comments_count);
	const commentsLabels = commentsDates.map(([label, score]) => label);
	const commentsCount = commentsDates.map(([label, count]) => count);

	const postsDates = Object.entries(analysis.posts_grouped.posts_count);
	const postsLabels = postsDates.map(([label, score]) => label);
	const postsCount = postsDates.map(([label, count]) => count);

	const myDatasets = [
		{
			label: "Comentarios",
			analysis: commentsCount,
			tension: 0.3,
			fill: true,
			borderColor: "#40c639",
			backgroundColor: "#40c63972",
			pointRadius: 3,
			pointBorderColor: "#3995c6",
			pointBackgroundColor: "#3995c6aa",
		},
		{
			label: "Posts",
			analysis: postsCount,
			tension: 0.3,
			borderColor: "#c63940",
			backgroundColor: "#c6394072",
			pointRadius: 3,
			pointBorderColor: "#c63940",
			pointBackgroundColor: "#c63940aa",
		},
	];

	useEffect(() => {
		getKeywords();
	}, []);

	return (
		<main className="main-index">
			<div className="chart-container">
				{/* <RowUser /> */}
				<ul className="row-header d-flex justify-content-center">
					<li>
						<h3>Datos de la extracción</h3>
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
						<h3>{analysis.total_posts}</h3>
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
						<h3>{analysis.total_comments}</h3>
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
						<h3>{analysis.total_authors}</h3>
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
							<h3>{analysis.average_comment_post_count.toFixed(2)}</h3>{" "}
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
							<h3>{analysis.average_comment_score.toFixed(2)}</h3>
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
							<h3>{parseFloat(analysis.average_author_comment_count.toFixed(2))}</h3>
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
									{new Date(analysis.comments_dates.fecha_inicio).toLocaleDateString("es-ES")}
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
									{new Date(analysis.comments_dates.fecha_fin).toLocaleDateString("es-ES")}
								</h6>
							</div>
						</div>
						{/*Este gráfico está de muestra, habría que modificar para que aparezca la cantidad de comentarios y de posts por mes */}
						<LineChart
							labels={commentsLabels}
							datasets={myDatasets.map((dataset) => ({
								...dataset,
								data: dataset.analysis, // Add the 'data' property with the 'analysis' value
							}))}
						/>
					</li>
				</ul>
			</div>
		</main>
	);
};

export default Dashboard;
