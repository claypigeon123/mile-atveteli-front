import React, { Component } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

export class UserForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            tel: ""
        }
    }

    componentDidMount() {
        if (this.props.mode === "edit") {
            this.setState({
                name: this.props.user.name,
                email: this.props.user.email,
                tel: this.props.user.tel
            });
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
                            <Button block variant="outline-danger" onClick={() => {  }}>Eldobás</Button>
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
                        <Button block variant="outline-danger" onClick={() => {  }}>Eldobás</Button>
                    </Col>
                    <Col lg="4"/>
                </Form.Row>
            </Form.Group>
        );
    }

    render() {
        return (
            <Form className="px-5 py-2 border rounded shadow">
                <Form.Group className="mt-3">
                    <Form.Label className="milegreen-title h6">Név</Form.Label>
                    <Form.Control value={this.state.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="milegreen-title h6">Email</Form.Label>
                    <Form.Control value={this.state.email} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="milegreen-title h6">Telefon</Form.Label>
                    <Form.Control value={this.state.tel} />
                </Form.Group>
                {this.renderButtons()}
            </Form>
        )
    }
}

export default UserForm;