import { createSlice } from "@reduxjs/toolkit";

import IComments from "../../services/interfaces/IComments";

export const EmptyCommentsState: IComments = {
	body: "",
	score: 0,
	id: "",
	subreddit: "",
	created: 0,
	subreddit_id: "",
	author: "",
	created_date: "",
};

const initialState: IComments[] = [EmptyCommentsState];

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		setComments: (state, action) => {
			return {
				...state,
				...(action.payload as IComments[]),
			};
		},
		clearComments: () => {
			return [EmptyCommentsState];
		},
	},
});

export const { setComments, clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
