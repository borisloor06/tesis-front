import React from "react";

import { useConfig } from "../../../Config/Config";

export default function SettingsStatus() {
	const { globalConfig } = useConfig();
	const { urlProd, urlDev, devEnv } = globalConfig;

	return (
		<p className="card-text">
			{devEnv ? (
				<>
					<span className="badge bg-warning text-dark">DEV</span>
					<span className="badge bg-secondary text-light">{urlDev}</span>
				</>
			) : (
				<>
					<span className="badge bg-success text-light">PROD</span>
					<span className="badge bg-secondary text-light">{urlProd}</span>
				</>
			)}
		</p>
	);
}
