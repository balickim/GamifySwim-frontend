import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserAdd from './UserAdd';
import UsersTable from './UsersTable';

function UserManagement(){
        return (
            <div className='content'>
                <div style={{paddingTop: '10px'}}>
                    <Container>
                    <Row>
                        <Col><h3>Wszyscy użytkownicy</h3><UsersTable /></Col>
                        {/* <Col sm={4}><UsersTable /></Col> */}
                    </Row>
                    <Row>
                        <Col sm={4}><h3>Dodaj użytkownika</h3><UserAdd /></Col>
                        {/* <Col sm={4}><UserAdd /></Col> */}
                    </Row>
                    </Container>
                </div>
            </div>
        );
}

export default UserManagement