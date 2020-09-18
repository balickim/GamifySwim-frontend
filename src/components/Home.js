import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout } from '../actions/account';
import PieChartComponent from './PieChartComponent'
import Navigation from './Navigation';

class Home extends Component {
    render() {
        return (
            <div className='content'>
                <Navigation />
                <PieChartComponent />
                <PieChartComponent />
                <PieChartComponent />
                <PieChartComponent />
            </div>
        );
    }
}

export default Home//connect(null, { logout })(Home);