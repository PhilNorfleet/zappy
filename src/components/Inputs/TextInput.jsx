import React from "react";

import { FormControl } from "react-bootstrap";
const TextInput = ({ handleChange }) => {
    return (
        <FormControl aria-label="Small" onChange={handleChange}/>
    )
}

export default TextInput;