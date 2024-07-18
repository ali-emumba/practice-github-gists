import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  styled,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAGist } from "../Services/hooks/useAGist";

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
  console.log(id);
  const singleGistData = useAGist(id!);

  console.log({ ...singleGistData.data?.files.content });

  //   const key = singleGistData && Object.keys(singleGistData.data.files[0]);
  //   console.log(key, singleGistData.data.files[key].filename);
  return (
    <>
      {singleGistData && (
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
                  src={singleGistData.data?.owner.avatar_url}
                  alt="User"
                  sx={{ width: 60, height: 60 }}
                />
                <UserDetails>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ color: "#003B44", fontWeight: "bold" }}
                  >
                    {singleGistData.data?.owner?.login}{" "}
                    <Typography fontWeight="bold" component="span">
                      {/* {singleGistData.data?.gistName} */}
                    </Typography>
                  </Typography>
                  <GistInfo>
                    <Typography variant="caption" component="span">
                      Created at {singleGistData.data?.createdAt}
                    </Typography>
                    <Typography variant="caption" component="span">
                      {singleGistData.data?.description}
                    </Typography>
                  </GistInfo>
                </UserDetails>
              </Box>
            </Box>

            <Card variant="outlined">
              <CardHeader
                title={singleGistData.data?.files[0]?.filename}
                titleTypographyProps={{ variant: "h6" }}
                sx={{
                  borderBottom: "1px solid lightGray",
                }}
              />
              <CardContent>
                {singleGistData.data?.files[0]?.content}
              </CardContent>
            </Card>
          </Box>
        </Container>
      )}
    </>
  );
};

export default GistPage;
