import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import TextInput from "./TextInput";

const InputSection = () => {
	return (
		<Form
			onSubmit={() => {}}
		>
			<InputGroup size="sm" className="mb-3">
				<TextInput/>
			</InputGroup>
			<Button type="submit">
				Calculate Rate!
			</Button>
		</Form>

	)
}

export default InputSection