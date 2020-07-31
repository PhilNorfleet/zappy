import { createAction } from '@reduxjs/toolkit'

export const CALCULATE_COST = "CALCULATE_COST";
export const calculateCost = () => createAction(CALCULATE_COST)();

export const SET_COST = "SET_COST";
export const setCost = ( cost ) => createAction(SET_COST, { cost })();