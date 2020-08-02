import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const SelectInput = ({ options }) => {
    
    return (
        <InputGroup>
            <FormControl as="select" aria-label="Small">
                {options.map(({ label }) => {
                    return (<option>{label}</option>)
                })}
            </FormControl>
        </InputGroup>
    )
}

export default SelectInput;