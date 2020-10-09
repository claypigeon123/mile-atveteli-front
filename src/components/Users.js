import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import { Loading } from './Fragments/Loading';
import { withAlert } from 'react-alert';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

import { Error } from './Fragments/Error'
import UserForm from './Fragments/UserForm';

export class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ugyintezok: [],

            loading: true,

            creating: true,
            editing: null,
            noConnection: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3200/api/users/').then(res => {
            this.setState({ ugyintezok: res.data });
        }).catch(err => {
            console.log(err);
            this.props.alert.error("Nincs kapcsolat a szerverrel!");
            this.setState({ noConnection: true });
        }).then(() => {
            this.setState({ loading: false });
        });
    }

    showUgyintezok = () => {
        return this.state.ugyintezok.map((ugyintezo, index) => {
            return (
                <tr key={index}>
                    <td> {ugyintezo.name} </td>
                    <td> {ugyintezo.email} </td>
                    <td> +36 {ugyintezo.tel} </td>
                    <td>
                        <MdEdit style={{cursor: 'pointer'}} onClick={() => {  }} size="22" className="text-warning mr-2" />
                        <MdDeleteForever style={{cursor: 'pointer'}} onClick={() => {  }} size="25" className="text-danger" />
                    </td>
                </tr>
            );
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
                <Form.Group>
                    <Form.Label className="milegreen-title h4">Ügyintézők</Form.Label>
                </Form.Group>
                <Table size="sm" variant="dark" responsive striped bordered hover className="rounded mt-3">
                    <thead>
                        <tr>
                            <th>Név</th>
                            <th>Email</th>
                            <th>Telefonszám</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUgyintezok()}
                    </tbody>
                </Table>
                {this.state.editing !== null ? <UserForm mode="edit" user={this.state.editing} /> : <React.Fragment />}
                {this.state.creating === true ? <UserForm mode="create" /> : <React.Fragment />}
            </div>
        )
    }
}

export default withAlert()(Users);