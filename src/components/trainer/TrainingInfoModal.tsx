import { Button, CssBaseline, InputLabel, MenuItem, TextField } from '@material-ui/core'
import React, { useState, useEffect, useCallback } from 'react';
import { CellProps, FilterProps, FilterValue, IdType, Row } from 'react-table'
import { Modal, FormControl } from 'react-bootstrap';
import { BACKEND } from '../../config';
import { Page } from './../Table/Page';
import { Table } from './../Table/Table/Table';
import { PersonData, makeData } from './../Table/utils';
import Swimmer from '../../assets/swimmer.gif';
import Helper from '../Helper';

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

const TrainingInfoModal: React.FC = (props) => {
    const [dataContestants, setDataContestants] = useState();
    const [dataTrainingPlan, setDataTrainingPlan] = useState();
    const [accountToTrainingPlan, setAccountToTrainingPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedContestants, setSelectedContestants] = useState([]);
    // const [selectedContestants, setSelectedContestants] = useState([{ 0: true, 9: true }]);

    useEffect(() => {
      Promise.all([fetchContestants(), fetchTrainingPlans()]).then(() => {
          setIsLoading(false);
      })
    }, []);

    const fetchContestants = () => {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                  "training_id": props.id
                }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            };
            return new Promise((resolve, reject) => {
                fetch(`${BACKEND.ADDRESS}/trainer/getcontestantswithtrainingplans`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setDataContestants(data);
                        return data;
                    })
                      .then(data => {
                        let selectedRowsObject = {};
                        let i = 0;
                        data.contestants.map(element => {
                          if (element.assigned === true) selectedRowsObject[i] = element.assigned;
                          i++;
                        })
                        return selectedRowsObject;
                    })
                    .then(selectedRowsObject => {
                        setSelectedContestants(selectedRowsObject);
                        resolve();
                    })
            }); 
        };

    const fetchTrainingPlans = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return new Promise((resolve, reject) => {
            fetch(`${BACKEND.ADDRESS}/trainer/alltrainingplans`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataTrainingPlan(data);
                    resolve();
                })
        }); 
    };

    const columns = [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Imię',
            accessor: 'name',
            width: 100,
            minWidth: 50,
            aggregate: 'count',
            Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Names`,
          },
          {
            Header: 'Nazwisko',
            accessor: 'surname',
            width: 100,
            minWidth: 50,
            aggregate: 'uniqueCount',
            filter: 'fuzzyText',
            Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
          },
          {
            Header: 'Poziom',
            accessor: 'levelofadvancement',
            width: 100,
            minWidth: 50,
            aggregate: 'uniqueCount',
            filter: 'fuzzyText',
            Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} Unique Names`,
          },
          {
            Header: 'Plan treningowy',
            width: 100,
            minWidth: 50,
            disableGroupBy: true,
            Cell: cellInfo => (
              <FormControl 
                as="select"
                defaultValue={cellInfo.row.original.account_trainingplan_id}
                onChange={e => handleSelectChange(e, cellInfo)}
              >
                <option>Wybierz plan</option>
                {dataTrainingPlan.alltrainingplans.map(list => {
                  return <option 
                  key={list.id} 
                  value={list.id}
                  label={list.title}
                  />;
                })}
              </FormControl>
            )
          }
        ],
      }
    ].flatMap((c:any)=>c.columns) // remove comment to drop header groups

    const handleSelectChange = (event, cellInfo) => {
      if (event !== undefined) {
        let data = dataContestants;
        data.contestants.map(element => {
          if (cellInfo.row.original.id === element.id) {
            element['account_trainingplan_id'] = parseInt(event.target.value);
          }
        })
        setDataContestants(data);
      }
    };

    let saveDataArray = [{
      id: props.id,
      endpoint: '/trainer/assigncontestanttotraining'
    }]

    const dummy = useCallback(() => () => null, [])

    if(isLoading) return (
      <div className="d-flex justify-content-center">
        <img src={Swimmer} width="500" height="600"/>
      </div>
    );
    if(!isLoading) return (
      <div style={{padding: '2%'}}>
      <Page>
      {/* <CssBaseline /> */}
      <Table<PersonData>
        columns={columns}
        data={dataContestants.contestants} 
        onSave
        saveDataArray={saveDataArray}
        cellClickHandlerUp={dummy}
        selectedRows={selectedContestants}
      />
      </Page>
    </div>
  );
}

export default TrainingInfoModal