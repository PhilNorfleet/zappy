import { SET_RATE_OPTIONS, SET_COST } from "./actions";

const initialState = {
    rateOptions: [],
    cost: 0,
};

const appReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case SET_RATE_OPTIONS: 
            return {
                ...state,
                rateOptions: payload
            }
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