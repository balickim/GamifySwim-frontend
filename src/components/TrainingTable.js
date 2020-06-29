import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrainings } from '../actions/account';
import Navigation from './Navigation';

class AccountTrainings extends Component {
    state = { limit: 20, offset: 10 };

    get TableView() {
        const { table } = this.props;

        if (table.status === fetchStates.error) return <span>{table.message}</span>;
    }

    componentDidMount() {
        const { limit, offset } = this.state;

        this.props.fetchTrainings({ limit, offset });
    }

    render() {
        return (
            <div>
                <Navigation />
                <section>
                    <h1>Treningi</h1>
                        <div class="tbl-header">
                            <table cellpadding="0" cellspacing="0" border="0">
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Nazwa</th>
                                    <th>opis</th>
                                    <th>Basen</th>
                                    <th>Data</th>
                                    </tr>
                                </thead>
                                </table>
                            </div>
                <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
                {/* <div>Username: {this.props.accountTrainings}</div> */}
                {  
                    this.props.accountTrainings.trainings.map(training => {
                        return (
                            <tr key={training.trainingid}>
                                {/* <AccountDragonRow dragon={dragon} /> */}
                                <td>{training.trainingid}</td>
                                <td>{training.title}</td>
                                <td>{training.description}</td>
                                <td>{training.poolid}</td>
                                <td>{training.training_date}</td>
                            </tr>
                        )
                    })
                }
                    </tbody>
                </table>
            </div>
        </section>
    </div>
        );
    }
}

export default connect(
    ({ accountTrainings }) => ({ accountTrainings }),
    { fetchTrainings }
)(AccountTrainings);