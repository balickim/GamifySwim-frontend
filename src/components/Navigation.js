import React from 'react'
import { connect } from 'react-redux';
import Topbar from './Topbar';
import Sidebar from './Sidebar/Sidebar';

// const Navigation = (props) => {
//     console.log('%cNavigation.js line:8 props.userRole', 'color: #007acc;', props.userRole);
//     return (
        // <div>
        //     <Topbar userRole={props.userRole}/>
        //     <Sidebar userRole={props.userRole} />
        // </div>
//     )
// }

// export default Navigation

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Topbar userRole={this.props.account.roleId}/>
                <Sidebar userRole={this.props.account.roleId} />
            </div>
        )
    }
};


export default connect(
    ({ account }) => ({ account }),
    null
)(Navigation);
