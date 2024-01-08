import React, { useEffect, useState } from "react";
import "../../../styles/app.css";
import LineChart from "../../../components/Charts/LineChart";
import * as services from "../../../services/GetDataServices";
import IAnalysisData from "../../../services/interfaces/IAnalysisData";
import IResumeData from "../../../services/interfaces/IResumeData";
import {
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
	MdDateRange,
} from "react-icons/md";
import { FaReddit, FaCommentAlt, FaUserEdit } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { VscSymbolKeyword } from "react-icons/vsc";
import useKeywords from "../../../hooks/useKeywords";
import RowUser from "../../../components/Header/RowUser";

const Dashboard = () => {
	const { currentIndex, handleNextWord, handlePreviousWord, topKeywords, getKeywords } =
		useKeywords();
	const [data, setData] = useState<IAnalysisData[]>([]);
	const [resumeData, setResumeData] = useState<IResumeData[]>([]);

	const getData = async () => {
		const res = await services.getAnalysis();
		const analysis = res.data;
		setData(analysis);
	};

	// const getResumeData = async () => {
	// 	const res = await services.getResumeData();
	// 	const resume = res.data;
	// 	console.log(resume);
		
	// 	setResumeData(resume);
	// };

	// const posts_count = resumeData.map((item) => item.posts);
	// console.log(posts_count);
	

	const beneficios = [0, 56, 20, 36, 80, 40, 30, 60, 25, 30, 12, 60];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const myDatasets = [
        {
            label: 'Comentarios',
            data: beneficios,
			tension: 0.3,
            fill: true,
            borderColor: '#40c639',
            backgroundColor: '#40c63972',
            pointRadius: 3,
            pointBorderColor: '#3995c6',
            pointBackgroundColor: '#3995c6aa',
        },
        {
            label: 'Posts',
            data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25],
			tension: 0.3,
            borderColor: '#c63940',
            backgroundColor: '#c6394072',
            pointRadius: 3,
            pointBorderColor: '#c63940',
            pointBackgroundColor: '#c63940aa',
        },
    ];

	useEffect(() => {
		getData();
		getKeywords();
	}, []);

	return (
		<main className="main-index">
			<div className="chart-container">
				<RowUser />
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
							<h3>
								{data.map((item) => parseFloat(item.average_author_comment_count.toFixed(2)))}
							</h3>
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
									{data.map((item) =>
										new Date(item.comments_dates.fecha_inicio).toLocaleDateString("es-ES")
									)}
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
									{data.map((item) =>
										new Date(item.comments_dates.fecha_fin).toLocaleDateString("es-ES")
									)}
								</h6>
							</div>
						</div>
						{/*Este gráfico está de muestra, habría que modificar para que aparezca la cantidad de comentarios y de posts por mes */}
						<LineChart labels={meses} datasets={myDatasets} />
					</li>
				</ul>
			</div>
		</main>
	);
};

export default Dashboard;
