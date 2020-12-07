import React from 'react';
import { BACKEND } from '../../config';
import { Button, FormGroup, FormControl, Form, FormCheck } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addSwimmingStyle } from '../../actions/trainer';
import fetchStates from '../../reducers/fetchStates';
import Helper from '../Helper';

class SwimmingStyleAdd extends React.Component {
    state = {   title: '', 
                description: '',
                deleted: false, 
                buttonClicked: false };

    addSwimmingStyle = () => {
        Helper.addCSS("body{ cursor: wait; }")
        
        const { title, description, deleted } = this.state;

        this.props.addSwimmingStyle({ title, description, deleted })
            .then(() => {
                Helper.addCSS("body{ cursor: auto; }")
                this.setState({ buttonClicked: true });
            });
    }
    
    get Message() {
        if (this.state.buttonClicked){
            if (this.props.trainer.status === fetchStates.error) {
                return <div className="AuthFormError">{this.props.trainer.message}</div>
            } else if (this.props.trainer.status === fetchStates.success) {
                return <div className="alert alert-success">{this.props.trainer.message}</div>
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
                            placeholder='Nazwa'
                            onChange={e => this.setState({ title: e.target.value })}
                        />
                    </FormGroup>
										<FormGroup>
                        <FormControl
                            as="textarea" 
                            rows="3"
                            placeholder='Opis...'
                            onChange={e => this.setState({ description: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                    <FormCheck
                        name="deleted"
                        type="checkbox"
                        label="Styl wyłączony"
                        checked={this.state.deleted} 
                        onChange={this.handleChange} 
                    ></FormCheck>
                    {this.Message}
                    </FormGroup>
                    <div style={{ textAlign: "center" }}>
                        <Button id='signupButton' 
                        onClick={this.addSwimmingStyle}
                        >Dodaj</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default connect(
    ({ trainer }) => ({ trainer }),
    { addSwimmingStyle }
)(SwimmingStyleAdd);