import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Field, Form, Formik, } from 'formik';

import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

import { calculateCost } from "../../store/actions";
import { getRateOptions } from "../../store/selectors";

const InputSection = () => {
	const dispatch = useDispatch();
	const rateOptions = useSelector(getRateOptions)
	if (!rateOptions.length) return <div>Loading...</div>
	return (
		<Formik
			initialValues={ { rate: rateOptions[0]?.value } }
			onSubmit={(values) => console.log(values) || dispatch(calculateCost(values))}
		>
			{ ({ handleChange, values }) => (
				<Form>
					<TextInput/>
					<Field name="rate">
						{({
							field,
							form: { touched, errors },
							meta,
						}) => (
							<SelectInput name={field.name} options={ rateOptions } value={values.rate} onChange={ (e) => console.log(e.target.value) || handleChange(e) }/>
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