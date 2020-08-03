import React, { useState } from 'react';
import { FormControl } from "react-bootstrap";

const SliderInput = ({ label, name, value, min, max, onChange, displayValue }) => {
    // 2020 and you have to do some stupid stuff to make a controlled slider
    const [val, setValue] = useState(value);
    return (
        <div className="mb-3">
            <div>{label}</div>
            <FormControl type="range" name={name} value={val} min={ min } max={ max } onChange={e => setValue(e.target.value) || onChange(e) } />
            <div>{displayValue(value)}</div>
        </div>
    );

};

export default SliderInput;