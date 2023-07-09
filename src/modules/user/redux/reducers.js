export const reducers = {
    updateUserList: (state, action) => {
        state.list = action.payload;
    },
    
}