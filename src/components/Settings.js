import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { withAlert } from 'react-alert';

import { Loading } from './Fragments/Loading';
import { Error } from './Fragments/Error'

export class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: null,

            loading: true,
            noConnection: false
        };
    }

    fetchData = () => {
        this.setState({
            counter: null,
            loading: true,
            noConnection: false
        });

        axios.get('/api/atveteli/').then(res => {
            this.setState({
                counter: res.data
            });
        }).catch(err => {
            console.log(err);
            this.props.alert.removeAll();
            this.props.alert.error("Nincs kapcsolat a szerverrel!");
            this.setState({ noConnection: true });
        }).then(() => {
            this.setState({ loading: false });
        });
    }

    componentDidMount() {
        this.props.alert.removeAll();
        this.fetchData();
    }

    reset = () => {
        axios.post('/api/atveteli/reset').then(res => {
            this.props.alert.removeAll();
            this.props.alert.success("Számláló alaphelyzetbe állítva!");
            this.fetchData();
        }).catch(err => {
            console.log(err);
            this.props.alert.removeAll();
            this.props.alert.error("Számláló alaphelyzetbe állítása nem sikerült!");
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <React.Fragment>
                    <Loading message="Betöltés" />
                </React.Fragment>
            );
        }

        if (this.state.noConnection) {
            return (
                <React.Fragment>
                    <Error />
                </React.Fragment>
            );
        }

        return (
            <div>
                <Form onSubmit={(e) => { e.preventDefault(); }}>
                    <Form.Group>
                        <Form.Label className="milegreen-title h4">Beállítások</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col lg>
                                <Form.Label className="milegreen h5">Utolsó kiadott azonosító száma</Form.Label>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg>
                                <Form.Label className="h5 bg-white text-dark p-2 rounded border shadow"> { this.state.counter === 1 ? "N/A" : this.state.counter - 1 } </Form.Label>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col lg>
                                <Form.Label className="milegreen h5">Azonosító osztó alaphelyzetbe állítása</Form.Label>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg>
                                <Button onClick={this.reset} variant="danger">Reset</Button>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default withAlert()(Settings);