import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/body.css';
import Menu from './components/Menu.js';
import Home from './components/Home.js';
import Users from './components/Users.js';

export class Main extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid p-0">
                    <div className="container bg-dark p-0 border border-white rounded shadow">
                        <Menu />
                    </div>
                    
                    <div className="container bg-dark p-0 mt-5 text-white border border-white rounded shadow p-3">
                        <Route exact path="/" render={(props) => <Home {...props} />} />
                        <Route path="/users" render={(props) => <Users {...props} />} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default Main;