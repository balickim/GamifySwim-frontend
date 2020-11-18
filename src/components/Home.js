import React from 'react';
import ProgressBar from './dashboard/ProgressBar';
import PieChartComponent from './PieChartComponent'

function Home(){
        return (
            <div className='content'>
                <PieChartComponent />
                <PieChartComponent />

                <ProgressBar />
            </div>
        );
}

export default Home//connect(null, { logout })(Home);