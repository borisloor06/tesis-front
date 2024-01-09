import { TablePagination } from "@mui/base/TablePagination";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { AppStore } from "../../../redux/store";
import * as services from "../../../services/GetDataServices";
import IComment from "../../../services/interfaces/IComments";
import { Styles } from "./HistoryStyles";

function History() {
	const analysis = useSelector((store: AppStore) => store.analisis);
	const [comentarios, setComentarios] = useState([] as IComment[]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [total, setTotal] = useState(0);
	// Avoid a layout jump when reaching the last page with empty comments.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - comentarios?.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const getComments = async () => {
		const offset = page * rowsPerPage;
		const response = await services.getComments(rowsPerPage, offset);

		return response.data;
	};

	useEffect(() => {
		getComments()
			.then((response) => {
				const { comments, total } = response;
				setComentarios(comments);
				setTotal(total);
			})
			.catch((error) => console.log(error));
	}, [page, rowsPerPage]);

	return (
		<main className="main-index chart-container w-100">
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
					{comentarios?.length &&
						comentarios.map((row) => (
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
				</tbody>
				<tfoot>
					<tr>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							colSpan={5}
							count={total}
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
