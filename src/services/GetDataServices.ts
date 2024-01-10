import axios from "axios";

import { useConfig } from "../Config/Config";

export const fetchData = () => {
	const { globalConfig } = useConfig();

	// Destructure the necessary values from the context
	const { devEnv, urlDev, urlProd } = globalConfig;
	const SERVER = devEnv ? urlDev : urlProd;

	const getAnalysis = async () => {
		return await axios.get(`${SERVER}/analisis`);
	};

	const getPosts = async (limit: number, offset: number, reddit = "ChatGpt") => {
		return await fetch(`${SERVER}/posts_data?name=${reddit}&offset=${offset}&limit=${limit}`, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
	};

	const getComments = async (limit: number, offset: number, reddit = "ChatGpt") => {
		return await axios.get(
			`${SERVER}/comments_data?name=${reddit}&offset=${offset}&limit=${limit}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);
	};

	const getResumeData = async () => {
		return await axios.get(`${SERVER}/resume_data`);
	};

	const getCommentsByFilter = async (fechaInicio: string, fechaFin: string, reddit = "ChatGpt") => {
		return await axios.get(
			`${SERVER}/comments_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
		);
	};

	const getPostsByFilter = async (fechaInicio: string, fechaFin: string, reddit = "ChatGpt") => {
		return await axios.get(
			`${SERVER}/posts_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
		);
	};

	const getAnalysisByFilter = async (fechaInicio: string, fechaFin: string, reddit = "ChatGpt") => {
		return await axios.get(
			`${SERVER}/analisis_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
		);
	};

	const getSettings = async () => {
		return await axios.get(`${SERVER}/config`);
	};

	const updateSettings = async (config: any) => {
		return await axios.post(`${SERVER}/config`, config);
	};

	return {
		getAnalysis,
		getPosts,
		getComments,
		getResumeData,
		getCommentsByFilter,
		getPostsByFilter,
		getAnalysisByFilter,
		getSettings,
		updateSettings,
	};
};
