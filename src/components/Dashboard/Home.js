import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import PieChartComponent from './PieChartComponent'
import Calendar from './Calendar/Calendar'

function Home(){
        return (
            <div className='content'>
                <Container>
                    <Row>
                        <Col sm={6}><PieChartComponent /></Col>
                        <Col sm={6}><PieChartComponent /></Col>
                    </Row>
                    <Row>
                        <Col><Calendar /></Col>
                    </Row>
                </Container>
                <ProgressBar />
            </div>
        );
}

export default Home