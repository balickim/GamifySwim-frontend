import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import HomeAdmin from './HomeAdmin';

class RootAdmin extends Component {
    render() {
        return (
            this.props.account.loggedIn ? <HomeAdmin /> : <AuthForm />
        )
    }
};


export default connect(
    ({ account }) => ({ account }),
    null
)(RootAdmin);