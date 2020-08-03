import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import InputSection from "../Inputs/InputSection";
import CostCompare from "../ResultDisplay/CostCompare";
import { initRateOptions } from "store/actions";

const Main = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // Initialize on first render (dispatch never changes but react throws a warning if you have unwatched dependency)
        dispatch(initRateOptions());
    }, [dispatch])
    return (
        <Row>
            <Col>
                <InputSection />
            </Col>
            <Col>
                <CostCompare />
            </Col>
        </Row>
    )
}

export default Main;