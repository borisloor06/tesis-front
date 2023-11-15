import axios from "axios";

const SERVER = "http://localhost:5000/analisis";


export const getAnalysis = async () => {
    return await axios.get(`${SERVER}`);
};

export const getPosts = async () => {
    return await axios.get(`${SERVER}`);
};

export const getComments = async (id: any) => {
    return await axios.get(`${SERVER}/${id}`);
};
