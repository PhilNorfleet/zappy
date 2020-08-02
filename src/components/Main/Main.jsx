import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import InputSection from "../Inputs/InputSection";
import { initRateOptions } from "store/actions";

const Main = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // Initialize on first render
        dispatch(initRateOptions());

    }, [dispatch])
    return (
        <Row>
            <Col>
                <InputSection />
            </Col>
            <Col>

            </Col>
        </Row>
    )
}

export default Main;