import { configureStore } from "@reduxjs/toolkit";

import { UserInfo } from "../models";
import IAnalysisData from "../services/interfaces/IAnalysisData";
import analisisSliceReducer from "./states/analisis";
import userSliceReducer from "./states/user";

export interface AppStore {
	user: UserInfo;
	analisis: IAnalysisData;
}

export default configureStore<AppStore>({
	reducer: {
		user: userSliceReducer,
		analisis: analisisSliceReducer,
	},
});
