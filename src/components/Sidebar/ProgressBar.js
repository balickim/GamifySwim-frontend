import React, {useState, useEffect } from 'react';
import { BACKEND } from '../../config';
import Swimmer from '../../assets/swimmer.gif';
import { ProgressBar } from 'react-bootstrap';

function progressBar(){
    const [isLoading,setIsLoading] = useState(true);
    const [dataExperience,setDataExperience] = useState({});

    useEffect(() => {
        Promise.all([fetchExperience()]).then(() => {
            setIsLoading(false);
        });
    }, [])

    const fetchExperience = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return new Promise((resolve, reject) => {
            fetch(`${BACKEND.ADDRESS}/experience/info`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataExperience(data);
                    resolve();
                })
        }); 
    }

    if(isLoading) return (
        <div className="d-flex justify-content-center">
            <img src={Swimmer} width="500" height="600"/>
        </div>
    );

    const progressInstance = <ProgressBar animated variant="success"
        now={dataExperience.exp[0] === undefined ? 0 : dataExperience.exp[0].barpercent} 
        label={`${dataExperience.exp[0] === undefined ? 0 : dataExperience.exp[0].barpercent}%`}/>;

        return (
                <div style={{ width: '90%', padding: 10, textAlign: 'center' }}>
                <div style={{       
                borderRadius: '50%',
                width: '70px',
                height: '70px',
                padding: '15px',
                background: '#fff',
                border: '2px solid #666',
                color: '#666',
                marginLeft: '35%',
                marginBottom: '10px',
                font: '32px Arial, sans-serif'
                }}>
                    {dataExperience.exp[0] === undefined ? 0 : dataExperience.exp[0].level}</div>
                    {progressInstance}
                </div>
        );
}

export default progressBar