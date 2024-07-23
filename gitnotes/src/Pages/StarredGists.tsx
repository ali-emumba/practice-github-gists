import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  getStarredGists,
  GistFile,
  GistOwner,
} from "../Services/gistsUtilFunctions"; // Import the fetch function and types
import { useAppSelector } from "../Store/hooks";
import dayjs from "dayjs";
import GistCard from "./../Components/GistCard"; // Import the GistCard component

// Styled components for design
const Sidebar = styled(Box)`
  width: 250px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  height: 100vh;

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    padding: 16px 0;
  }
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  overflow-x: hidden;
`;

const UserProfile = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const GistCountCircle = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #003b44;
  color: white;
  border-radius: 50%;
  font-size: 1.25rem;
  margin-left: 8px;
`;

interface StarredGistData {
  id: string;
  owner: GistOwner;
  created_at: string;
  gistName: string;
  description: string;
  updated_at: string;
  html_url: string;
  raw_url: string;
  files: {
    [key: string]: GistFile;
  };
}

const getFilteredStarredGists = (data: StarredGistData[]) => {
  return data.map((gist) => {
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
      rawUrl: firstFile.raw_url, // Added rawUrl for fetching content
    };
  });
};

const StarredGists = () => {
  const [gists, setGists] = useState<StarredGistData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const user = useAppSelector((state) => state.auth.user);

  // Fetch user's starred gists and update state
  useEffect(() => {
    const loadStarredGists = async () => {
      try {
        const data = await getStarredGists(user?.accessToken);
        setGists(getFilteredStarredGists(data));
      } catch (error) {
        console.error("Failed to load starred gists:", error);
      }
    };

    loadStarredGists();
  }, [user]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleYourGithubProfileClick = () => {
    window.open(`https://github.com/`);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        px: { sm: "4vw", md: "8vw", lg: "16vw" },
        py: "3rem",
        gap: "3rem",
      }}
    >
      <Sidebar sx={{ backgroundColor: "transparent" }}>
        {user && (
          <UserProfile>
            <Avatar
              src={user.photoURL!}
              alt="User"
              sx={{ width: 250, height: 250 }}
            />
            <Typography variant="h6" component="span" sx={{ mt: 2 }}>
              {user.displayName ? user.displayName : user.email}
            </Typography>
            <Button
              onClick={handleYourGithubProfileClick}
              sx={{
                backgroundColor: "#003B44",
                color: "white",
                mt: 2,
                padding: "8px 32px",
              }}
            >
              View on GitHub
            </Button>
          </UserProfile>
        )}
      </Sidebar>
      <MainContent>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          sx={isMobile ? { justifyContent: "center" } : null}
        >
          <Typography variant="h4" component="h2">
            Starred Gists
          </Typography>
          <GistCountCircle>{gists.length}</GistCountCircle>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              {gists
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((gist) => (
                  <TableRow key={gist.id}>
                    <TableCell>
                      {/* Render GistCard for each gist */}
                      <GistCard
                        fullWidth={true}
                        id={gist.id}
                        ownerName={gist.ownerName}
                        ownerImageUrl={gist.ownerImageUrl}
                        gistName={gist.gistName!}
                        createdAt={gist.createdAt!}
                        gistDescription={gist.gistDescription}
                        rawUrl={gist.rawUrl}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={gists.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </MainContent>
    </Box>
  );
};

export default StarredGists;
