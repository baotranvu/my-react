import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { state } from "./state";


const authSlice = createSlice({
    name: "auth",
    initialState: state,
    reducers: reducers
});

const { actions, reducer } = authSlice;
export const { login, logout, updateAdmin } = actions;
export default reducer;