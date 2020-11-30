import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, Form, FormCheck } from 'react-bootstrap';
import { signup } from '../../actions/admin';
import fetchStates from '../../reducers/fetchStates';
import Helper from '../Helper';

class UserAdd extends React.Component {
    state = {   username: '',
                password: '',
                role: '', 
                name: '', 
                secondname: '', 
                surname: '', 
                birthdate: '', 
                gender: '', 
                deleted: false, 
                buttonClicked: false };

    signup = () => {
        Helper.addCSS("body{ cursor: wait; }")
        
        const { username, password, role, name, secondname, surname, birthdate, gender, deleted } = this.state;

        this.props.signup({ username, password, role, name, secondname, surname, birthdate, gender, deleted })
            .then(() => {
                Helper.addCSS("body{ cursor: auto; }")
                this.setState({ buttonClicked: true });
            });
    }
    
    get Message() {
        if (this.state.buttonClicked){
            if (this.props.account.status === fetchStates.error) {
                return <div className="AuthFormError">{this.props.account.message}</div>
            } else if (this.props.account.status === fetchStates.success) {
                return <div className="alert alert-success">{this.props.account.message}</div>
            }
        }
    }

    handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
    
        this.setState({ [input.name]: value });
    };

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Login'
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Hasło'
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            as="select"
                            onChange={e => this.setState({ role: e.target.value })}
                            >
                                <option>Wybierz typ użytkownika...</option>
                                <option value={1}>Administrator</option>
                                <option value={2}>Zawodnik</option>
                                <option value={3}>Trener</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Imię'
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Drugie imię'
                            onChange={e => this.setState({ secondname: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Nazwisko'
                            onChange={e => this.setState({ surname: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Data urodzenia YYYY-MM-DD'
                            onChange={e => this.setState({ birthdate: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            as="select"
                            onChange={e => this.setState({ gender: e.target.value })}
                            >
                                <option>Wybierz płeć...</option>
                                <option value={1}>Mężczyzna</option>
                                <option value={2}>Kobieta</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                    <FormCheck
                        name="deleted"
                        type="checkbox"
                        label="Konto wyłączone"
                        checked={this.state.deleted} 
                        onChange={this.handleChange} 
                    ></FormCheck>
                    {this.Message}
                    </FormGroup>
                    <div style={{ textAlign: "center" }}>
                        <Button id='signupButton' 
                        onClick={this.signup}
                        >Dodaj</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default connect(
    ({ account }) => ({ account }),
    { signup }
)(UserAdd);