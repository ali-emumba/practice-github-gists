import React, { useState } from 'react';
import { Box, Container, Typography, Switch, IconButton } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import GistsTable from '../Components/GistsTable';
import { usePublicGistsData } from '../Services/hooks/usePublicGistData';
import GistCardList from '../Components/GistCardList';

const HomePage = () => {
  const [viewMode, setViewMode] = useState('table');
  const data = usePublicGistsData(false);
  const publicGistData = data.data;
console.log(publicGistData)
  const handleSwitchChange = () => {
    setViewMode((prevMode) => (prevMode === 'table' ? 'card' : 'table'));
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', padding: '0 5vw', width: '100%'}}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Typography variant="h5">Public Gists</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleSwitchChange} color={viewMode === 'table' ? 'primary' : 'default'}>
            <ListIcon />
          </IconButton>
          <Switch checked={viewMode === 'card'} onChange={handleSwitchChange} />
          <IconButton onClick={handleSwitchChange} color={viewMode === 'card' ? 'primary' : 'default'}>
            <ViewModuleIcon />
          </IconButton>
        </Box>
      </Box>

      <Container>
      {viewMode === 'table' ? <GistsTable publicGistData={publicGistData}/> : <GistCardList publicGistData={publicGistData} />}
      </Container>

    </Container>
  );
};

export default HomePage;
