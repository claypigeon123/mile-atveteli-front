import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export class Error extends Component {
    render() {
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
}

export default Error;