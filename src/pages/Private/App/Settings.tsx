import React, { useState } from "react";
import Swal from "sweetalert2";

import { useConfig } from "../../../Config/Config";
import { fetchData } from "../../../services/GetDataServices";
import SettingsStatus from "./SettingsStatus";

function Settings() {
	const { globalConfig, updateConfig } = useConfig();
	const { urlProd, urlDev, devEnv } = globalConfig;
	const { updateSettings } = fetchData();

	// Use state hooks for the form inputs
	const [prodUrl, setProdUrl] = useState(urlProd);
	const [devUrl, setDevUrl] = useState(urlDev);
	const [isDevEnv, setIsDevEnv] = useState(devEnv);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateConfig({ urlProd: prodUrl, urlDev: devUrl, devEnv: isDevEnv });
		const updated = await updateSettings({ urlProd: prodUrl, urlDev: devUrl, devEnv: isDevEnv });
		if (updated.status === 200) {
			return Swal.fire({
				toast: true,
				title: "Configuración actualizada",
				icon: "success",
				showConfirmButton: false,
				position: "center-end",
				timer: 1500,
			});
		}

		return;
	};

	return (
		<main className="main-index">
			<div className="chart-container">
				{/* <RowUser /> */}
				<section className="row-header d-flex justify-content-center">
					<h3>Configuraciones</h3>
				</section>
				<article className="row mt-5">
					<div className="col-12">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Configuración activa</h5>
								<SettingsStatus />
							</div>
						</div>
						{/* formulario para editar la configuracion */}
						<div className="card mt-3">
							<div className="card-body">
								<h5 className="card-title">Editar configuración</h5>
								<div className="card-text">
									<form onSubmit={handleSubmit}>
										<div className="mb-3">
											<label htmlFor="urlProd" className="form-label">
												URL PRODUCCIÓN
											</label>
											<input
												type="text"
												className="form-control"
												id="urlProd"
												defaultValue={urlProd}
												onChange={(e) => setProdUrl(e.target.value)}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="urlDev" className="form-label">
												URL DESARROLLO
											</label>
											<input
												type="text"
												className="form-control"
												id="urlDev"
												defaultValue={urlDev}
												onChange={(e) => setDevUrl(e.target.value)}
											/>
										</div>
										<div className="mb-3 form-check form-switch">
											<input
												type="checkbox"
												className="form-check-input"
												id="devEnv"
												checked={isDevEnv}
												onChange={() => setIsDevEnv(!isDevEnv)}
											/>
											<label className="form-check-label" htmlFor="devEnv">
												Entorno de desarrollo
											</label>
										</div>
										<button type="submit" className="btn btn-primary">
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</article>
			</div>
		</main>
	);
}

export default Settings;
