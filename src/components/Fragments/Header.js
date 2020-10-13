import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from "../../img/logo192.png";

export const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <img alt="logo" src={logo} width="37" height="35" />{" "} <span className="h5 milegreen-title">Elismervény Készítő</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} activeStyle={{borderLeft: '5px solid green'}} activeClassName="active-menu rounded milegreen" exact to="/">Űrlap</Nav.Link>
                    <Nav.Link as={NavLink} activeStyle={{borderLeft: '5px solid green'}} activeClassName="active-menu rounded milegreen" to="/users">Ügyintézők</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={NavLink} className="text-danger" activeStyle={{borderLeft: '5px solid red'}} activeClassName="active-menu rounded" to="/settings">Beállítások</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}