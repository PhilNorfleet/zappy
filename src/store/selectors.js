import { createSelector } from "@reduxjs/toolkit";

export const getRateOptions = (state) => state.rateOptions;
export const getScheduleOptions = (state) => state.scheduleOptions;
export const getCosts = (state) => state.costs;
export const getLowestCostType = (state) => state.lowestCostType;

export const getFormattedRateOptions = (state) => getRateOptions(state).map(({ label, type }) => {
    return { label: label, value: type };
});

export const getFormattedScheduleOptions = (state) => getScheduleOptions(state).map(({ label }) => {
    return { label: label, value: label };
});

export const getRateProfileForType = (type) => (state) => getRateOptions(state).find(option => option.type === type);

export const getSchedule = (label) => (state) => getScheduleOptions(state).find(option => option.label === label)?.value;

const formatCost = (cost) => {
    return `$${Math.round(cost)}`
}

export const getFormattedCosts = createSelector(
    getCosts,
    costs => {
        const formattedCosts = {};
        costs.forEach(({ type, B1, B2 }) => {
            formattedCosts[type] = {
                B1: formatCost(B1),
                B2: formatCost(B2),
            }
        });
        return formattedCosts;
    }
);