// Calculate the yearly electricity costs by iterating over the hourly usage in the loadProfile.
// The rateProfile has two members:
// 1) a calculation (function) that computes hourly cost of power consumed
// 2) a rate (number or number array) to pass to the calculation

const calculateCost = (loadProfile, rateProfile, mileage, schedule) => {

    const { rate, calculation } = rateProfile;
    // Daily energy consumption is yearly mileage divided by 365 multiplied by the average kWh per mile: 0.3
    const ev_daily_kWh = 0.3 * mileage / 365;
    // Per hour energy consumption is the daily consumption divided by the number of scheduled charging hours
    const ev_hourly_kWh = ev_daily_kWh / schedule.reduce((a, b) => a + b);

    let B1 = 0;
    let last_month = 1;
    let monthly_peak = 0;
    let monthly_total = 0;
    let monthly_peak_ev = 0;
    let monthly_total_ev = 0;


    const B2 = loadProfile.reduce((acc, current) => {
        const dateTime = current["Date/Time"];
        const date = dateTime[0];
        const month = +(date.split("/")[0]);
        const hour = +(dateTime[1].split(":")[0]);
        if (last_month !== month) {
            monthly_peak = 0;
            monthly_total = 0;
            monthly_peak_ev = 0;
            monthly_total_ev = 0;
            last_month = month;
        }

        // B1 Calculation -- sum hourly consumption from load profile (using the relevant keys)
        let base_energy = 0;
        for (let el in current) {
            if (el.indexOf("Electricity") !== -1) {
                base_energy += current[el];
            }
        }
        monthly_total += base_energy;
        monthly_peak = base_energy > monthly_peak ? base_energy : monthly_peak;

        B1 += calculation(base_energy, rate, hour, monthly_total, monthly_peak);

        // EV Calculation -- if the vehicle would be charged that hour, use derived hourly consumption
        let EV_energy = 0;
        if (schedule[hour - 1]) {
            EV_energy = ev_hourly_kWh;
        }

        monthly_total_ev += base_energy + EV_energy;
        monthly_peak_ev = base_energy + EV_energy > monthly_peak_ev ? base_energy + EV_energy : monthly_peak_ev;

        // Calculate B2 for that hour by adding the consumption of household items and the EV
        return acc + calculation(base_energy + EV_energy, rate, hour, monthly_total_ev, monthly_peak_ev)

    }, 0)

    return { B1, B2 };
};

export default calculateCost;