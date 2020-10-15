import { connect } from 'react-redux';
import React, {useEffect, useState} from 'react';
import { BACKEND } from '../config';
import { Spinner } from 'react-bootstrap';
import { fetchContestantInfo } from '../actions/contestant';
import PieChartComponent from './PieChartComponent';
import Swimmer from '../assets/swimmer.gif';

function ContestantInfo(props) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(props.id);

  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({id}),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    };
    fetch(`${BACKEND.ADDRESS}/contestant/info`, requestOptions)
        .then(response => response.json())
        .then(data => {
            setData(data);
            setIsLoading(false);
        });
  }, []);

  if(isLoading) return (
    <div className="d-flex justify-content-center">
        {/* <Spinner className="m-5 spinner-border text-primary" style={{width: '10rem', height: '10rem'}} role="status">
            <span className="sr-only">Loading...</span>
        </Spinner> */}
        <img src={Swimmer} width="250" height="300"/>
      </div>
    );

  if(!isLoading) return (
            <div>
                <p>{data.contestant.name}</p>
                <p>{data.contestant.secondname}</p>
                <p>{data.contestant.age}</p>
                <p>{data.contestant.genderid}</p>
                <PieChartComponent/>
                <PieChartComponent/>
                <PieChartComponent/>
                <PieChartComponent/>
            </div>
        );
}

export default connect(
    ({ contestantInfo }) => ({ contestantInfo }),
    { fetchContestantInfo }
)(ContestantInfo);