import React, { useEffect, useState } from 'react';
import Swimmer from '../../assets/swimmer.gif';
import { BACKEND } from '../../config';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../../actions/accountInfo';
import { Container, Row, Col } from 'react-bootstrap';
import PieChartComponent from './PieChartComponent'
import Calendar from './Calendar/Calendar'
import Badge from './Badge';

function Home(props){
    const [isLoading,setIsLoading] = useState(true);
    const [dataExperience,setDataExperience] = useState({});
    const [dataChart,setDataChart] = useState({});
    const [dataBadgeCount,setDataBadgeCount] = useState({});

    useEffect(() => {
        props.fetchAccountInfo();

        Promise.all([fetchChartData(), fetchBadgeCount()]).then(() => {
            setIsLoading(false);
        });
    }, [])

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
        for (let i = 0; i <= badgeCount; i++) {
            if(i !== 6) {
                const item = badgeCount[i];
                content.push(<Col xs={6}><Badge key={i} id={i} /></Col>);
            }
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
            {/* {props.accountInfo.roleId} */}
                <Container>
                    <Row style={{marginBottom: '30px', marginTop: '30px'}}>
                        <Col><Calendar /></Col>
                    </Row>
                    <Row>
                        {badgesJSX(dataBadgeCount.data.count)}
                    </Row>
                </Container>
                <div style={{padding: 10, textAlign: 'center'}}><PieChartComponent data={dataChart.data} /></div>
        </div>
    );
}

// export default Home
export default connect(
    ({ accountInfo }) => ({ accountInfo }),
    { fetchAccountInfo }
)(Home);