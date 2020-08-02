import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

import { calculateCost } from "../../store/actions";
import { getRateOptions } from "../../store/selectors";

const InputSection = () => {
	const dispatch = useDispatch();
	const rateOptions = useSelector(getRateOptions)
	
	const handleSubmit = (event) => {
		console.log(event)
		event.preventDefault();
		dispatch(calculateCost());
	}

	return (
		<Form onSubmit={handleSubmit}>
			<TextInput/>
			<SelectInput options={rateOptions} />
			<Button type="submit">
				Calculate Rate!
			</Button>
		</Form>

	)
}

export default InputSection