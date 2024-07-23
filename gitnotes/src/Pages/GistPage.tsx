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
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import { fetchGist, GistData, GistFile } from "../Services/gists"; // Import the function and types

const UserDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  margin-left: 10px;
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
  const [extractedFileData, setExtractedFileData] = useState<GistFile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch gist data and update state
  useEffect(() => {
    const loadGistData = async (gistId: string) => {
      try {
        const data = await fetchGist(gistId);
        setSingleGistData(data);

        // Extract the first file's data
        const fileData = Object.keys(data.files).map((key) => [
          key,
          data.files[key],
        ])[0][1];
        setExtractedFileData(fileData as GistFile);

        setIsLoading(false);
      } catch (error) {
        setError("Failed to load gist data.");
        setIsLoading(false);
      }
    };

    if (id) {
      loadGistData(id);
    }
  }, [id]);

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
  extractedFileData: GistFile | null;
}

const ContentContainer = ({
  singleGistData,
  extractedFileData,
}: ContentContainerProps) => (
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
        <Avatar
          src={singleGistData.owner.avatar_url}
          alt="User"
          sx={{ width: 60, height: 60 }}
        />
        <UserDetails>
          <Typography
            variant="body1"
            component="span"
            sx={{ color: "#003B44", fontWeight: "bold" }}
          >
            {singleGistData.owner.login}{" "}
            <Typography fontWeight="bold" component="span">
              {/* {singleGistData.gistName} */}
            </Typography>
          </Typography>
          <GistInfo>
            <Typography variant="caption" component="span">
              Created at {singleGistData.created_at}
            </Typography>
            <Typography variant="caption" component="span">
              {singleGistData.description}
            </Typography>
          </GistInfo>
        </UserDetails>
      </Box>
    </Box>

    <Card variant="outlined">
      <CardHeader
        title={extractedFileData && extractedFileData.filename}
        titleTypographyProps={{ variant: "h6" }}
        sx={{
          borderBottom: "1px solid lightGray",
        }}
      />
      <CardContent>
        <JSONPretty
          id="json-pretty"
          data={extractedFileData && extractedFileData.content}
        />
      </CardContent>
    </Card>
  </Box>
);

export default GistPage;
