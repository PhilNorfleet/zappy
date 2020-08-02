import React from "react";
import { FormControl } from "react-bootstrap";

const SelectInput = ({ name, options, value, onChange }) => {
    
    return (
        <FormControl as="select" aria-label="Small" name={name} value={value} onChange={onChange}>
            {options.map(({ value, label }, index) => {
                return (<option key={index} value={value} label={label} />)
            })}
        </FormControl>
    )
}

export default SelectInput;