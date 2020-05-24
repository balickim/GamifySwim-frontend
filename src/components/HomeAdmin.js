import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout } from '../actions/account';
import { Button } from 'react-bootstrap';

class HomeAdmin extends Component {
    render() {
        return (
            <div>
                <p>To jest CMS</p>
                <Button onClick={this.props.logout} className='logout-button'>
                    Log out
                </Button>
            </div>
        );
    }
}

export default connect(null, { logout })(HomeAdmin);