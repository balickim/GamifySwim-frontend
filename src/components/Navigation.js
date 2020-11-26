import React from 'react'
import { connect } from 'react-redux';
import Topbar from './Topbar';
import Sidebar from './Sidebar/Sidebar';

function Navigation(props) {
    return (
        <div>
            <Topbar userRole={props.account.roleId}/>
            <Sidebar userRole={props.account.roleId} />
        </div>
    )
};


export default connect(
    ({ account }) => ({ account }),
    null
)(Navigation);
