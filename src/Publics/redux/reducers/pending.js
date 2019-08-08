const initialState = {
    pendingList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};
//manage state 
const pending = (state = initialState, action) => {
    switch (action.type) {
        // GET ALL BOOKS
        case 'GET_STATUS_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_STATUS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_STATUS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                pendingList : action.payload.data.result,
            };

            // editpending
            case 'STATUS_EDIT_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'STATUS_EDIT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'STATUS_EDIT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                pendingList : [state.pendingList, action.payload.data[0]]
            };
        default:
            return state;
    }
};

export default pending;