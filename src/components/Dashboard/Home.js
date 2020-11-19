import React from 'react';
import ProgressBar from './ProgressBar';
import PieChartComponent from './PieChartComponent'
import Calendar from './Calendar/Calendar'

function Home(){
        return (
            <div className='content'>
                <PieChartComponent />
                <PieChartComponent />
                <div className="calendar-rectangle">
                    <div className="calendar-content">
                    <Calendar />
                    </div>
                </div>
                <ProgressBar />
            </div>
        );
}

export default Home