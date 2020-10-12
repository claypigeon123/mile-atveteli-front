import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { withAlert } from 'react-alert';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/body.css';
import "react-toggle/style.css"
import Header from './components/Header.js';
import ExcelForm from './components/ExcelForm.js';
import Users from './components/Users.js';
import Settings from './components/Settings';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export class Main extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid p-0">
                    <div className="container bg-dark p-0 border border-white rounded shadow">
                        <Header />
                    </div>
                    
                    <Switch>
                        <div className="container bg-dark mt-5 text-white border border-white rounded shadow p-4">
                            <Route path="/users" render={(props) => <Users {...props} />} />
                            <Route path="/settings" render={(props) => <Settings {...props} />} />
                            <Route exact path="/" render={(props) => <ExcelForm {...props} />} />

                            <Redirect to="/"/>
                        </div>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default withAlert()(Main);