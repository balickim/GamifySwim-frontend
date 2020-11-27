import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, Form, FormCheck } from 'react-bootstrap';
import { login } from '../actions/account';
import fetchStates from '../reducers/fetchStates';
import { FaSignInAlt } from 'react-icons/fa';
import Helper from './Helper';

class AuthForm extends Component {
    state = { username: '', password: '', shortname: '', buttonClicked: false, rememberMe: false };

    updateUsername = event => {

        this.setState({ username: event.target.value });
    }

    updatePassword = event => {

        this.setState({ password: event.target.value });
    }

    updateShortname = event => {

        this.setState({ shortname: event.target.value });
    }

    login = () => {
        this.setState({ buttonClicked: true });

        Helper.addCSS("body{ cursor: wait; }")

        const { username, password, shortname, rememberMe } = this.state;

        this.props.login({ username, password, shortname })
            .then(() => {
                location.replace("./home");
            });

        localStorage.setItem('rememberMe', rememberMe);
        localStorage.setItem('username', rememberMe ? username : '');
        localStorage.setItem('password', rememberMe ? password : '');
        localStorage.setItem('shortname', rememberMe ? shortname : '');
    }

    // signup = () => { //in future will not be used
    //     this.setState({ buttonClicked: true });

    //     const { username, password, shortname } = this.state;

    //     this.props.signup({ username, password, shortname });
    // }

    get Error() {
        if (
            this.state.buttonClicked &&
            this.props.account.status === fetchStates.error) {
            return <div className="AuthFormError">{this.props.account.message}</div>
        }
    }

    onKeyPress = (e) => {
        if (e.which === 13) {
            document.getElementById("loginButton").click();
            this.login();
        }
    }

    handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
    
        this.setState({ [input.name]: value });
    };

    componentDidMount() {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const username = rememberMe ? localStorage.getItem('username') : '';
        const password = rememberMe ? localStorage.getItem('password') : '';
        const shortname = rememberMe ? localStorage.getItem('shortname') : '';
        this.setState({ username, password, shortname, rememberMe });
    };   

    render() {
        return (
            <div className="AuthFormComponent">
                <div className="box">
                    <Form onKeyPress={this.onKeyPress}>
                        <FormGroup className="inputBox">
                            <FormControl
                                autoFocus={true}
                                onKeyPress={this.onKeyPress}
                                type='text'
                                value={this.state.username}
                                placeholder='Twoja nazwa użytkownika'
                                onChange={this.updateUsername}
                            />
                        </FormGroup>
                        <FormGroup className="inputBox">
                            <FormControl
                                onKeyPress={this.onKeyPress}
                                type='password'
                                value={this.state.password}
                                placeholder='oraz hasło'
                                onChange={this.updatePassword}
                            />
                        </FormGroup>
                        <FormGroup className="inputBox">
                            <FormControl
                                name='shortname'
                                onKeyPress={this.onKeyPress}
                                value={this.state.shortname}
                                placeholder='i skrócona nazwa Twojej szkoły'
                                onChange={this.updateShortname, this.handleChange}
                            />
                        </FormGroup>
                        <div style={{ textAlign: "center" }}>
                            <Button id='loginButton' onClick={this.login}>Zaloguj <FaSignInAlt /> </Button>
                        </div>
                        <input 
                            name="rememberMe" 
                            checked={this.state.rememberMe} 
                            onChange={this.handleChange} 
                            type="checkbox"/> 
                             Zapamiętaj mnie
                    </Form>
                    <br />
                    {this.Error}
                </div>
            </div>
        );
    }
}

export default connect(
    ({ account }) => ({ account }),
    { login }
)(AuthForm);