import React, {useState, useEffect} from 'react';
import {useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import '@mui/material/Grid';

function Carlist() {
  const [car, setCar] = useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''});
  const [cars, setCars] = useState([]);

  const fetchData = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }

  useEffect(() => fetchData(), []);

  const gridRef = useRef();

  const addCar = () => {
    setCars([car, ...cars]);
  }

  const inputChanged = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const deleteCar = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
        setCars(cars.filter((car, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
      } else {
          alert('Select a row first')
      }
  }

  const deleteAll = () => {
      setCars([])
}

  const columns = [
    {
      headerName: 'Brand',
      field: 'brand'
    },
    {
      headerName: 'Model',
      field: 'model'
    },
    {
      headerName: 'Color',
      field: 'color'
    },
    {
      headerName: 'Fuel',
      field: 'fuel'
    },
    {
      headerName: 'Year',
      field: 'year'
    },
    {
      headerName: 'Price',
      field: 'price'
    },
  ];

  return(
    <div style={{width: 'auto', marginTop: 20, marginBottom: 20 }}>
      <Stack direction='row' spacing={1} justifyContent='center'>
        <TextField
          size='small'
          label='Brand'
          name='brand'
          value={car.brand}
          onChange={inputChanged}
        />
        <TextField
          size='small'
          label='Model'
          name='model'
          value={car.model}
          onChange={inputChanged}
        />
        <TextField
          size='small'
          label='Color'
          name='color'
          value={car.color}
          onChange={inputChanged}
        />
        <TextField
          size='small'
          label='Fuel'
          name='fuel'
          value={car.fuel}
          onChange={inputChanged}
        />
        <TextField
          size='small'
          label='Year'
          name='year'
          value={car.year}
          onChange={inputChanged}
        />
        <TextField
          size='small'
          label='Price'
          name='price'
          value={car.price}
          onChange={inputChanged}
        />
        <Tooltip title='Fill in the fields and click here'>
          <Button
            variant='outlined'
            size='small'
            color='primary'
            startIcon={<AddIcon />}
            onClick={addCar}>
            Add
          </Button>
        </Tooltip>
        <Tooltip title='Click a row to select it and click here to delete'>
          <Button 
            variant='outlined'
            size='small'
            color='error'
            startIcon={<DeleteIcon />}
            onClick={deleteCar}>
            Delete
          </Button>
        </Tooltip>
        <Tooltip title='Click here to DELETE ALL CELLS'>
          <Button
            variant='contained'
            size='small'
            color='error'
            startIcon={<DeleteSweepIcon />}
            onClick={deleteAll}>
            CLEAR
          </Button>
        </Tooltip>
      </Stack>
      <div className='ag-theme-material' style={{height: 1105, width: '100%'}}>  
        <AgGridReact
          ref = {gridRef}
          onGridReady = {params => gridRef.current = params.api}
          rowSelection = 'single'
          rowData = {cars}
          defaultColDef={{
            sortable: true,
            filter: true,
            editable: true,
            resizable: true,
            flex: 1,
            minWidth: 50,
          }}
          columnDefs = {columns}
          rowGroupPanelShow= 'always'
          pivotPanelShow= 'always'
          enableRangeSelection= 'true'
          paginationAutoPageSize= 'true'
          pagination= 'true'
          
        />
      </div>
    </div>
  );
}

export default Carlist;