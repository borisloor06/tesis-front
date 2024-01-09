import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";

import useSearch from "../../../hooks/useSearch";
import { AppStore } from "../../../redux/store";
import IAnalysisData from "../../../services/interfaces/IAnalysisData";

function Profile() {
	const [data, setData] = useState<IAnalysisData>({} as IAnalysisData);
	const { inputValue, handleInputChange } = useSearch();
	const analysis = useSelector((store: AppStore) => store.analisis);

	const getData = () => {
		setData(analysis);
	};

	return (
		<main className="main-index">
			<div className="chart-container">
				{/* <RowUser /> */}
				<ul className="row-header d-flex justify-content-center">
					<li>
						<h3>Ingrese su tema</h3>
					</li>
				</ul>
				<ul className="row-user">
					<li className="search-container">
						<input
							type="search"
							name="Search"
							id="sh"
							placeholder="Introduce a word"
							value={inputValue}
							onChange={handleInputChange}
							onFocus={() => document.querySelector(".search-icon")?.classList.add("hide-icon")}
							onBlur={() => {
								if (!inputValue) {
									document.querySelector(".search-icon")?.classList.remove("hide-icon");
								}
							}}
						/>
						<MdSearch className="search-icon" />
					</li>
				</ul>
			</div>
		</main>
	);
}

export default Profile;
