import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

function RowFilter() {
	const [showDateInputs, setShowDateInputs] = useState(false);

	const handleFilterChange = (e: any) => {
		const selectedValue = e.target.value;
		setShowDateInputs(selectedValue === "2");
	};

	return (
		<>
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

				<div>Filtrar:</div>
				<select className="filter-select" onChange={handleFilterChange}>
					<option value="0">Este año</option>
					<option value="1">Este mes</option>
					<option value="2">Seleccionar</option>
				</select>
			</li>
			{showDateInputs && (
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
			)}
		</>
	);
}

export default RowFilter;
