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
                <div ><h2> Imię: </h2><h2>{data.contestant.name}</h2></div>
                <div ><h2> Nazwisko: </h2><h2>{data.contestant.secondname}</h2></div>
                <div ><h3> Brązowych medali </h3><h3 style={{color: 'bronze'}}>{data.contestant.bronze_medal}</h3></div>
                <div ><h3> Srebrnych medali </h3><h3 style={{color: 'silver'}}>{data.contestant.silver_medal}</h3></div>
                <div ><h3> Złotych medali </h3><h3 style={{color: 'gold'}}>{data.contestant.gold_medal}</h3></div>
                <PieChartComponent/>
            </div>
        );
}

export default connect(
    ({ contestantInfo }) => ({ contestantInfo }),
    { fetchContestantInfo }
)(ContestantInfo);