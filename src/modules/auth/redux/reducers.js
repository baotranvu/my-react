import { removeLocal } from "@modules/core/utils";
import { isAdmin, getUserInfo  } from "../utils";

export const reducers = {
    login(state) {
        state.isAuthenticated = true;
        state.isAdmin = isAdmin();
        state.accountInfo = getUserInfo();
    },
    logout(state) {
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.accountInfo = null;
        removeLocal('token'); 
    },
    
}