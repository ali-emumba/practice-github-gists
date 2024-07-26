import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Skeleton,
  styled,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import {
  deleteGist,
  fetchGist,
  forkGist,
  GistData,
  GistFile,
  starGist,
} from "../Services/gistsServiceFunctions"; // Import the function and types
import dayjs from "dayjs";
import { useAppSelector } from "../Store/hooks";
import { toast } from "react-toastify";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon
import EditIcon from "@mui/icons-material/Edit"; // Import the edit icon

const UserDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  margin-left: 10px;
  align-items: space-between;
  font-size: 12px;
  color: #586069;
`;

const GistInfo = styled(Box)`
  font-size: 12px;
  color: #586069;

  span {
    display: block;
  }
`;

const GistPage = () => {
  const { id } = useParams();

  const [singleGistData, setSingleGistData] = useState<GistData | null>(null);
  const [extractedFileData, setExtractedFileData] = useState<GistFile[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userToken = useAppSelector((state) => state.auth.user?.accessToken);

  // Fetch gist data and update state
  useEffect(() => {
    const loadGistData = async (gistId: string) => {
      try {
        const data = await fetchGist(gistId, userToken);
        setSingleGistData(data);

        // Extract all file data
        const fileData = Object.keys(data.files).map((key) => data.files[key]);
        setExtractedFileData(fileData as GistFile[]);

        setIsLoading(false);
      } catch (error) {
        setError("Failed to load gist data.");
        setIsLoading(false);
      }
    };

    if (id) {
      loadGistData(id);
    }
  }, [id, userToken]);

  return (
    <Container
      sx={{
        minHeight: "93vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <SkeletonContainer />
      ) : error ? (
        <ErrorContainer />
      ) : (
        <ContentContainer
          singleGistData={singleGistData!}
          extractedFileData={extractedFileData}
          id={id}
        />
      )}
    </Container>
  );
};

const SkeletonContainer = () => (
  <Box
    sx={{
      width: "95%",
      minHeight: "80vh",
      padding: "16px",
    }}
  >
    <Box
      sx={{
        height: "15%",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Skeleton variant="circular" width={60} height={60} />
        <UserDetails>
          <Skeleton variant="text" width={120} />
          <GistInfo>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={150} />
          </GistInfo>
        </UserDetails>
      </Box>
    </Box>

    <Card variant="outlined">
      <CardHeader
        title={<Skeleton variant="text" width="80%" />}
        titleTypographyProps={{ variant: "h6" }}
        sx={{
          borderBottom: "1px solid lightGray",
        }}
      />
      <CardContent>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </CardContent>
    </Card>
  </Box>
);

const ErrorContainer = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "16px",
    }}
  >
    <Typography variant="h5" component="div" sx={{ color: "#D32F2F" }}>
      No Gist Found
    </Typography>
    <Typography variant="body1" component="div" sx={{ marginTop: "8px" }}>
      The gist you are looking for does not exist.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to="/"
      sx={{ marginTop: "16px" }}
    >
      Go to Homepage
    </Button>
  </Box>
);

// Define the props for ContentContainer
interface ContentContainerProps {
  singleGistData: GistData;
  extractedFileData: GistFile[] | null;
  id: string | undefined;
}

const ContentContainer = ({
  singleGistData,
  extractedFileData,
  id,
}: ContentContainerProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userAuthToken = useAppSelector((state) => state.auth.user?.accessToken);
  const currentUser = useAppSelector((state) => state.auth.user); // Assuming current user is stored here

  const [starLoading, setStarLoading] = useState<string | null>(null);
  const [forkLoading, setForkLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false); // Track the delete loading state

  // Check if the current user is the owner of the gist
  const isOwner = currentUser?.photoURL === singleGistData.owner.avatar_url;

  const handleStarClick = async (id: string) => {
    if (!isAuthenticated || !userAuthToken) {
      console.error("User is not authenticated or no auth token available.");
      return;
    }

    setStarLoading(id);

    try {
      await starGist(id, userAuthToken);
      toast.success(`Star successful for gist ID: ${id}`);
    } catch (error) {
      console.error("Error starring gist:", error);
      toast.error("Error starring gist. Please try again.");
    } finally {
      setStarLoading(null);
    }
  };

  const handleForkClick = async (id: string) => {
    if (!isAuthenticated || !userAuthToken) {
      console.error("User is not authenticated or no auth token available.");
      return;
    }

    setForkLoading(id);

    try {
      await forkGist(id, userAuthToken);
      toast.success(`Fork successful for gist ID: ${id}`);
    } catch (error) {
      console.error("Error forking gist:", error);
      toast.error("Error forking gist. Please try again.");
    } finally {
      setForkLoading(null);
    }
  };

  const navigate = useNavigate();

  const handleDeleteClick = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent event propagation to the card click
    if (!isAuthenticated || !userAuthToken) {
      console.error("User is not authenticated or no auth token available.");
      return;
    }

    setDeleteLoading(true);

    try {
      await deleteGist(id, userAuthToken);
      toast.success(`Gist deleted successfully with ID: ${id}`);
      navigate("/userGists");
    } catch (error) {
      console.error("Error deleting gist:", error);
      toast.error("Error deleting gist. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "95%",
        minHeight: "80vh",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          height: "15%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          marginBottom: "16px",
          gap: "10px", // Add a gap between items
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Avatar
            src={singleGistData.owner.avatar_url}
            alt="User"
            sx={{ width: 60, height: 60 }}
          />
          <UserDetails>
            <Typography
              variant="body1"
              component="span"
              sx={{
                color: "#003B44",
                fontWeight: "bold",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ fontWeight: "400" }}>
                {singleGistData.owner.login}
              </Typography>
              {" / "}
              {extractedFileData && extractedFileData[0].filename}
            </Typography>
            <Typography variant="caption" component="span">
              Created at {dayjs(singleGistData.created_at).format("DD-MM-YYYY")}
            </Typography>
            <Typography variant="caption" component="span">
              {singleGistData.description}
            </Typography>
          </UserDetails>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-end", sm: "center" },
            gap: "10px",
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleStarClick(id!);
            }}
            disabled={!isAuthenticated || starLoading === id}
            aria-label="star"
          >
            {starLoading === id ? (
              <Skeleton variant="circular" width={24} height={24} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleForkClick(id!);
            }}
            disabled={!isAuthenticated || forkLoading === id}
            aria-label="fork"
          >
            {forkLoading === id ? (
              <Skeleton variant="circular" width={24} height={24} />
            ) : (
              <ForkRightIcon />
            )}
          </IconButton>
          {/* Conditionally render the Edit button based on ownership */}
          {isOwner && (
            <IconButton
              component={Link}
              to={`/editGist/${id}`} // Make sure this route exists
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          )}
          {isOwner && (
            <IconButton
              onClick={(e) => handleDeleteClick(e, id!)}
              disabled={!isAuthenticated || deleteLoading}
              aria-label="delete"
            >
              {deleteLoading ? (
                <Skeleton variant="circular" width={24} height={24} />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          )}
        </Box>
      </Box>

      {extractedFileData &&
        extractedFileData.map((file, index) => (
          <Card variant="outlined" key={index} sx={{ marginTop: "16px" }}>
            <CardHeader
              title={file.filename}
              titleTypographyProps={{ variant: "h6" }}
              sx={{
                borderBottom: "1px solid lightGray",
              }}
            />
            <CardContent>
              <JSONPretty id={`json-pretty-${index}`} data={file.content} />
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};

export default GistPage;
