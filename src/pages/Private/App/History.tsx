import { TablePagination } from "@mui/base/TablePagination";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import { useEffect, useState } from "react";

import RowFilter from "../../../components/Header/RowFilter";
import Loader from "../../../components/Loader/Loader";
import { useConfig } from "../../../Config/Config";
import { fetchData } from "../../../services/GetDataServices";
import IComment, { ResponseComments } from "../../../services/interfaces/IComments";
import { Styles } from "./HistoryStyles";
import SettingsStatus from "./SettingsStatus";

function History() {
	const { getComments, getCommentsByFilter } = fetchData();
	const { globalConfig } = useConfig();
	const [comentarios, setComentarios] = useState([] as IComment[]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [total, setTotal] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const [loading, setLoading] = useState(false);
	// Avoid a layout jump when reaching the last page with empty comments.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - comentarios.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const getComment = async () => {
		const offset = page * rowsPerPage;
		const { fechaInicio, fechaFin } = globalConfig;
		setLoading(true);
		const response = fechaFin.length
			? await getCommentsByFilter(fechaInicio, fechaFin, offset, rowsPerPage)
			: await getComments(rowsPerPage, offset);

		return response.data as ResponseComments;
	};

	useEffect(() => {
		getComment()
			.then((response) => {
				const { comments, total } = response;
				setComentarios(comments);
				setTotal(total);
			})
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, [page, rowsPerPage, refresh]);

	const refreshContent = () => {
		setRefresh((prevRefresh) => !prevRefresh);
	};

	return (
		<main className="main-index chart-container w-100 TablePaginationIntroductionDemo">
			{loading ? <Loader /> : null}

			<ul className="d-flex flex-row-reverse">
				<SettingsStatus />
			</ul>
			<div className="row-header d-flex justify-content-center mt-2">
				<h3>Commentarios de Reddit r/ChatGpt</h3>
			</div>
			<ul className="row-header mt-2 pt-3">
				<RowFilter refreshContent={refreshContent} isAnalisis={false} />
			</ul>

			<table aria-label="custom pagination table" className="d-table mt-5">
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
					{comentarios.length ? (
						comentarios.map((row) => (
							<tr key={row.id}>
								<td>{row.id}</td>
								<td align="right">{row.author}</td>
								<td className="overflow-hidden w-25" align="right">
									{row.body}
								</td>
								<td align="right">{row.subreddit_id}</td>
								<td align="right">{new Date(row.created * 1000).toLocaleString()}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={7}>No hay datos</td>
						</tr>
					)}
				</tbody>
				<tfoot>
					<tr>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							className="CustomTablePagination"
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
									slots: {
										firstPageIcon: FirstPageRoundedIcon,
										lastPageIcon: LastPageRoundedIcon,
										nextPageIcon: ChevronRightRoundedIcon,
										backPageIcon: ChevronLeftRoundedIcon,
									},
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
