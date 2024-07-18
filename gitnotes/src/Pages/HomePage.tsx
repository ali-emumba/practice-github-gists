import { useState } from 'react';
import { Box, Typography, Switch, IconButton, styled, Container } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import GistsTable from '../Components/GistsTable';
import { usePublicGistsData } from '../Services/hooks/usePublicGistData';
import GistCardList from '../Components/GistCardList';


const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 93vh;
  padding: 5vh 5vw;
  width: 100%;
`;

const HeaderBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ViewSwitchBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const ContentContainer = styled(Container)`
  width: 100%;
`;

const HomePage = () => {
  const [viewMode, setViewMode] = useState('table');
  const data = usePublicGistsData(false);
  const publicGistData = data.data;
  console.log(publicGistData);

  const handleSwitchChange = () => {
    setViewMode((prevMode) => (prevMode === 'table' ? 'card' : 'table'));
  };

  return (
    <StyledContainer>
      <HeaderBox>
        <Typography variant="h5">Public Gists</Typography>
        <ViewSwitchBox>
          <IconButton onClick={handleSwitchChange} color={viewMode === 'table' ? 'primary' : 'default'}>
            <ListIcon />
          </IconButton>
          <Switch checked={viewMode === 'card'} onChange={handleSwitchChange} />
          <IconButton onClick={handleSwitchChange} color={viewMode === 'card' ? 'primary' : 'default'}>
            <ViewModuleIcon />
          </IconButton>
        </ViewSwitchBox>
      </HeaderBox>
      <ContentContainer>
        {viewMode === 'table' ? <GistsTable publicGistData={publicGistData} /> : <GistCardList publicGistData={publicGistData} />}
      </ContentContainer>
    </StyledContainer>
  );
};

export default HomePage;
