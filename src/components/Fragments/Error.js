import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const Error = (props) => {
    return (
        <div className="text-center text-danger">
            <Row>
                <Col className="h2" lg>
                    Nincs kapcsolat a szerverrel!
                </Col>
            </Row>
            <Row>
                <Col className="h5" lg>
                    Próbáld meg később.
                </Col>
            </Row>
        </div>
    )
}