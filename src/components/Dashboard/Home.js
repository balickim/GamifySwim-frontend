import React, { useEffect, useState } from 'react';
import Swimmer from '../../assets/swimmer.gif';
import { BACKEND } from '../../config';
import { Container, Row, Col } from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import PieChartComponent from './PieChartComponent'
import Calendar from './Calendar/Calendar'
import Badge from './Badge';

function Home(){
    const [isLoading,setIsLoading] = useState(true);
    const [dataExperience,setDataExperience] = useState({});
    const [dataChart,setDataChart] = useState({});
    const [dataBadgeCount,setDataBadgeCount] = useState({});

    useEffect(() => {
        Promise.all([fetchExperience(), fetchChartData(), fetchBadgeCount()]).then(() => {
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

    const fetchChartData = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return new Promise((resolve, reject) => {
            fetch(`${BACKEND.ADDRESS}/user/chartbestcontestant`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataChart(data);
                    resolve();
                })
        }); 
    }

    const fetchBadgeCount = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return new Promise((resolve, reject) => {
            fetch(`${BACKEND.ADDRESS}/user/badge/count`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataBadgeCount(data);
                    resolve();
                })
        }); 
    }

    const badgesJSX = badgeCount => {
        let content = [];
        for (let i = 0; i < badgeCount; i++) {
            const item = badgeCount[i];
            content.push(<Badge id={i} />);
        }
        return content;
    };

    if(isLoading) return (
        <div className="d-flex justify-content-center">
            <img src={Swimmer} width="500" height="600"/>
        </div>
    );
    return (
        <div className='content'>
            <div style={{padding: 10, textAlign: 'center'}}><PieChartComponent data={dataChart.data} /></div>
                <Container>
                    <Row>
                        <Col><Calendar /></Col>
                    </Row>
                    <Row>
                        {/* <Col><Badge data={dataBadgeInfo} /></Col> <Col><Badge data={dataBadgeInfo} /></Col> <Col><Badge data={dataBadgeInfo} /></Col> */}
                        <Col>{badgesJSX(dataBadgeCount.data.count)}</Col>
                    </Row>
                </Container>
                <ProgressBar 
                percent={dataExperience ? 0 : dataExperience.exp[0].barpercent } 
                level={dataExperience ? 0 : dataExperience.exp[0].level } />
        </div>
    );
}

export default Home