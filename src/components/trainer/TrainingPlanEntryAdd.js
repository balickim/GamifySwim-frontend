import React from 'react';
import Swimmer from '../../assets/swimmer.gif';
import { BACKEND } from '../../config';
import { Button, FormGroup, FormControl, Form, FormCheck } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addTrainingPlanEntry } from '../../actions/trainer';
import fetchStates from '../../reducers/fetchStates';
import Helper from '../Helper';

class TrainingPlanEntryAdd extends React.Component {
    state = {   isLoading: true,
                dataTrainingPlans: [],
                dataSwimmingStyle: [],
                id: '',
                swimmingstyle_id: '',
                trainingdatestart: '', 
                trainingdatestop: '', 
                title: '', 
                description: '', 
                deleted: false, 
                buttonClicked: false };

    componentDidMount() {
        Promise.all([this.fetchTrainingPlans(), this.fetchSwimmingStyles()]).then(() => {
                this.setState({ isLoading: false });
            });
    };

    fetchTrainingPlans() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return new Promise((resolve, reject) => {
            fetch(`${BACKEND.ADDRESS}/trainer/alltrainingplans`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.setState({ dataTrainingPlans: data });
                    resolve();
                })
        }); 
    }

    fetchSwimmingStyles() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return new Promise((resolve, reject) => {
            fetch(`${BACKEND.ADDRESS}/trainer/swimmingstyle`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.setState({ dataSwimmingStyle: data });
                    resolve();
                })
        }); 
    }

    addTrainingPlanEntry = () => {
        Helper.addCSS("body{ cursor: wait; }")
        
        const { id, swimmingstyle_id, repetitions, breakseconds, length, order } = this.state;

        this.props.addTrainingPlanEntry({ id, swimmingstyle_id, repetitions, breakseconds, length, order })
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
        if(this.state.isLoading) return (
            <div className="d-flex justify-content-center">
                <img src={Swimmer} width="500" height="600"/>
            </div>
        );
        return (
            <div>
                <Form>
                    <FormGroup>
                        <FormControl 
                            as="select"
                            onChange={e => this.setState({ id: e.target.value })}
                            >
                                <option>Wybierz plan</option>
                            {
                              this.state.dataTrainingPlans.alltrainingplans.map(list => (
                                <option 
                                  key={list.id} 
                                  value={list.id}
                                  label={list.title}
                                />
                              ))
                            }
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            as="select"
                            onChange={e => this.setState({ swimmingstyle_id: e.target.value })}
                            >
                                <option>Wybierz styl</option>
                            {
                              this.state.dataSwimmingStyle.swimmingstyles.map(list => (
                                <option 
                                  key={list.id} 
                                  value={list.id}
                                  label={list.title}
                                />
                              ))
                            }
                        </FormControl>
                    </FormGroup>
                     <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Powtórzenia'
                            onChange={e => this.setState({ repetitions: e.target.value })}
                        />
                    </FormGroup>
                     <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Czas przerwy w sekundach'
                            onChange={e => this.setState({ breakseconds: e.target.value })}
                        />
                    </FormGroup>
                     <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Długość'
                            onChange={e => this.setState({ length: e.target.value })}
                        />
                    </FormGroup>
                     <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Kolejność'
                            onChange={e => this.setState({ order: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                    {this.Message}
                    </FormGroup>
                    <div style={{ textAlign: "center" }}>
                        <Button id='signupButton' 
                        onClick={this.addTrainingPlanEntry}
                        >Dodaj</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default connect(
    ({ trainer }) => ({ trainer }),
    { addTrainingPlanEntry }
)(TrainingPlanEntryAdd);