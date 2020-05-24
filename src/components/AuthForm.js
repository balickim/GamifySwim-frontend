import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import { signup, login } from '../actions/account';
import fetchStates from '../reducers/fetchStates';
import ApplicationVersion from './ApplicationVersion';
import ApplicationName from './ApplicationName';
import { FaSignInAlt } from 'react-icons/fa';

class AuthForm extends Component {
    state = { username: '', password: '', buttonClicked: false };

    updateUsername = event => {

        this.setState({ username: event.target.value });
    }

    updatePassword = event => {

        this.setState({ password: event.target.value });
    }

    login = () => {
        this.setState({ buttonClicked: true });

        const { username, password } = this.state;

        this.props.login({ username, password });
    }

    signup = () => {
        this.setState({ buttonClicked: true });

        const { username, password } = this.state;

        this.props.signup({ username, password });
    }

    get Error() {
        if (
            this.state.buttonClicked &&
            this.props.account.status === fetchStates.error) {
            return <div>{this.props.account.message}</div>
        }
    }

    onKeyPress = (e) => {
        if (e.which === 13) {
            this.login();
            // alert("Enter pressed");
        }
    }

    render() {
        return (
            <div className="AuthFormComponent">
                <div className="box">
                    {/* <ApplicationVersion />
                    <h2><ApplicationName /></h2> */}
                    <Form onKeyPress={this.onKeyPress}>
                        <FormGroup className="inputBox">
                            <FormControl
                                autoFocus={true}
                                onKeyPress={this.onKeyPress}
                                // onKeyUp="this.setAttribute('value', this.value);"
                                type='text'
                                value={this.state.username}
                                placeholder='username'
                                onChange={this.updateUsername}
                            />
                        </FormGroup>
                        <FormGroup className="inputBox">
                            <FormControl
                                onKeyPress={this.onKeyPress}
                                // onkeyup="this.setAttribute('value', this.value);"
                                type='password'
                                value={this.state.password}
                                placeholder='password'
                                onChange={this.updatePassword}
                            />
                        </FormGroup>
                        <FormGroup className="inputBox">
                            <FormControl
                                onKeyPress={this.onKeyPress}
                                placeholder='School ID'
                            />
                        </FormGroup>
                        <div style={{ textAlign: "center" }}>
                            <Button onClick={this.login}>Zaloguj <FaSignInAlt /> </Button>
                            {/* <span> lub </span>
                            <Button onClick={this.signup}>Zarejestruj</Button> */}
                        </div>
                    </Form>
                    <br />
                    {this.error}
                </div>
            </div>
        );
    }
}

export default connect(
    ({ account }) => ({ account }),
    { signup, login }
)(AuthForm);