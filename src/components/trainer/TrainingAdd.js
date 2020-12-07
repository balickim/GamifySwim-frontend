import React from 'react';
import Swimmer from '../../assets/swimmer.gif';
import { BACKEND } from '../../config';
import { Button, FormGroup, FormControl, Form, FormCheck } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addTraining } from '../../actions/trainer';
import fetchStates from '../../reducers/fetchStates';
import Helper from '../Helper';

class TrainingAdd extends React.Component {
    state = {   isLoading: true,
                dataPool: [],
                dataTrainer: [],
                pool_id: '',
                coach_user_id: '',
                trainingdatestart: '', 
                trainingdatestop: '', 
                title: '', 
                description: '', 
                deleted: false, 
                buttonClicked: false };

    componentDidMount() {
        Promise.all([this.fetchPools(), this.fetchTrainers()]).then(() => {
                this.setState({ isLoading: false });
            });
    };

    fetchPools() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return new Promise((resolve, reject) => {
            fetch(`${BACKEND.ADDRESS}/trainer/pool`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.setState({ dataPool: data });
                    resolve();
                })
        }); 
    }

    fetchTrainers() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return new Promise((resolve, reject) => {
            fetch(`${BACKEND.ADDRESS}/trainer/trainers`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.setState({ dataTrainer: data });
                    resolve();
                })
        }); 
    }

    addTraining = () => {
        Helper.addCSS("body{ cursor: wait; }")
        
        const { pool_id, coach_user_id, trainingdatestart, trainingdatestop, title, description, deleted } = this.state;

        this.props.addTraining({ pool_id, coach_user_id, trainingdatestart, trainingdatestop, title, description, deleted })
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
                        <FormControl 
                            as="select"
                            onChange={e => this.setState({ coach_user_id: e.target.value })}
                            >
                                <option>Wybierz trenera</option>
                            {
                              this.state.dataTrainer.trainers.map(list => (
                                <option 
                                  key={list.id} 
                                  value={list.id}
                                  label={list.name}
                                />
                              ))
                            }
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            as="select"
                            onChange={e => this.setState({ pool_id: e.target.value })}
                            >
                                <option>Wybierz basen</option>
                            {
                              this.state.dataPool.pools.map(list => (
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
                            placeholder='Data rozpoczęcia YYYY-MM-DD HH:MM:SS'
                            onChange={e => this.setState({ trainingdatestart: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Data zakończenia YYYY-MM-DD HH:MM:SS'
                            onChange={e => this.setState({ trainingdatestop: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                    <FormCheck
                        name="deleted"
                        type="checkbox"
                        label="Trening wyłączony"
                        checked={this.state.deleted} 
                        onChange={this.handleChange} 
                    ></FormCheck>
                    {this.Message}
                    </FormGroup>
                    <div style={{ textAlign: "center" }}>
                        <Button id='signupButton' 
                        onClick={this.addTraining}
                        >Dodaj</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default connect(
    ({ trainer }) => ({ trainer }),
    { addTraining }
)(TrainingAdd);