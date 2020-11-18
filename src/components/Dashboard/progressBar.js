import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function progressBar(){
    const now = 60;

    const progressInstance = <ProgressBar animated now={now}/>;

        return (
                <div style={{ padding: 50, textAlign: 'center' }}>
                    {progressInstance}
                    <div style={{ fontSize: 20, color: 'yellow' }}>{now}%</div>
                </div>
        );
}

export default progressBar