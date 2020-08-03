import React, { useState } from 'react';
import { FormControl } from "react-bootstrap";

const SliderInput = ({ name, value, min, max, onChange }) => {
    const [val, setValue] = useState(value);
    return (
        <FormControl type="range" name={name} value={val} min={ min } max={ max } onChange={e => setValue(e.target.value) || onChange(e) } />
    );

};

export default SliderInput;