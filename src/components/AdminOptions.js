import React, { Component } from 'react';
import Settings from './Fragments/Settings';
import Users from './Fragments/Users';
import { withAlert } from 'react-alert';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

export class AdminOptions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authorized: false,

            pwd: ""
        };

        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();

        const data = this.state.pwd;
        axios.post("/api/atveteli/auth", data, {headers: {'Content-Type': 'text/plain'}}).then(res => {
            if (res.status === 200) {
                this.props.alert.removeAll();
                this.props.alert.success("Sikeres belépés!");
                this.setState({
                    authorized: true
                });
            }
        }).catch(err => {
            console.log(err);
            this.props.alert.removeAll();
            this.props.alert.error("Sikertelen belépés!");
        }).then(() => {
            this.setState({
                pwd: ""
            });
        });
    }

    render() {
        if (!this.state.authorized) {
            return (
                <div>
                    <Row>
                        <Col lg>

                        </Col>
                        <Col lg="5">
                            <Form onSubmit={this.submit}>
                                <Form.Group>
                                    <Form.Row>
                                        <Form.Label className="text-danger h4">Zárolt Terület</Form.Label>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="text-danger h6">Jelszó</Form.Label>
                                    <Form.Control className="mile-textbox" type="password" placeholder="Jelszó" value={this.state.pwd} onChange={(e) => { this.setState({pwd: e.target.value}) }} />
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Button type="submit" variant="danger">Belépés</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg>

                        </Col>
                    </Row>
                </div>
            );
        }

        return (
            <div>
                <Settings />
                <Users />
            </div>
        )
    }
}

export default withAlert()(AdminOptions);