import { all, call, put, takeEvery, select, fork } from "redux-saga/effects";

import defaultLoadProfile from "assets/defaultLoadProfile.csv";

import { getRateOptions, getRateProfileForType, getSchedule,  } from "store/selectors";
import { INIT_RATE_OPTIONS, setRateOptions, CALCULATE_COST, setCosts } from "store/actions";

import calculateCost from "utils/calculateCost";

function* calculateYearlyCost( rateOption, mileage, scheduleArray) {
    const { type } = rateOption;
    const rateProfile = yield select(getRateProfileForType(type));
    const cost = yield call(calculateCost, defaultLoadProfile, rateProfile, mileage, scheduleArray);
    return { type, ...cost };
}


function* calculateYearlyCosts({ payload: { rateType, mileage, schedule } }) {
    const rateOptions = yield select(getRateOptions);
    const scheduleArray = yield select(getSchedule(schedule));

    const costs = yield all(rateOptions.map( rateOption => {
        return call(calculateYearlyCost, rateOption, mileage, scheduleArray)
    }))
    console.log(costs);
    
    yield put(setCosts(costs))
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
                        type: "flat",
                        rate: 0.15, // $/kWh
                        calculation: (energy, rate) => energy * rate,
                    },
                    {
                        label: "B: TOU - $0.20/kWh between noon and 6pm, and $0.08/kWh otherwise",
                        type: "tou",
                        rate: [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.20, 0.20, 0.20, 0.20, 0.20, 0.20, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08,],
                        calculation: (energy, rate, hour) => energy * rate[hour - 1],
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
    yield takeEvery(CALCULATE_COST, calculateYearlyCosts);
    yield takeEvery(INIT_RATE_OPTIONS, initRateOptions);
}

export default function* rootSaga() {
    yield all([watch()]);
}