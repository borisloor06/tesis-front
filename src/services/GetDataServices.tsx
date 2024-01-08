import axios from "axios";

const SERVER = "https://back.nlp-project.me";


export const getAnalysis = async () => {
    return await axios.get(`${SERVER}/analisis`);
};

export const getPosts = async () => {
    return await axios.get(`${SERVER}`);
};

export const getComments = async (id: any) => {
    return await axios.get(`${SERVER}/${id}`);
};

export const getResumeData = async () => {
    return await axios.get(`${SERVER}/resume_data`);
};