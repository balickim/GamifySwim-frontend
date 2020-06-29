import React, { Component } from 'react';
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import { logout } from '../actions/account';
import Helmet from 'react-helmet';

class Home extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>GamifySwim</title>
                    <style>{'body {transition: all 1.00s linear; background-color: lightblue; }'}</style>
                </Helmet>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">GamifySwim</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href='/trainings'>Treningi</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Link to="/">
                            <Button onClick={this.props.logout} className='logout-button'>
                                Wyloguj
                            </Button>
                        </Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(null, { logout })(Home);