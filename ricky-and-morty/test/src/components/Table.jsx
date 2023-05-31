import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Table.scss';

const Table = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      headerClassName: 'name-header',
      cellClassName: 'name-cell',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 150,
      headerClassName: 'gender-header',
      cellClassName: 'gender-cell',
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt='Character'
          style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          onClick={() => handleImageClick(params.row)}
        />
      ),
    },
    {
      field: 'created',
      headerName: 'Created',
      width: 200,
      headerClassName: 'created-header',
      cellClassName: 'created-cell',
    },
  ];

  const handleRowClick = (params) => {
    if (params.field === 'image') {
      handleImageClick(params.row);
    } else {
      setSelectedCharacter(params.row);
    }
  };

  const handleImageClick = (character) => {
    setSelectedCharacter({ ...character, showImage: true });
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  if (loading) {
    return (
      <main className='isLoading'>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </main>
    );
  }

  return (
    <div style={{ Height: 630, width: '100%' }}>
      <DataGrid
        rows={characters}
        columns={columns}
        loading={loading}
        pageSize={10}
        onRowClick={handleRowClick}
      />
      {selectedCharacter && (
        <div className='modal'>
          <div className='modal-image-container'>
            {selectedCharacter.showImage ? (
              <img
                src={selectedCharacter.image}
                alt='Character'
                className='modal-image'
              />
            ) : (
              <div className='modal-content'>
                <div className='modal-content-desc'>
                  <h2>{selectedCharacter.name}</h2>
                  <p>Gender: {selectedCharacter.gender}</p>
                  <p>Created: {selectedCharacter.created}</p>
                </div>

                <img
                  src={selectedCharacter.image}
                  alt='Character'
                  className='modal-image'
                />
              </div>
            )}

            <Button
              variant='contained'
              className='modal-close'
              onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
