import { SET_RATE_OPTIONS, SET_COSTS } from "./actions";

const initialState = {
    rateOptions: [],
    scheduleOptions: [
        {
            label: "Morning - 4AM to Noon",
            value: [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            label: "Afternoon - Noon to 8PM",
            value: [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0]
        },
        {
            label: "Night - 8PM to 4AM",
            value: [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1]
        },
        {
            label: "Unpredictable -- Any Time",
            value: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        }
    ],
    costs: {},
};

const appReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case SET_RATE_OPTIONS:
            return {
                ...state,
                rateOptions: payload
            }
        case SET_COSTS:
            return {
                ...state,
                costs: payload
            }
        default:
            return state;
    }
}

export default appReducer;