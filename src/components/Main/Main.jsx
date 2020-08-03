import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

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
        
    <Container style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Row style={{ margin: "auto" }}>
            <Col>
                <InputSection />
            </Col>
            <Col>
                <CostCompare />
            </Col>
        </Row>
    </Container>
        
    )
}

export default Main;