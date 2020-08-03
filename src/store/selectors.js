const getRateOptions = (state) => state.rateOptions;

export const getFormattedRateOptions = (state) => getRateOptions(state).map(({ label, type }) => {
    return { label: label, value: type };
});

export const getRateProfileForType = (type) => (state) => getRateOptions(state).find((option) => option.type === type);