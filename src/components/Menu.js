import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import logo from "../img/logo192.png";

export class Menu extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                    <img alt="logo" src={logo} width="37" height="35" />{" "} <span className="h5" style={{color: "#00aa00"}}>Átvételi Elismervény Készítő</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} className="nav-item" exact to="/">Elismervény Készítő</Nav.Link>
                        <Nav.Link as={NavLink} to="/users">Ügyintézők</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu;