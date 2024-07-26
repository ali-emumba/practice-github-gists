import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  styled,
  Container,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import GistsTable from "../Components/GistsTable";
import GistCardList from "../Components/GistCardList";
import { getPublicGists } from "../Services/gistsServiceFunctions";
import dayjs from "dayjs";
import { useAppSelector } from "../Store/hooks";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 93vh;
  min-width: 100%;
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

const getFilteredResults = (data: any) => {
  return data.map((gist: any) => {
    const firstFileKey = Object.keys(gist.files)[0];
    const firstFile = gist.files[firstFileKey];

    return {
      id: gist.id,
      fileName: firstFile,
      ownerName: gist.owner.login,
      ownerImageUrl: gist.owner.avatar_url,
      gistName: firstFile.filename,
      createdAt: dayjs(gist.created_at).format("DD-MM-YYYY"),
      gistDescription: gist.description,
      updatedAt: dayjs(gist.updated_at).format("DD-MM-YYYY"),
      gitHubUrl: gist.owner.html_url,
    };
  });
};

const HomePage = () => {
  const [viewMode, setViewMode] = useState("table");
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const accessToken = useAppSelector((state) => state.auth.user?.accessToken);

  useEffect(() => {
    const fetchGists = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPublicGists(accessToken);
        setGists(getFilteredResults(data));
      } catch (error: any) {
        setError("Error fetching gists: " + error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGists();
  }, []);

  const handleTableView = () => {
    setViewMode("table");
  };

  const handleCardView = () => {
    setViewMode("card");
  };

  return (
    <StyledContainer
      sx={{ px: { lg: "8vw", md: "6vw", sm: "4vw" }, py: "5vh" }}
    >
      <HeaderBox>
        <Typography variant="h5">Public Gists</Typography>
        <ViewSwitchBox>
          <IconButton
            onClick={handleTableView}
            color={viewMode === "table" ? "primary" : "default"}
          >
            <ListIcon />
          </IconButton>
          <IconButton
            onClick={handleCardView}
            color={viewMode === "card" ? "primary" : "default"}
          >
            <ViewModuleIcon />
          </IconButton>
        </ViewSwitchBox>
      </HeaderBox>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : viewMode === "table" ? (
        <GistsTable publicGistData={gists} />
      ) : (
        <GistCardList publicGistData={gists} />
      )}
    </StyledContainer>
  );
};

export default HomePage;
