import { IoFilterSharp } from "react-icons/io5";

function RowFilter() {
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
				<select className="filter-select">
					<option value="0">Este año</option>
					<option value="1">Este mes</option>
					<option value="2">Seleccionar</option>
				</select>
			</li>
		</>
	);
}

export default RowFilter;
