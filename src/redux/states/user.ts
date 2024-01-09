import { createSlice } from "@reduxjs/toolkit";

import { UserInfo } from "../../models";
import { clearLocalStorage, persistLocalStorage } from "../../utilities";

export const EmptyUserState: UserInfo = {
	name: "",
	email: "",
	id: 0,
};

export const UserKey = "user";

export const userSlice = createSlice({
	name: "user",
	initialState: localStorage.getItem("user")
		? (JSON.parse(localStorage.getItem("user") as string) as UserInfo)
		: EmptyUserState,
	reducers: {
		createUser: (state, action) => {
			persistLocalStorage<UserInfo>(UserKey, action.payload as UserInfo);

			return action.payload as UserInfo;
		},
		updateUser: (state, action) => {
			const result = { ...state, ...(action.payload as UserInfo) };
			persistLocalStorage<UserInfo>(UserKey, result);

			return result;
		},
		resetUser: () => {
			clearLocalStorage(UserKey);

			return EmptyUserState;
		},
	},
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
