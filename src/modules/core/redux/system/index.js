import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { state } from "./state";
const systemSlice = createSlice({
    name: "system",
    initialState: state,
    reducers: reducers
})

const { actions, reducer } = systemSlice;
export const { updatePageName } = actions;
export default reducer;