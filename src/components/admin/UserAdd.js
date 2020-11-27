import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, Form, FormCheck } from 'react-bootstrap';
import { signup } from '../../actions/admin';
import fetchStates from '../../reducers/fetchStates';

function UserAdd(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [name, setName] = useState();
    const [secondname, setSecondName] = useState();
    const [surname, setSurname] = useState();
    const [buttonClicked, setButtonClicked] = useState(false);

    function signup() { 
        setButtonClicked(true);

        props.signup({ username, password, role, name, secondname, surname });
    }
    
    // Error() {
    //     if (
    //         this.state.buttonClicked &&
    //         this.props.account.status === fetchStates.error) {
    //         return <div className="AuthFormError">{this.props.account.message}</div>
    //     }
    // }

    return (
        <div>
            <Form>
                <FormGroup>
                    <FormControl
                        type='text'
                        placeholder='Login'
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type='text'
                        placeholder='Hasło'
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                        as="select"
                        onChange={e => setRole(e.target.value)}
                        >
                            <option>Wybierz...</option>
                            <option value={1}>Administrator</option>
                            <option value={2}>Zawodnik</option>
                            <option value={3}>Trener</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type='text'
                        placeholder='Imię'
                        onChange={e => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type='text'
                        placeholder='Drugie imię'
                        onChange={e => setSecondName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type='text'
                        placeholder='Nazwisko'
                        onChange={e => setSurname(e.target.value)}
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
    );
}

export default connect(
    ({ account }) => ({ account }),
    { signup }
)(UserAdd);