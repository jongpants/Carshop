import './App.css';
import React, {useState} from 'react';
import Carlist from './components/Carlist';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab  from '@mui/material/Tab';

function App() {
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className='App'>
      <AppBar position='static' color='success' >
        <ToolBar>
          <Typography variant='h4'>
            Double click cells to edit
          </Typography>
        </ToolBar>
        <Tabs value={value}
          onChange={handleChange}
          color='inherit'
          textColor='inherit'
          centered
        >
          <Tab value='one' label='Carlist' />
        </Tabs>
      </AppBar>
      {value === 'one' && <Carlist />}
    </div>
  );
}

export default App;