import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserAdd from './UserAdd';

function UserManagement(){
        return (
            <div className='content'>
                <div style={{paddingTop: '10px'}}>
                    <Container>
                    <Row>
                        <Col sm={8}><UserAdd /></Col>
                        {/* <Col sm={4}><UserAdd /></Col> */}
                    </Row>
                    {/* <Row>
                        <Col sm={8}><UserAdd /></Col>
                        <Col sm={4}><UserAdd /></Col>
                    </Row> */}
                    </Container>
                </div>
            </div>
        );
}

export default UserManagement