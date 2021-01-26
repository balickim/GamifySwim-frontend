import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function progressBar(props){
    const progressInstance = <ProgressBar animated now={props.percent} label={`${props.percent}%`}/>;

        return (
                <div style={{ padding: 100, textAlign: 'center' }}>
                    {progressInstance}
                    <div style={{ fontSize: 30, color: 'yellow' }}>{props.level}</div>
                </div>
        );
}

export default progressBar