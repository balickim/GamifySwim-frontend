import { Button, CssBaseline, InputLabel, MenuItem, TextField } from '@material-ui/core'
import React, { useState, useEffect, useCallback } from 'react';
import { CellProps, FilterProps, FilterValue, IdType, Row } from 'react-table'
import { Modal } from 'react-bootstrap';
import { BACKEND } from '../../config';
import { Page } from './../Table/Page';
import { Table } from './../Table/Table/Table';
import { PersonData, makeData } from './../Table/utils';
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

const UserInfoModal: React.FC = (props) => {
	const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(props.id);

  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({account_id: id}),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    };
    fetch(`${BACKEND.ADDRESS}/admin/accountsessionhistory`, requestOptions)
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
            Header: 'ID sesji',
            accessor: 'sessionid',
            width: 100,
            minWidth: 50,
            aggregate: 'count',
            Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Names`,
          },
          {
            Header: 'Start sesji',
            width: 100,
            minWidth: 50,
            accessor: d => {
              if (d.sessiondatestart) {
                return dayjs(d.sessiondatestart).format("DD-MM-YYYY HH:mm:ss")
                } else {
                  return 'Brak danych'
                }
            }
          },
					{
            Header: 'Koniec sesji',
            width: 100,
            minWidth: 50,
            accessor: d => {
              if (d.sessiondatestop) {
                return dayjs(d.sessiondatestop).format("DD-MM-YYYY HH:mm:ss")
                } else {
                  return 'Brak danych'
                }
            }
          },
					{
            Header: 'Informacje o urządzeniu',
            accessor: 'deviceinfo',
            width: 100,
            minWidth: 50,
            aggregate: 'uniqueCount',
            filter: 'fuzzyText',
            Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
          },
        ],
      }
    ].flatMap((c:any)=>c.columns) // remove comment to drop header groups

    if(isLoading) return (
      <div className="d-flex justify-content-center">
        <img src={Swimmer} width="500" height="600"/>
      </div>
    );
    if(!isLoading) return (
      <div style={{padding: '2%'}}>
        {/* <div ><h2> Imię: </h2><h2>{data.contestant.name}</h2></div>
				<div ><h2> Nazwisko: </h2><h2>{data.contestant.surname}</h2></div> */}

      <Page>
      {/* <CssBaseline /> */}
      <Table<PersonData>
        columns={columns}
        data={data.sessionhistory} 
      />
      </Page>
    </div>
  );
}

export default UserInfoModal