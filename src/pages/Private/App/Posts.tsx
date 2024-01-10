import { TablePagination } from "@mui/base/TablePagination";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { AppStore } from "../../../redux/store";
import { fetchData } from "../../../services/GetDataServices";
import IPost, { ResponsePosts } from "../../../services/interfaces/IPosts";
import { Styles } from "./HistoryStyles";

function Posts() {
	const analysis = useSelector((store: AppStore) => store.analisis);
	const { getPosts } = fetchData();
	const [posts, setPosts] = useState([] as IPost[]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [total, setTotal] = useState(0);
	// Avoid a layout jump when reaching the last page with empty comments.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const getPost = async (): Promise<ResponsePosts> => {
		const offset = page * rowsPerPage;
		const response = await getPosts(rowsPerPage, offset);
		const data = await response.json();

		return data as ResponsePosts;
	};

	useEffect(() => {
		getPost()
			.then((response) => {
				const { posts, total } = response;
				console.log(response);
				console.log(posts);
				setPosts(posts);
				setTotal(total);
			})
			.catch((error) => console.log(error));
	}, [page, rowsPerPage]);

	return (
		<main className="main-index chart-container w-100 TablePaginationIntroductionDemo ">
			<div className="row-header d-flex justify-content-center mt-2">
				<h3>Post de Reddit r/ChatGpt</h3>
			</div>
			<table className="mt-5">
				<thead className="">
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
					{posts.length ? (
						posts.map((row) => (
							<tr key={row.id}>
								<td>{row.id}</td>
								<td className="text-right">{row.author}</td>
								<td className="text-right">{row.subreddit}</td>
								<td className="text-right">{row.score}</td>
								<td className="text-right">
									<a href={row.url} target="_blank" rel="noreferrer">
										{row.url}
									</a>
								</td>
								<td className="text-right">{row.num_comments}</td>
								<td className="text-right">{row.created_date}</td>
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
							className="CustomTablePagination"
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							colSpan={7}
							count={total}
							rowsPerPage={rowsPerPage}
							page={page}
							slotProps={{
								select: {
									"aria-label": "Rows per page",
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

export default Posts;
