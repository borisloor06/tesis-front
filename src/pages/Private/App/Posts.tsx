import { TablePagination } from "@mui/base/TablePagination";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { AppStore } from "../../../redux/store";
import * as services from "../../../services/GetDataServices";
import IPost from "../../../services/interfaces/IPosts";
import { Styles } from "./HistoryStyles";

function Posts() {
	const analysis = useSelector((store: AppStore) => store.analisis);
	const [posts, setPosts] = useState([] as IPost[]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [total, setTotal] = useState(0);
	// Avoid a layout jump when reaching the last page with empty comments.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const getPosts = async () => {
		const offset = page * rowsPerPage;
		const response = await services.getPosts(rowsPerPage, offset);

		return response.data;
	};

	useEffect(() => {
		getPosts()
			.then((response) => {
				const { posts, total } = response;
				setPosts(posts);
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
						<th>Subreddit</th>
						<th>Puntuación</th>
						<th>URL</th>
						<th>Cantidad Comentarios</th>
						<th>Fecha Creación</th>
					</tr>
				</thead>
				<tbody>
					{posts.length &&
						posts.map((row) => (
							<tr key={row.id}>
								<td>{row.id}</td>
								<td align="right">{row.author}</td>
								<td align="right">{row.subreddit}</td>
								<td align="right">{row.score}</td>
								<td align="right">
									<a href={row.url} target="_blank" rel="noreferrer">
										{row.url}
									</a>
								</td>
								<td align="right">{row.num_comments}</td>
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

export default Posts;
