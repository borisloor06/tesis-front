import axios from "axios";

import { ResponseComments } from "./interfaces/IComments";
import { ResponsePosts } from "./interfaces/IPosts";

const SERVER = "https://back.nlp-project.me";
// const SERVER = "http://localhost:5000";

export const getAnalysis = async () => {
	return await axios.get(`${SERVER}/analisis`);
};

export const getPosts = async (limit: number, offset: number, reddit = "ChatGpt") => {
	return await axios.get<ResponsePosts>(
		`${SERVER}/posts_data?name=${reddit}&offset=${offset}&limit=${limit}`
	);
};

export const getComments = async (limit: number, offset: number, reddit = "ChatGpt") => {
	return await axios.get<ResponseComments>(
		`${SERVER}/comments_data?name=${reddit}&offset=${offset}&limit=${limit}`
	);
};

export const getResumeData = async () => {
	return await axios.get(`${SERVER}/resume_data`);
};

export const getCommentsByFilter = async (
	fechaInicio: string,
	fechaFin: string,
	reddit = "ChatGpt"
) => {
	return await axios.get(
		`${SERVER}/comments_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
	);
};
export const getPostsByFilter = async (
	fechaInicio: string,
	fechaFin: string,
	reddit = "ChatGpt"
) => {
	return await axios.get(
		`${SERVER}/comments_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
	);
};
export const getAnalysisByFilter = async (
	fechaInicio: string,
	fechaFin: string,
	reddit = "ChatGpt"
) => {
	return await axios.get(
		`${SERVER}/analisis_filter?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&name=${reddit}`
	);
};
