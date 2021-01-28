import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../../actions/accountInfo';
import styled from 'styled-components'
import Image from '../../assets/test2.png'

import { fetchContestant } from '../../actions/contestant';

const Container = styled.div`
    text-aling: center;
    margin-top: 2rem;
`

const ProfileImg = styled.img`
    height: 5rem;
    margin-left: 65px;
    margin-bottom: 10px;
`
const ProfileName = styled.h1`
    font-size: 1rem;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};
`

class AccountInfo extends Component {
    componentDidMount() {
        this.props.fetchAccountInfo();
    }
    
        render() {
            return (
                <Container>
                    <ProfileImg src={Image} />
                    <ProfileName>{this.props.accountInfo.username} (id: {this.props.accountInfo.id}) (roleId: {this.props.accountInfo.roleId})</ProfileName>
                </Container>
            )
        }
    }

export default connect(
    ({ accountInfo }) => ({ accountInfo }),
    { fetchAccountInfo }
)(AccountInfo);
