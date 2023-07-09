import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { state } from "./state";
const userSlice = createSlice({
    name: "user",
    initialState: state,
    reducers: reducers
})

const { actions, reducer } = userSlice;
export const { updateUserList } = actions;
export default reducer;