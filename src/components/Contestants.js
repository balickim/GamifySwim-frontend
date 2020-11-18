import React, { useState, useEffect } from 'react';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { BACKEND } from '../config';
import Table from './Table';
import ContestantInfo from './ContestantInfo';
import Swimmer from '../assets/swimmer.gif';

function Contestants(props) {
    const [id, setId] = useState(0);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleShow(row){
        setShow(true);
        setId(row.original.id); 
    }

    useEffect(() => {
      const requestOptions = {
          method: 'POST',
          // body: JSON.stringify({limit, offset}),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
      };
      fetch(`${BACKEND.ADDRESS}/user/contestants`, requestOptions)
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
        <img src={Swimmer} width="500" height="600"/>
      </div>
    );
    if(!isLoading) return (
      <div style={{padding: '2%'}}>
        <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <ContestantInfo id={id} />
        </Modal.Body>
      </Modal>

      <Table
      handleShow={handleShow} 
      columns={[
      {
        "Header": " ",
        // id: 'checkbox-table-column'
        "columns": [
          {
            "Header": "ID",
            "accessor": "id"
          },
          {
            "Header": "Nazwisko",
            "accessor": "surname"
          },
          {
            "Header": "Imię",
            "accessor": "name"
          },
          {
            "Header": "Drugie imię",
            "accessor": "secondname"
          },
          {
            "Header": "Data urodzenia",
            "accessor": "birthdate"
          },
          {
            "Header": "Data urodzenia",
            "accessor": "created_date",
            "width": '200px'
          },
          {
            "Header": "Data urodzenia",
            "accessor": "country_code"
          },
          {
            "Header": "Data urodzenia",
            "accessor": "best_time"
          }
        ]
      }
    ]} 
    data={data.contestants} 
    />
    </div>
  );
}

export default Contestants