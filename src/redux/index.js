import { configureStore } from "@reduxjs/toolkit";

//import module

import modalSlice from "../modules/core/redux/modal";
import loadingSlice from "../modules/core/redux/loading";
import userSlide from "../modules/user/redux";
import authSlice from "../modules/auth/redux";
import sidebarSlice from "../modules/core/redux/sidebar";
import systemSlice from "../modules/core/redux/system";
const store = configureStore({
    reducer: {
        loading: loadingSlice,
        modal: modalSlice,
        user: userSlide,
        auth: authSlice,
        sidebar: sidebarSlice,
        system:systemSlice,
    },
})
export default store;