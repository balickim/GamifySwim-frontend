import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, Form, FormCheck } from 'react-bootstrap';
import { signup } from '../../actions/admin';
import fetchStates from '../../reducers/fetchStates';

function UserAdd(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState(true);
    const [name, setName] = useState();
    const [secondname, setSecondName] = useState();
    const [surname, setSurname] = useState();
    const [buttonClicked, setButtonClicked] = useState(false);

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function updateName(event) {
        setName(event.target.value);
    }

    function updateSecondName(event) {
        setSecondName(event.target.value);
    }

    function updateSurname(event) {
        setSurname(event.target.value);
    }

    function signup() { 
        setButtonClicked(true);

        props.signup({ username, password, name, secondname, surname });
    }

    // Error() {
    //     if (
    //         this.state.buttonClicked &&
    //         this.props.account.status === fetchStates.error) {
    //         return <div className="AuthFormError">{this.props.account.message}</div>
    //     }
    // }

    // handleChange = (event) => {
    //     const input = event.target;
    
    //     this.setState({ [input.name]: value });
    // };  

        return (
            <div>
                <div className="box">
                    <Form>
                        <FormGroup className="inputBox">
                            <FormControl
                                autoFocus={true}
                                // onKeyPress={this.onKeyPress}
                                type='text'
                                placeholder='Twoja nazwa użytkownika'
                                onChange={updateUsername}
                            />
                        </FormGroup>
                        <FormGroup className="inputBox">
                            <FormControl
                                // onKeyPress={this.onKeyPress}
                                type='password'
                                placeholder='oraz hasło'
                                onChange={updatePassword}
                            />
                        </FormGroup>
                        <FormGroup className="inputBox">
                            <FormControl
                                // onKeyPress={this.onKeyPress}
                                type='text'
                                placeholder='Imię'
                                onChange={updateName}
                            />
                        </FormGroup>
                        <FormGroup className="inputBox">
                            <FormControl
                                // onKeyPress={this.onKeyPress}
                                type='text'
                                placeholder='Drugie imię'
                                onChange={updateSecondName}
                            />
                        </FormGroup>
                        <FormGroup className="inputBox">
                            <FormControl
                                // onKeyPress={this.onKeyPress}
                                type='text'
                                placeholder='nazwisko'
                                onChange={updateSurname}
                            />
                        </FormGroup>
                        <div style={{ textAlign: "center" }}>
                            <Button id='loginButton' 
                            onClick={signup}
                            >Dodaj</Button>
                        </div>
                    </Form>
                    <br />
                    {/* {this.Error} */}
                </div>
            </div>
        );
    }

export default connect(
    ({ account }) => ({ account }),
    { signup }
)(UserAdd);