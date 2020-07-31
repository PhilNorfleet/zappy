import React from "react";
import { useDispatch } from "react-redux";
import { Form, InputGroup, Button } from "react-bootstrap";

import { calculateCost } from "../../store/actions";
import TextInput from "./TextInput";

const InputSection = () => {
	const dispatch = useDispatch();
	console.log(calculateCost());
	return (
		<Form>
			<InputGroup size="sm" className="mb-3">
				<TextInput/>
			</InputGroup>
			<Button onClick={() => dispatch(calculateCost())}>
				Calculate Rate!
			</Button>
		</Form>

	)
}

export default InputSection