import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Field, Form, Formik, } from 'formik';

import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

import { calculateCost } from "../../store/actions";
import { getFormattedRateOptions } from "../../store/selectors";

const InputSection = () => {

	const dispatch = useDispatch();
	const rateOptions = useSelector(getFormattedRateOptions)

	if (!rateOptions.length) return <div>Loading the latest rates...</div>
	return (
		<Formik
			initialValues={ { rateType: rateOptions[0]?.value } }
			onSubmit={(values) => dispatch(calculateCost(values))}
		>
			{ ({ handleChange, values }) => (
				<Form>
					<TextInput/>
					<Field name="rate">
						{({
							field,
						}) => (
							<SelectInput name={field.name} options={ rateOptions } value={values.rateType} onChange={ (e) => handleChange(e) }/>
						)

						}
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