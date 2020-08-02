import { all, call, put, takeEvery } from "redux-saga/effects";

import { INIT_RATE_OPTIONS, setRateOptions, CALCULATE_COST, setCost } from "./actions";
import defaultLoadProfile from "assets/defaultLoadProfile.csv";

const calculateB1 = (loadProfile, rate) => {
    let B1 = 0;
    const [ rateType, rateAmount ] = rate;
    if (rateType === "flat") {
        B1 = loadProfile.reduce((acc, current, index, array) => {
            let sum = 0;
            for (let el in current) {
                if (el.indexOf("Electricity") !== -1) {
                    sum += current[el]
                }
            }
            return acc + (sum * rateAmount)
        }, 0)
    }
    console.log(B1)
    return B1;

};

function* calculateCost({payload: { rate, mileage, schedule }}) {
    console.log(rate)
    console.log(defaultLoadProfile);
    const B1 = yield call(calculateB1, defaultLoadProfile, rate)

}

// Simulate fetching formatted rate options from some server, for fun...
const fetchRateOptions = () => {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            status: 200,
            body: { 
                options: [
                    {
                        label: "A: Flat - $0.15/kWh",
                        value: ["flat", 0.15]
                    },
                    {
                        label: "B: TOU - $0.20/kWh between noon and 6pm, and $0.08/kWh otherwise",
                        value: ["tou", [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.20, 0.20, 0.20, 0.20, 0.20, 0.20, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08,]]
                    },
                ]
             },
          });
        }, 1000) // simulate server work/load
    });
}

function* initRateOptions() {
    
    const { body: { options: rate_options  } } = yield call(fetchRateOptions);
    yield put(setRateOptions(rate_options));
}

function* watch() {
    yield takeEvery(CALCULATE_COST, calculateCost);
    yield takeEvery(INIT_RATE_OPTIONS, initRateOptions);
}

export default function* rootSaga() {
    yield all([watch()]);
}