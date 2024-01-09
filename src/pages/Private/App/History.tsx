import { TablePagination } from "@mui/base/TablePagination";
import React from "react";
import { useSelector } from "react-redux";

import useAnalysis from "../../../hooks/useAnalysis";
import { AppStore } from "../../../redux/store";
import { Styles } from "./HistoryStyles";

function History() {
	const analysis = useSelector((store: AppStore) => store.analisis);
	const comentarios = useSelector((store: AppStore) => store.comentarios);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// Avoid a layout jump when reaching the last page with empty comments.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - comments.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<main className="main-index w-100">
			<table aria-label="custom pagination table" className="d-table">
				<thead>
					<tr>
						<th>id</th>
						<th>Autor</th>
						<th className="w-25">Comentario</th>
						<th>Post</th>
						<th>Fecha Creación</th>
					</tr>
				</thead>
				<tbody>
					{(rowsPerPage > 0
						? comentarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: comentarios
					).map((row) => (
						<tr key={row.id}>
							<td>{row.id}</td>
							<td align="right">{row.author}</td>
							<td className="overflow-hidden w-25" align="right">
								{row.body}
							</td>
							<td align="right">{row.subreddit_id}</td>
							<td align="right">{row.created_date}</td>
						</tr>
					))}
					{emptyRows > 0 && (
						<tr style={{ height: 41 * emptyRows }}>
							<td colSpan={3} aria-hidden />
						</tr>
					)}
				</tbody>
				<tfoot>
					<tr>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							colSpan={3}
							count={comentarios.length}
							rowsPerPage={rowsPerPage}
							page={page}
							slotProps={{
								select: {
									"aria-label": "comments per page",
								},
								actions: {
									showFirstButton: true,
									showLastButton: true,
								},
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</tr>
				</tfoot>
			</table>
			<Styles />
		</main>
	);
}

export default History;
