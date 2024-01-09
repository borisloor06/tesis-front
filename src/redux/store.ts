import { configureStore } from "@reduxjs/toolkit";

import { UserInfo } from "../models";
import IAnalysisData from "../services/interfaces/IAnalysisData";
import IComment from "../services/interfaces/IComments";
import IPost from "../services/interfaces/IPosts";
import analisisSliceReducer from "./states/analisis";
import filterSliceReducer from "./states/analisisfiltered";
import comentariosSliceReducer from "./states/comments";
import postsSliceReducer from "./states/posts";
import userSliceReducer from "./states/user";

export interface AppStore {
	user: UserInfo;
	analisis: IAnalysisData;
	comentarios: IComment[];
	posts: IPost[];
	filtered: IAnalysisData;
}

export default configureStore<AppStore>({
	reducer: {
		user: userSliceReducer,
		analisis: analisisSliceReducer,
		comentarios: comentariosSliceReducer,
		posts: postsSliceReducer,
		filtered: filterSliceReducer,
	},
});
