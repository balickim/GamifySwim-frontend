import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TrainingsFinishedTable from './TrainingsFinishedTable';

function SummaryManagement(){
        return (
            <div className='content'>
                <div style={{paddingTop: '10px'}}>
                    <Container>
                    <Row>
                        <Col><h3>Twoje zakończone treningi</h3><TrainingsFinishedTable /></Col>
                    </Row>
                    </Container>
                </div>
            </div>
        );
}

export default SummaryManagement