import { Button, CssBaseline, InputLabel, MenuItem, TextField } from '@material-ui/core'
import React, { useState, useEffect, useCallback } from 'react';
import { CellProps, FilterProps, FilterValue, IdType, Row } from 'react-table'
import { Modal } from 'react-bootstrap';
import { BACKEND } from '../../config';
import { Page } from './../Table/Page';
import { Table } from './../Table/Table/Table';
import { PersonData, makeData } from './../Table/utils';
import TrainingInfoModal from './TrainingInfoModal';
import Swimmer from '../../assets/swimmer.gif';
import dayjs from 'dayjs';

function roundedMedian(values: any[]) {
  let min = values[0] || ''
  let max = values[0] || ''

  values.forEach((value) => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}

function filterGreaterThan(rows: Array<Row<any>>, id: Array<IdType<any>>, filterValue: FilterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]]
    return rowValue >= filterValue
  })
}

filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number'

function SelectColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id },
}: FilterProps<PersonData>) {
  const options = React.useMemo(() => {
    const options = new Set<any>()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...Array.from(options.values())]
  }, [id, preFilteredRows])

  return (
    <TextField
      select
      label={render('Header')}
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
    >
      <MenuItem value={''}>All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

const getMinMax = (rows: Row<PersonData>[], id: IdType<PersonData>) => {
  let min = rows.length ? rows[0].values[id] : 0
  let max = rows.length ? rows[0].values[id] : 0
  rows.forEach((row) => {
    min = Math.min(row.values[id], min)
    max = Math.max(row.values[id], max)
  })
  return [min, max]
}

function SliderColumnFilter({
  column: { render, filterValue, setFilter, preFilteredRows, id },
}: FilterProps<PersonData>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <TextField
        name={id}
        label={render('Header')}
        type='range'
        inputProps={{
          min,
          max,
        }}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <Button variant='outlined' style={{ width: 60, height: 36 }} onClick={() => setFilter(undefined)}>
        Off
      </Button>
    </div>
  )
}

const useActiveElement = () => {
  const [active, setActive] = React.useState(document.activeElement)

  const handleFocusIn = () => {
    setActive(document.activeElement)
  }

  React.useEffect(() => {
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [])

  return active
}

function NumberRangeColumnFilter({
  column: { filterValue = [], render, preFilteredRows, setFilter, id },
}: FilterProps<PersonData>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])
  const focusedElement = useActiveElement()
  const hasFocus = focusedElement && (focusedElement.id === `${id}_1` || focusedElement.id === `${id}_2`)
  return (
    <>
      <InputLabel htmlFor={id} shrink focused={!!hasFocus}>
        {render('Header')}
      </InputLabel>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 5 }}>
        <TextField
          id={`${id}_1`}
          value={filterValue[0] || ''}
          type='number'
          onChange={(e) => {
            const val = e.target.value
            setFilter((old: any[] = []) => [val ? parseInt(val, 10) : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '70px',
            marginRight: '0.5rem',
          }}
        />
        to
        <TextField
          id={`${id}_2`}
          value={filterValue[1] || ''}
          type='number'
          onChange={(e) => {
            const val = e.target.value
            setFilter((old: any[] = []) => [old[0], val ? parseInt(val, 10) : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem',
          }}
        />
      </div>
    </>
  )
}

const TrainingsTable: React.FC = (props) => {
    const [id, setId] = useState(0);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function cellClickHandlerUp(cell){
      if (cell.column.id !== '_selector'){
        setShow(true);
        setId(cell.row.original.id);
      }
    }

    useEffect(() => {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
      };
      fetch(`${BACKEND.ADDRESS}/trainer/trainings`, requestOptions)
          .then(response => response.json())
          .then(data => {
              setData(data);
              setIsLoading(false);
          });
    }, []);

    const columns = [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Nazwa',
						accessor: 'title',
						aggregate: 'count',
						Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Names`,
          },
					{
            Header: 'Basen',
						accessor: 'pooltitle',
						aggregate: 'count',
						Filter: SelectColumnFilter,
        		filter: 'includes',
          },
					{
            Header: 'Trener',
						accessor: 'trainerfullname',
						Filter: SelectColumnFilter,
        		filter: 'includes',
          },
					{
            Header: 'Data rozpoczęcia',
						disableGroupBy: true,
            accessor: d => {
              if (d.trainingdatestart) {
                return dayjs(d.trainingdatestart).format("DD-MM-YYYY HH:mm:ss")
                } else {
                  return 'Brak danych'
                }
            }
          },
					{
            Header: 'Data zakończenia',
						disableGroupBy: true,
            accessor: d => {
              if (d.trainingdatestop) {
                return dayjs(d.trainingdatestop).format("DD-MM-YYYY HH:mm:ss")
                } else {
                  return 'Brak danych'
                }
            }
          },
          {
            Header: 'Opis',
            accessor: 'description',
						aggregate: 'count',
						Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Names`,
            minWidth: 200,
          },
        ],
      },
    ].flatMap((c:any)=>c.columns) // remove comment to drop header groups

    if(isLoading) return (
      <div className="d-flex justify-content-center">
        <img src={Swimmer} width="500" height="600"/>
      </div>
    );
    if(!isLoading) return (
      <div style={{padding: '2%'}}>
        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            Dodawanie użytkowników do treningu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TrainingInfoModal 
            id={id} 
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>

      <Page>
      {/* <CssBaseline /> */}
      <Table<PersonData>
        cellClickHandlerUp={cellClickHandlerUp}
        columns={columns}
        data={data.trainings}
      />
      </Page>
    </div>
  );
}

export default TrainingsTable