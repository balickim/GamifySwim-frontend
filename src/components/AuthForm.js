import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import { login } from '../actions/account';
import fetchStates from '../reducers/fetchStates';
import { FaSignInAlt } from 'react-icons/fa';

function AuthForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [shortname, setShortname] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [inputName, setInputName] = useState(false);

    const updateUsername = (event) => {
        setUsername(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const updateShortname = (event) => {
        setShortname(event.target.value);
    };

    const login = () => {
        setButtonClicked(true);

        // const { username, password, shortname, rememberMe } = state;

        props.login({ username, password, shortname })
            .then(() => {
                location.replace("./home");
            });

        localStorage.setItem('rememberMe', rememberMe);
        localStorage.setItem('username', rememberMe ? username : '');
        localStorage.setItem('password', rememberMe ? password : '');
        localStorage.setItem('shortname', rememberMe ? shortname : '');
    }

    const Error = () => {
        if (
            buttonClicked &&
            props.account.status === fetchStates.error) {
            return <div className="AuthFormError">{props.account.message}</div>
        }
    }

    const onKeyPress = (e) => {
        if (e.which === 13) {
            document.getElementById("loginButton").click();
            login();
        }
    }

    const handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        // [${input.name}]: value
        // setState({ [input.name]: value });
    };

    useEffect(()=>{
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const username = rememberMe ? localStorage.getItem('username') : '';
        const password = rememberMe ? localStorage.getItem('password') : '';
        const shortname = rememberMe ? localStorage.getItem('shortname') : '';
        // setState({ username, password, shortname, rememberMe });
    },[])

    return (
        <div className="AuthFormComponent">
            <div className="box">
                <Form onKeyPress={onKeyPress}>
                    <FormGroup className="inputBox">
                        <FormControl
                            autoFocus={true}
                            onKeyPress={onKeyPress}
                            type='text'
                            value={username}
                            placeholder='Twoja nazwa użytkownika'
                            onChange={updateUsername}
                        />
                    </FormGroup>
                    <FormGroup className="inputBox">
                        <FormControl
                            onKeyPress={onKeyPress}
                            type='password'
                            value={password}
                            placeholder='oraz hasło'
                            onChange={updatePassword}
                        />
                    </FormGroup>
                    <FormGroup className="inputBox">
                        <FormControl
                            name='shortname'
                            onKeyPress={onKeyPress}
                            value={shortname}
                            placeholder='i skrócona nazwa Twojej szkoły'
                            onChange={updateShortname}
                            // onChange={updateShortname, handleChange}
                        />
                    </FormGroup>
                    <div style={{ textAlign: "center" }}>
                        <Button id='loginButton' onClick={login}>Zaloguj <FaSignInAlt /> </Button>
                    </div>
                    <input 
                        name="rememberMe" 
                        checked={rememberMe} 
                        onChange={handleChange} 
                        type="checkbox"/> 
                            Zapamiętaj mnie
                </Form>
                <br />
                {Error}
            </div>
        </div>
    );
}

export default connect(
    ({ account }) => ({ account }),
    { login }
)(AuthForm);