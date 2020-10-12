import React, { useState, useEffect } from 'react';
import { Spinner, Modal, Button } from 'react-bootstrap';
import Table from './Table';
// import NewWindow from './NewWindow';
import ContestantInfo from './ContestantInfo';

function Test2(props) {
    // const [showWindowPortal, setShowWindowPortal] = useState(false);
    const [id, setId] = useState(0);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setLimit] = useState(30);
    const [offset, setOffset] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    function handleShow(row){
        setShow(true);
        setId(row.original.contestantid); 
    }

    useEffect(() => {
      const requestOptions = {
          method: 'POST',
          body: JSON.stringify({limit, offset}),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
      };
      fetch('http://localhost:3000/contestant/contestants', requestOptions)
          .then(response => response.json())
          .then(data => {
              setData(data);
              setIsLoading(false);
          });
  }, []);
    
    // function toggleWindowPortal(row){
    //     setShowWindowPortal(!showWindowPortal);
    //     if(!showWindowPortal) {
    //       setId(row.original.contestantid);
    //     }   
    // }

    if(isLoading) return (
      <div className="d-flex justify-content-center">
        <Spinner className="m-5 spinner-border text-primary" style={{width: '10rem', height: '10rem'}} role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
    if(!isLoading) return (
      <div style={{padding: '2%'}}>
      {/* {showWindowPortal && (
        <NewWindow width={800} height={600} >
            <ContestantInfo id={id} />
        </NewWindow>
        )} */}
        <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContestantInfo id={id} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
        
      <Table columns={[
      {
        "Header": "Zawodnicy",
        "columns": [
          {
            "Header": "ID",
            "accessor": "contestantid"
          },
          {
            "Header": "Secondname",
            "accessor": "secondname"
          },
          {
            "Header": "Name",
            "accessor": "name"
          },
          {
            "Header": "Age",
            "accessor": "age"
          }
        ]
      }
    ]} data={data.contestants} 
    pageSize={limit}
    pageIndex={offset}
    // toggleWindowPortal={toggleWindowPortal}
    handleShow={handleShow} 
    />
    </div>
  );
}

export default Test2