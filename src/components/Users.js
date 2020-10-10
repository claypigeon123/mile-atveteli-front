import React, { Component } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { withAlert } from 'react-alert';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

import { Loading } from './Fragments/Loading';
import { Error } from './Fragments/Error'
import UserForm from './Fragments/UserForm';

export class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ugyintezok: [],

            loading: true,

            creating: false,
            editing: null,
            noConnection: false
        }
    }

    fetchData = () => {
        this.setState({
            ugyintezok: [],
            noConnection: false,
            loading: true
        });

        axios.get('/api/users/').then(res => {
            this.setState({ ugyintezok: res.data });
        }).catch(err => {
            console.log(err);
            this.props.alert.error("Nincs kapcsolat a szerverrel!");
            this.setState({ noConnection: true });
        }).then(() => {
            this.setState({ loading: false });
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    showUgyintezok = () => {
        return this.state.ugyintezok.map((ugyintezo, index) => {
            return (
                <tr key={index}>
                    <td> {ugyintezo.name} </td>
                    <td> {ugyintezo.email} </td>
                    <td> +36 {ugyintezo.tel} </td>
                    <td>
                        <MdEdit style={{cursor: 'pointer'}} onClick={() => { this.closeModal(); this.setState({ editing: ugyintezo }) }} size="22" className="text-warning mr-2" />
                        <MdDeleteForever style={{cursor: 'pointer'}} onClick={() => { this.deleteUser(ugyintezo.id) }} size="25" className="text-danger" />
                    </td>
                </tr>
            );
        });
    }

    deleteUser = (id) => {
        axios.delete(`/api/users/${id}`).then(res => {
            this.props.alert.success("Ügyintéző törölve!");
            this.fetchData();
        }).catch(err => {
            console.log(err);
            this.props.alert.error("Hiba az ügyintéző törlésekor!");
        });
    }

    closeModal = () => {
        this.setState({
            creating: false,
            editing: null,
        });
        this.fetchData();
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
                {this.state.editing !== null || this.state.creating === true ? <React.Fragment /> : 
                <React.Fragment>
                    <Button onClick={(e) => { this.setState({ creating: true }) }} variant="success">Új Ügyintéző</Button>
                </React.Fragment>
                }
                {this.state.editing !== null ? <UserForm mode="edit" user={this.state.editing} close={this.closeModal} /> : <React.Fragment />}
                {this.state.creating === true ? <UserForm mode="create" close={this.closeModal} /> : <React.Fragment />}
            </div>
        )
    }
}

export default withAlert()(Users);