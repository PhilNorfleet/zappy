import React from "react";
import { FormControl } from "react-bootstrap";

const SelectInput = ({ name, options, value, onChange }) => {
    
    return (
        <div className="mb-3">
            <FormControl as="select" name={name} value={value} onChange={onChange}>
                {options.map(({ value, label }, index) => {
                    return (<option key={index} value={value} label={label} />)
                })}
            </FormControl>
        </div>

    )
}

export default SelectInput;