import { createSlice } from "@reduxjs/toolkit";

import IPosts from "../../services/interfaces/IPosts";

export const EmptyPostsState: IPosts = {
	score: 0,
	id: "",
	subreddit: "",
	created: 0,
	title: "",
	url: "",
	num_comments: 0,
	selftext: "",
	created_utc: 0,
	author: "",
	upvote_ratio: 0,
	created_date: "",
};

const initialState: IPosts[] = [EmptyPostsState];

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPosts: (state, action) => {
			return {
				...state,
				...(action.payload as IPosts[]),
			};
		},
		clearPosts: () => {
			return [EmptyPostsState];
		},
	},
});

export const { setPosts, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
