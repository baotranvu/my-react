import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { state } from "./state";
const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: state,
    reducers: reducers
})

const { actions, reducer } = sidebarSlice;
export const { updateOpen } = actions;
export default reducer;