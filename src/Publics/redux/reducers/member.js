const initialState = {
    memberList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

//manage state 
const register = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                memberList : action.payload.data.result
            };
         
        default:
            return state;
    };

}

export default register