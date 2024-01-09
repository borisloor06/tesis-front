import { createSlice } from "@reduxjs/toolkit";

import IAnalysisData from "../../services/interfaces/IAnalysisData";
import { clearLocalStorage, persistLocalStorage } from "../../utilities";

export const EmptyAnalisisState: IAnalysisData = {
	average_author_comment_count: 0,
	average_comment_post_count: 0,
	average_comment_score: 0,
	comments_grouped: {},
	posts_grouped: {},
	posts_dates: {
		fecha_inicio: 0,
		fecha_fin: 0,
	},
	comments_dates: {
		fecha_inicio: 0,
		fecha_fin: 0,
	},
	keywords: {
		posts: {},
		comment: {},
		all: {},
	},
	topic_extraction: {},
	total_authors: 0,
	total_comments: 0,
	total_posts: 0,
	emotion_analysis: {
		total_count: 0,
		total_average: 0,
		average: {
			admiration: 0,
			amusement: 0,
			anger: 0,
			annoyance: 0,
			approval: 0,
			caring: 0,
			confusion: 0,
			curiosity: 0,
			desire: 0,
			disappointment: 0,
			disapproval: 0,
			disgust: 0,
			embarrassment: 0,
			excitement: 0,
			fear: 0,
			gratitude: 0,
			grief: 0,
			joy: 0,
			love: 0,
			nervousness: 0,
			neutral: 0,
			optimism: 0,
			pride: 0,
			realization: 0,
			relief: 0,
			remorse: 0,
			sadness: 0,
			surprise: 0,
		},
		count: {
			admiration: 0,
			amusement: 0,
			anger: 0,
			annoyance: 0,
			approval: 0,
			caring: 0,
			confusion: 0,
			curiosity: 0,
			desire: 0,
			disappointment: 0,
			disapproval: 0,
			disgust: 0,
			embarrassment: 0,
			excitement: 0,
			fear: 0,
			gratitude: 0,
			grief: 0,
			joy: 0,
			love: 0,
			nervousness: 0,
			neutral: 0,
			optimism: 0,
			pride: 0,
			realization: 0,
			relief: 0,
			remorse: 0,
			sadness: 0,
			surprise: 0,
		},
	},
	transformer_analysis: {
		total_count: 0,
		total_average: 0,
		average: {
			positive: 0,
			neutral: 0,
			negative: 0,
		},
		count: {
			positive: 0,
			neutral: 0,
			negative: 0,
		},
	},
	vader_analysis: {
		total_count: 0,
		total_average: 0,
		average: {
			positive: 0,
			neutral: 0,
			negative: 0,
		},
		count: {
			positive: 0,
			neutral: 0,
			negative: 0,
		},
	},
};

export const AnalisisKey = "analisis";

export const analisisSlice = createSlice({
	name: AnalisisKey,
	initialState: localStorage.getItem(AnalisisKey)
		? (JSON.parse(localStorage.getItem(AnalisisKey) as string) as IAnalysisData)
		: EmptyAnalisisState,
	reducers: {
		createAnalisis: (state, action) => {
			persistLocalStorage<IAnalysisData>(AnalisisKey, action.payload as IAnalysisData);

			return action.payload as IAnalysisData;
		},
		updateAnalisis: (state, action) => {
			const result = { ...state, ...(action.payload as IAnalysisData) };
			persistLocalStorage<IAnalysisData>(AnalisisKey, result as IAnalysisData);

			return result;
		},
		resetAnalisis: () => {
			clearLocalStorage(AnalisisKey);

			return EmptyAnalisisState;
		},
	},
});

export const { createAnalisis, updateAnalisis, resetAnalisis } = analisisSlice.actions;

export default analisisSlice.reducer;
