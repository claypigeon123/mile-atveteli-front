import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { Header } from './components/Fragments/Header.js';
import ExcelForm from './components/ExcelForm.js';
import Users from './components/Users.js';
import Settings from './components/Settings';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export const Main = () => {
    return (
        <Router>
            <div className="container-fluid p-0">
                <div className="container bg-dark p-0 border border-white rounded shadow">
                    <Header />
                </div>
                
                <div className="container bg-dark mt-5 text-white border border-white rounded shadow p-4">
                    <Switch>
                        <Route path="/users" render={(props) => <Users {...props} />} />
                        <Route path="/settings" render={(props) => <Settings {...props} />} />
                        <Route exact path="/" render={(props) => <ExcelForm {...props} />} />

                        <Redirect to="/"/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}