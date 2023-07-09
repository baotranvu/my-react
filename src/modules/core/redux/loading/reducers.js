export const reducers = {
    updateLoading: (state, action) => {
        state.loading = action.payload;
    },
};