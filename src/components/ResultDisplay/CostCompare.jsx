import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import { getRateOptions, getCosts } from "../../store/selectors";

const CostCompare = () => {
    const rateOptions = useSelector(getRateOptions);
    const costs = useSelector(getCosts);
    return (
        <>
            <Col>
                { rateOptions.map(({ type }) => <div>{type}</div>) }
            </Col>
            <Col>
                {
                    rateOptions.map(({ type }) => <div>{costs[type]?.B1}</div>)
                }
            </Col>
        </>
    )
}

export default CostCompare;