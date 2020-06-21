import React, { Component } from 'react';
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import { logout } from '../actions/account';
import Helmet from 'react-helmet';
import Navigation from './Navigation';

class Home extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <hr />
                <AccountInfo />
                <hr />
                <br />
            </div>
        );
    }
}

export default connect(null, { logout })(Home);