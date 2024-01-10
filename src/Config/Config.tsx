import React, { createContext, useContext, useState } from "react";

export interface Config {
	urlProd: string;
	urlDev: string;
	devEnv: boolean;
}

const ConfigContext = createContext({
	globalConfig: {
		urlProd: "",
		urlDev: "",
		devEnv: false,
	},
	updateConfig: (newConfig: Config) => {},
});

export const ConfigProvider = ({ children }) => {
	const [globalConfig, setGlobalConfig] = useState({
		// Definir tus variables globales iniciales aquí
		urlProd: "https://back.nlp-project.me",
		urlDev: "http://localhost:5000",
		devEnv: true,
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
