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

    const progressInstance = <ProgressBar animated 
        now={dataExperience.exp[0] === undefined ? 0 : dataExperience.exp[0].barpercent} 
        label={`${dataExperience.exp[0] === undefined ? 0 : dataExperience.exp[0].barpercent}%`}/>;

        return (
                <div style={{ padding: 100, textAlign: 'center' }}>
                    {progressInstance}
                    <div style={{ fontSize: 30, color: 'yellow' }}>{dataExperience.exp[0] === undefined ? 0 : dataExperience.exp[0].level}</div>
                </div>
        );
}

export default progressBar