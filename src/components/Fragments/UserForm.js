import React, { Component } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import MaskedInput from 'react-maskedinput';
import { withAlert } from 'react-alert';
import axios from 'axios';

export class UserForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            tel: ""
        };

        this.submit = this.submit.bind(this);
    }

    fetchData = () => {
        axios.get(`/api/users/${this.props.user}`).then(res => {
            this.setState({
                name: res.data.name,
                email: res.data.email,
                tel: "+36 " + res.data.tel
            });
        }).catch(err => {
            console.log(err);
            this.props.alert.removeAll();
            this.props.alert.error("Hiba a szerverrel való kommunikáció során!");
            this.props.setNoConnection();
        });
    }

    componentDidMount() {
        if (this.props.mode === "edit") {
            this.fetchData();
        }
    }

    renderButtons = () => {
        if (this.props.mode === "create") {
            return (
                <Form.Group>
                    <Form.Row>
                        <Col lg="4"/>
                        <Col className="mt-3" lg="2">
                            <Button type="submit" block variant="success">Létrehozás</Button>
                        </Col>
                        <Col className="mt-3" lg="2">
                            <Button block variant="outline-danger" onClick={() => { this.props.close() }}>Eldobás</Button>
                        </Col>
                        <Col lg="4"/>
                    </Form.Row>
                </Form.Group>
            );
        }

        return (
            <Form.Group>
                <Form.Row>
                    <Col lg="4"/>
                    <Col className="mt-3" lg="2">
                        <Button type="submit" block variant="success">Módosítás</Button>
                    </Col>
                    <Col className="mt-3" lg="2">
                        <Button block variant="outline-danger" onClick={() => { this.props.close() }}>Eldobás</Button>
                    </Col>
                    <Col lg="4"/>
                </Form.Row>
            </Form.Group>
        );
    }

    submit(e) {
        e.preventDefault();
        if (this.state.name.length === 0 || this.state.email.length === 0 || this.state.tel.length === 0) {
            this.props.alert.removeAll();
            this.props.alert.error("Minden mezőt ki kell tölteni!");
            return;
        }

        // Creating
        if (this.props.mode === "create") {
            const data = {
                name: this.state.name,
                email: this.state.email,
                tel: this.state.tel.substring(4)
            }
            axios.post('/api/users/', data).then(res => {
                this.props.alert.removeAll();
                this.props.alert.success("Ügyintéző létrehozva!");
                this.props.close();
            }).catch(err => {
                console.log(err);
                this.props.alert.removeAll();
                this.props.alert.error("Hiba az ügyintéző létrehozásakor!");
            });
            return;
        }
        // Editing
        const data = {
            id: this.props.user,
            name: this.state.name,
            email: this.state.email,
            tel: this.state.tel.substring(4)
        };
        axios.put(`/api/users/${this.props.user}`, data).then(res => {
            this.props.alert.removeAll();
            this.props.alert.success("Ügyintéző módosítva!");
            this.props.close();
        }).catch(err => {
            console.log(err);
            this.props.alert.removeAll();
            this.props.alert.error("Hiba az ügyintéző módosításakor!");
        });
    }

    render() {
        return (
            <Form onSubmit={this.submit} className="px-5 py-2 border rounded shadow">
                <Form.Group className="mt-3">
                    <Form.Label className="milegreen-title h3">{ this.props.mode === "edit" ? "Szerkesztés" : "Létrehozás" }</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="milegreen-title h6"><span className="text-danger">*</span>Név</Form.Label>
                    <Form.Control className="mile-textbox" size="sm" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="milegreen-title h6"><span className="text-danger">*</span>Email</Form.Label>
                    <Form.Control className="mile-textbox" size="sm" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="milegreen-title h6"><span className="text-danger">*</span>Telefon</Form.Label>
                    <Form.Control className="mile-textbox" as={MaskedInput} mask="+36 (11) 111-11-11" size="sm" value={this.state.tel} onChange={(e) => { this.setState({ tel: e.target.value }) }} />
                </Form.Group>
                {this.renderButtons()}
            </Form>
        )
    }
}

export default withAlert()(UserForm);