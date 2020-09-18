import React, { Component } from 'react'
import styled from 'styled-components'
import Menu from './Menu/Menu'
import AccountInfo from './AccountInfo'
import { Button } from 'react-bootstrap';

const Container = styled.div`
    background-color: #007BB5;
    position: fixed;
    left: -256px;
    top: 0px;
    bottom: 0;
    width: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 300ms;

`
class Sidebar extends Component {
render() {
    return (
        <Container className='sidebar'>
            <AccountInfo />
            <Menu />
        </Container>
        )
    }
}

export default Sidebar
