import axios from "axios";

const SERVER = "https://back.nlp-project.me";

export const getAnalysis = async () => {
	return await axios.get(`${SERVER}/analisis`);
};

export const getPosts = async () => {
	return await axios.get(`${SERVER}/posts_data`);
};

export const getComments = async () => {
	return await axios.get(`${SERVER}/comments_data`);
};

export const getResumeData = async () => {
	return await axios.get(`${SERVER}/resume_data`);
};

export const getCommentsByFilter = async (fechaInicio: string, fechaFin: string, reddit='ChatGpt') => {
	return await axios.get(
		`${SERVER}/comments_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
	);
};
export const getPostsByFilter = async (fechaInicio: string, fechaFin: string, reddit='ChatGpt') => {
	return await axios.get(
		`${SERVER}/comments_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
	);
};
export const getAnalysisByFilter = async (fechaInicio: string, fechaFin: string, reddit='ChatGpt') => {
	return await axios.get(
		`${SERVER}/analisis_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
	);
};
