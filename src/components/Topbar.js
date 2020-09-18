import React, { Component } from 'react';
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import { logout } from '../actions/account';
import Helmet from 'react-helmet';

class Topbar extends Component {
        state = {
            isOpen: JSON.parse(localStorage.getItem('isOpen'))
        };
    
    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen }
        ,() => this.calculateSidebar());
    };

    calculateSidebar = () => {
            const sidebar = document.querySelector('.sidebar');
            const content = document.querySelector(".content");
            
                if (this.state.isOpen) {
                    sidebar.style.transform = `translateX(${sidebar.offsetWidth}px)`;
                    content.style.marginLeft = `${sidebar.offsetWidth}px`;
                    localStorage.setItem('isOpen', true);
                } else {
                    sidebar.style.transform = `translateX(${-content.offsetWidth}px)`;
                    content.style.marginLeft = `0px`;
                    localStorage.setItem('isOpen', false);
            }
        };

     componentDidMount() {
        this.calculateSidebar();
    };

    render() {
        return (
            <div>
                <Helmet>
                    <style>{'body {transition: all 1.00s linear; background-color: lightblue; }'}</style>
                </Helmet>
                <Navbar className="navbar-dark" bg="primary" expand="lg">
                <Button onClick={this.handleToggle}>☰</Button>
                    <Navbar.Brand href="/">GamifySwim</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href='/trainings'>Treningi</Nav.Link>
                            <Nav.Link href="/test1">Test1</Nav.Link>
                            <Nav.Link href="/test2">Test2</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Link to="/">
                            <Button onClick={this.props.logout} className='btn-outline-light'>
                                Wyloguj
                            </Button>
                        </Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(null, { logout })(Topbar);