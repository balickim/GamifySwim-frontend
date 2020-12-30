import React, { Component } from 'react';
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown, Button, NavItem, MenuItem} from 'react-bootstrap';
import { Link, NavLink, Redirect } from 'react-router-dom'
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

    logoutThenReload = () => {
        this.props.logout()
        .then(() => {
            window.location.reload(false);
          });
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
        const userRole = this.props.userRole;
        return (
            <div>
                <Helmet>
                    <style>{`body {
                        // transition: all 1.00s linear; 
                        background-color: lightblue; 
                        }`}
                    </style>
                </Helmet>
                <Navbar className="navbar-dark" bg="primary" expand="lg">
                    <Button onClick={this.handleToggle}>☰</Button>
                    <Navbar.Brand as={NavLink} to="/home">GamifySwim</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {userRole === 3 ? 
                                <Nav.Link as={NavLink} to='/trainingmanagement' exact>
                                    Treningi
                                </Nav.Link> 
                            : null }
                            {userRole === 3 ? 
                                <Nav.Link as={NavLink} to='/summarymanagement' exact>
                                    Podsumowania
                                </Nav.Link> 
                            : null }
                            {userRole === 1 ? 
                                <Nav.Link as={NavLink} to='/usermanagement'>
                                    Zarządzaj
                                </Nav.Link> 
                            : null }
                            {/* <Nav.Link href='http://localhost:8080/' target="_blank">
                                Designer
                            </Nav.Link> */}
                        </Nav>
                            <Button onClick={this.logoutThenReload} className='btn-outline-light'>
                                Wyloguj
                            </Button>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(null, { logout })(Topbar);