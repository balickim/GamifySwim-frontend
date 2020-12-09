import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TrainingsTable from './TrainingsTable';
import TrainingAdd from './TrainingAdd';
import PoolAdd from './PoolAdd';
import SwimmingStyleAdd from './SwimmingStyleAdd';

function TrainingManagement(){
        return (
            <div className='content'>
                <div style={{paddingTop: '10px'}}>
                    <Container>
                    <Row>
                        <Col><h3>Treningi</h3><TrainingsTable /></Col>
                    </Row>
                    <Row>
                        <Col sm={4}><h3>Dodaj trening</h3><TrainingAdd /></Col>
                        <Col sm={4}><h3>Dodaj basen</h3><PoolAdd /></Col>
                        <Col sm={4}><h3>Dodaj styl</h3><SwimmingStyleAdd /></Col>
                    </Row>
                    </Container>
                </div>
            </div>
        );
}

export default TrainingManagement