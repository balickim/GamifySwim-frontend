import React, {useEffect, useState} from 'react';
import { BACKEND } from '../../../config';
import Swimmer from '../../../assets/swimmer.gif';

function EventsInfo(props) {
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
    fetch(`${BACKEND.ADDRESS}/user/training/info`, requestOptions)
        .then(response => response.json())
        .then(data => {
            setData(data);
            setIsLoading(false);
        });
  }, []);

  if(isLoading) return (
    <div className="d-flex justify-content-center">
        <img src={Swimmer} width="250" height="300"/>
      </div>
    );

  if(!isLoading) return (
            <div>
                <div><h2> title: </h2><h2>{data.training.title}</h2></div>
                <div><h2> description: </h2><h2>{data.training.description}</h2></div>
                <div><h2> pooltitle: </h2><h2>{data.training.pooltitle}</h2></div>
            </div>
        );
}

export default EventsInfo;