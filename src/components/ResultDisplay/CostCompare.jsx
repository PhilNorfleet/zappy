import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import { getRateOptions, getFormattedCosts, getLowestCostType } from "../../store/selectors";

const CostCompare = () => {
    const rateOptions = useSelector(getRateOptions);
    const costs = useSelector(getFormattedCosts);
    const lowestCostType = useSelector(getLowestCostType);

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Rate</th>
                    <th>B1</th>
                    <th>B2</th>
                    <th>Ideal</th>
                </tr>
            </thead>
            <tbody>
                { rateOptions.map(({ type }) => (
                    <tr>
                        <td>{type}</td>
                        <td>{costs[type]?.B1}</td>
                        <td>{costs[type]?.B2}</td>
                        <td>{type === lowestCostType ? "Yes" : "No"}</td>
                    </tr>
                ))}
            </tbody>
                
        </Table>
    )
}

export default CostCompare;