import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { state } from "./state";
const modalSlice = createSlice({
    name: "modal",
    initialState: state,
    reducers: reducers
})

const {actions, reducer} = modalSlice;

export const {updateModal, updateModalConfig, updateNotiModal, updateNotiModalConfig} = actions;
export default reducer;