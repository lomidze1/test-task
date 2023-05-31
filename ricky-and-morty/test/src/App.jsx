import Table from './components/Table';
import './App.scss';
import { useState } from 'react';
import Button from '@mui/material/Button';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`theme-${theme} table`}>
      <div className='theme-btn'>
        <Button
          variant='contained'
          className='theme-toggle'
          onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </div>
      <Table toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
