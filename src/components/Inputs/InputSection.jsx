import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Field, Form, Formik, } from 'formik';

import SelectInput from "./SelectInput";
import SliderInput from "./SliderInput";

import { calculateCost } from "../../store/actions";
import { getFormattedRateOptions, getFormattedScheduleOptions } from "../../store/selectors";

const InputSection = () => {

	const dispatch = useDispatch();
	
	const rateOptions = useSelector(getFormattedRateOptions);
	const scheduleOptions = useSelector(getFormattedScheduleOptions);

	// We are "fetching" rates from some service so wait for them
	// TODO: create a loading state in the redux store
	if (!rateOptions.length) return <div>Loading the latest rates...</div>

	return (
		<Formik
			initialValues={ { rateType: rateOptions[0]?.value, mileage: 10000, schedule: scheduleOptions[0].value } }
			onSubmit={(values) => dispatch(calculateCost(values))}
		>
			{ ({ handleChange, values }) => (
				<Form>
					<Field name="rateType">
						{({
							field,
						}) => (
							<SelectInput name={field.name} options={ rateOptions } value={ values.rateType } onChange={ handleChange } />
						)}
					</Field>
					<Field name="mileage">
						{({
							field,
						}) => (
							<SliderInput name={field.name}  min={1000} max={100000} step={1000} value={values.mileage} onChange={ handleChange } />
						)}
					</Field>
					<Field name="schedule">
						{({
							field,
						}) => (
							<SelectInput name={field.name} options={ scheduleOptions } value={values.schedule} onChange={ handleChange } />
						)}
					</Field>
					<Button type="submit">
						Calculate Rate!
					</Button>
				</Form>
			)}
		</Formik>


	)
}

export default InputSection;