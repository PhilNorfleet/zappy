import { all, call, put, takeEvery, select } from "redux-saga/effects";

import { INIT_RATE_OPTIONS, setRateOptions, CALCULATE_COST, setCost } from "./actions";
import defaultLoadProfile from "assets/defaultLoadProfile.csv";
import { getRateProfileForType } from "store/selectors";

// Calculate the baseline electricity cost from a given load profile and rate.
const calculateYearlyB1 = (loadProfile, rateProfile) => {
    let B1 = 0;
    const { rate, calculation } = rateProfile;
    B1 = loadProfile.reduce((acc, current) => {
        let power = 0;
        let dateTime = current["Date/Time"];
        for (let el in current) {
            if (el.indexOf("Electricity") !== -1) {
                power += current[el]
            }
        }
        return acc + calculation(power, rate, dateTime)
    }, 0)

    return B1;
};



function* calculateYearlyCost({ payload: { rateType, mileage, schedule } }) {
    console.log(rateType)
    console.log(defaultLoadProfile);
    // Get the rate profile from the selected rate rateType
    const rateProfile = yield select(getRateProfileForType(rateType));
    const B1 = yield call(calculateYearlyB1, defaultLoadProfile, rateProfile)
    console.log(B1)
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
                        rate: 0.15,
                        calculation: (power, rate) => power * rate,
                    },
                    {
                        label: "B: TOU - $0.20/kWh between noon and 6pm, and $0.08/kWh otherwise",
                        type: "tou",
                        rate: [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.20, 0.20, 0.20, 0.20, 0.20, 0.20, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08,],
                        calculation: (power, rate, dateTime,) => power * rate[+(dateTime[1].split(":")[0]) - 1],
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
    yield takeEvery(CALCULATE_COST, calculateYearlyCost);
    yield takeEvery(INIT_RATE_OPTIONS, initRateOptions);
}

export default function* rootSaga() {
    yield all([watch()]);
}