import { SET_COST } from "./actions";

const initialState = {
    cost: 0,
};

const appReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case SET_COST: 
            return {
                ...state,
                cost: payload
            }
        default:
            return state;
    }
}

export default appReducer;