export const getRateOptions = (state) => state.rateOptions;
export const getScheduleOptions = (state) => state.scheduleOptions;
export const getCosts = (state) => state.costs;

export const getFormattedRateOptions = (state) => getRateOptions(state).map(({ label, type }) => {
    return { label: label, value: type };
});

export const getFormattedScheduleOptions = (state) => getScheduleOptions(state).map(({ label }) => {
    return { label: label, value: label };
});

export const getRateProfileForType = (type) => (state) => getRateOptions(state).find(option => option.type === type);

export const getSchedule = (label) => (state) => getScheduleOptions(state).find(option => option.label === label)?.value;