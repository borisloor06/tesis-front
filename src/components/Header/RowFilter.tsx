import dayjs from "dayjs";
import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";

import { createAnalisis, resetAnalisis } from "../../redux/states/analisis";
import * as services from "../../services/GetDataServices";
import IAnalysisData from "../../services/interfaces/IAnalysisData";
import Loader from "../Loader/Loader";

function RowFilter({ refreshContent }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const getAnalisis = async (startDate: string, endDate: string) => {
		dispatch(resetAnalisis());
		try {
			setLoading(true);
			const analysisResponse = await services.getAnalysisByFilter(startDate, endDate);
			const analysisData = analysisResponse.data as IAnalysisData[];
			dispatch(createAnalisis(analysisData[0]));
			setLoading(false);
			refreshContent(true);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleFilterClick = async () => {
		// Obtener las fechas de inicio y fin
		const startDateElement = document.getElementById("date-start") as HTMLInputElement;
		const endDateElement = document.getElementById("date-end") as HTMLInputElement;
		const startDate = startDateElement.value;
		const endDate = endDateElement.value;

		// Validar que ambas fechas estén seleccionadas
		if (!startDate || !endDate) {
			alert("Selecciona ambas fechas");

			return;
		}

		// Convertir las fechas a objetos Date
		const startDateTime = new Date(startDate);
		const endDateTime = new Date(endDate);

		// Validar que la fecha de inicio no sea mayor a la fecha de fin
		if (startDateTime > endDateTime) {
			alert("La fecha de inicio no puede ser mayor que la fecha de fin");

			return;
		}

		// Validar que el rango de fechas no sea mayor a un mes
		const diff = endDateTime.getTime() - startDateTime.getTime();
		const diffDays = diff / (1000 * 3600 * 24);
		if (diffDays > 30) {
			alert("El rango de fechas no puede ser mayor a un mes");

			return;
		}
		console.log(startDateTime, endDateTime);
		// Llamar al endpoint con las fechas filtradas
		const startDateFormated = dayjs(startDateTime).format("DD-MM-YYYY");
		const endDateFormated = dayjs(endDateTime).format("DD-MM-YYYY");
		await getAnalisis(startDateFormated, endDateFormated);
	};

	return (
		<>
			{loading ? <Loader /> : null}
			<li>
				<h3>Datos del análisis</h3>
			</li>
			<li>
				<IoFilterSharp
					style={{
						marginRight: ".5rem",
						width: "2.5rem",
						height: "2.5rem",
					}}
				/>
				<div className="me-3">Filtrar:</div>
				<div className="dates-extraction-filter">
					<div>
						<div>Fecha Inicio:</div>
						<input type="date" name="date-start" id="date-start" />
					</div>
					<div>
						<div>Fecha Fin:</div>
						<input type="date" name="date-end" id="date-end" />
					</div>
				</div>
				<button onClick={handleFilterClick} disabled={loading}>Aplicar</button>
			</li>
		</>
	);
}

export default RowFilter;
