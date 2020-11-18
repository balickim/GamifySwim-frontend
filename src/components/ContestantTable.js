import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContestants } from '../actions/contestant';
import styled from 'styled-components';
import NewWindow from './NewWindow';

const TrStyled = styled.tr`
    background-color: #007BB5;
    ${TrStyled}:hover {
        background-color: white;
        cursor: pointer;
  }
`

class ContestantsTable extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        showWindowPortal: false,
        id: null,
        };
        
        this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    }

    state = { limit: 20, offset: 10 };

    get TableView() {
        const { table } = this.props;

        if (table.status === fetchStates.error) return <span>{table.message}</span>;
    }

    componentDidMount() {
        const { limit, offset } = this.state;

        this.props.fetchContestants({ limit, offset });
        
        // this.setState(state => ({
        //     ...state,
        //     id: state.id,
        // }));
    }

    toggleWindowPortal() {
        this.setState(state => ({
        ...state,
        showWindowPortal: !state.showWindowPortal,
        }));
    }

    render() {
        return (
            <div>
                <p>{this.state.id}</p>
                {this.state.showWindowPortal && (
                <NewWindow width={600} height={400} >
                    <p>{this.state.id}</p>
                    <button onClick={() => this.setState({ showWindowPortal: false })} >
                    Close me!
                    </button>
                </NewWindow>
                )}
                <section>
                    <h1>Zawodnicy</h1>
                        <div className="tbl-header">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Imię</th>
                                    <th>Nazwisko</th>
                                    </tr>
                                </thead>
                                </table>
                            </div>
                <div className="tbl-content">
    <table cellPadding="0" cellSpacing="0" border="0">
      <tbody>
                {  
                    this.props.contestants.contestants.map(contestant => {
                        return (
                            <TrStyled key={contestant.id}
                            onClick={this.toggleWindowPortal} onMouseEnter={this.setId}
                            >
                                <td>{contestant.id}</td>
                                <td>{contestant.name}</td>
                                <td>{contestant.surname}</td>
                                {/* <td>{contestant.description}</td> */}
                                {/* <td>{contestant.poolid}</td> */}
                            </TrStyled>
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
    ({ contestants }) => ({ contestants }),
    { fetchContestants }
)(ContestantsTable);