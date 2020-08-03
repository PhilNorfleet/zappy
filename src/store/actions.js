import { createAction } from '@reduxjs/toolkit'

export const INIT_RATE_OPTIONS = "INIT_RATE_OPTIONS";
export const initRateOptions = () => createAction(INIT_RATE_OPTIONS)();

export const SET_RATE_OPTIONS = "SET_RATE_OPTIONS";
export const setRateOptions = (rate_options) => createAction(SET_RATE_OPTIONS)(rate_options);

export const CALCULATE_COST = "CALCULATE_COST";
export const calculateCost = (values) => createAction(CALCULATE_COST)(values);

export const SET_COSTS = "SET_COSTS";
export const setCosts = (costs) => createAction(SET_COSTS)(costs);