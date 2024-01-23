import React, { createContext, useContext, useState } from "react";

export interface Config {
	urlProd: string;
	urlDev: string;
	devEnv: boolean;
	fechaInicio: string;
	fechaFin: string;
}

const ConfigContext = createContext({
	globalConfig: {
		urlProd: "",
		urlDev: "",
		devEnv: false,
		fechaInicio: "2023-01-01",
		fechaFin: "2023-01-10",
	},
	updateConfig: (newConfig: Config) => {},
});

export const ConfigProvider = ({ children }) => {
	const [globalConfig, setGlobalConfig] = useState({
		// Definir tus variables globales iniciales aquí
		urlProd: "https://back.nlp-project.me",
		urlDev: "http://localhost:5000",
		devEnv: false,
		fechaInicio: "2023-01-01",
		fechaFin: "",
	});

	const updateConfig = (newConfig: Config) => {
		setGlobalConfig((prevConfig) => ({
			...prevConfig,
			...newConfig,
		}));
	};

	return (
		<ConfigContext.Provider value={{ globalConfig, updateConfig }}>
			{children}
		</ConfigContext.Provider>
	);
};

export const useConfig = () => {
	return useContext(ConfigContext);
};
