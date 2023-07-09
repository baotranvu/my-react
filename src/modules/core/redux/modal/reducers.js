export const reducers = {
    updateModal: (state, action) => {
        state.isShowModal = action.payload;
    },
    updateNotiModal: (state, action) => {
        state.isShowNotiModal = action.payload;
    },
    updateModalConfig: (state, action) => {
        state.modalConfig = action.payload;
    },
    updateNotiModalConfig: (state, action) => {
        state.notiModalConfig = action.payload;
    }
}