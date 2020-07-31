import { all, call, put, takeEvery } from "redux-saga/effects";

import { CALCULATE_COST, setCost } from "./actions";
import defaultLoadProfile from "assets/defaultLoadProfile.csv";

const calculate = () => {};

function* calculateCost() {
    // Get the user inputs for rate, mileage, schedule, etc.

    // Construct the requisite operations
    const operations = [];
    
    // Get user load profile (or use default)
    console.log(defaultLoadProfile);

    // peform the cost calculation
    const cost = yield call(calculate, ...operations);

    yield put(setCost(cost))
}

function* watchCalculateCost() {
    yield takeEvery(CALCULATE_COST, calculateCost)
}

export default function* rootSaga() {
    yield all([watchCalculateCost()]);
}