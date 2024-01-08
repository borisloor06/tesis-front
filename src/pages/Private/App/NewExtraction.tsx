import { useState } from "react";
import { MdDateRange, MdSearch } from "react-icons/md";
import useSearch from "../../../hooks/useSearch";
import IAnalysisData from "../../../services/interfaces/IAnalysisData";
import * as services from "../../../services/GetDataServices";
import RowUser from "../../../components/Header/RowUser";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";

function NewExtraction() {
	const [data, setData] = useState<IAnalysisData[]>([]);
	const { inputValue, handleInputChange } = useSearch();

	const getData = async () => {
		const res = await services.getAnalysis();
		const analysis = res.data;
		setData(analysis);
	};
	return (
		<main className="main-index">
			<div className="chart-container">
				<RowUser />
				<ul className="row-header d-flex justify-content-center">
					<li>
						<h3>Ingrese su tema</h3>
					</li>
				</ul>
				<div className="main-extraction">
					<div className="info-extraction">
						<div className="extraction-section">
							<h4>
								<b>Parámetro de Extracción</b>
								<br />
							</h4>
							<p>
								El usuario seleccionará el tema que actuará como el valor clave para la extracción
								de datos.
							</p>
							<hr />
						</div>

						<div className="time-section">
							<h4>
								<b>Temporización de la Extracción</b>
								<br />
							</h4>
							<p>
								Se implementará un sistema de obtención de datos basado en el tiempo especificado
								por el usuario. Los datos se extraerán en relación con la marca temporal
								establecida, garantizando la precisión y relevancia de la información recopilada.
							</p>
							<hr />
						</div>

						<div className="notification-section">
							<h4>
								<b>Notificación Automatizada</b>
								<br />
							</h4>
							<p>
								Al concluir el proceso de extracción, el usuario recibirá una notificación por
								correo electrónico. La notificación informará que los datos solicitados están listos
								para su análisis.
							</p>
							<hr />
						</div>
					</div>
					<div className="section-extraction">
						<div className="search-container">
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
						</div>
						<div className="dates-extraction">
							<div>
								<h6>Fecha Inicio:</h6>
								<input type="date" name="date-start" id="date-start" />
							</div>
							<div>
								<h6>Fecha Fin:</h6>
								<input type="date" name="date-end" id="date-end" />
							</div>
						</div>
						<li className="btn-extract">
							<FaDownload
								style={{
									marginRight: "1rem",
									marginLeft: ".6rem",
									width: "1.2rem",
									height: "1.5rem",
								}}
							/>
							<Link to="/private/extraction">Nueva Extracción</Link>
						</li>
					</div>
				</div>
			</div>
		</main>
	);
}

export default NewExtraction;
