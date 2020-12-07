import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TrainingAdd from './TrainingAdd';
import PoolAdd from './PoolAdd';

function TrainingManagement(){
        return (
            <div className='content'>
                <div style={{paddingTop: '10px'}}>
                    <Container>
                    <Row>
                        <Col sm={4}><h3>Dodaj trening</h3><TrainingAdd /></Col>
                        <Col sm={4}><h3>Dodaj basen</h3><PoolAdd /></Col>
                    </Row>
                    <Row>
                        {/* <Col sm={4}><h3>Dodaj użytkownika</h3><UserAdd /></Col> */}
                        {/* <Col sm={4}><UserAdd /></Col> */}
                    </Row>
                    </Container>
                </div>
            </div>
        );
}

export default TrainingManagement