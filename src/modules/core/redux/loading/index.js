import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { state } from "./state";
const loadingSlice = createSlice({
    name: "loading",
    initialState: state,
    reducers: reducers
})

const { actions, reducer } = loadingSlice;
export const { updateLoading } = actions;
export default reducer;