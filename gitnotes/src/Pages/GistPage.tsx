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
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from "react-json-pretty/dist/monikai";

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

  console.log({ ...singleGistData.data?.files });
  let extractedFileData =
    singleGistData.data &&
    Object.keys(singleGistData.data?.files!).map((key) => [
      key,
      { ...singleGistData.data?.files }[key],
    ])[0][1];

  extractedFileData && console.log(extractedFileData);
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
                  src={singleGistData.data?.owner!.avatar_url}
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
                      Created at {singleGistData.data?.createdAt!}
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
                title={extractedFileData && extractedFileData.filename!}
                titleTypographyProps={{ variant: "h6" }}
                sx={{
                  borderBottom: "1px solid lightGray",
                }}
              />
              <CardContent>
                <JSONPretty
                  id="json-pretty"
                  data={extractedFileData && extractedFileData.content!}
                  theme={JSONPrettyMon}
                />
              </CardContent>
            </Card>
          </Box>
        </Container>
      )}
    </>
  );
};

export default GistPage;

const json = {
  policies: {
    ExtensionSettings: {
      "*": {
        blocked_install_message: "Custom error message.",
        install_sources: ["about:addons", "https://addons.mozilla.org/"],
        installation_mode: "allowed",
        allowed_types: ["extension"],
      },
      "{d634138d-c276-4fc8-924b-40a0ea21d284}": {
        installation_mode: "force_installed",
        install_url:
          "https://addons.cdn.mozilla.net/user-media/addons/950528/1password_password_manager-1.23.1-fx.xpi?filehash=sha256%3A47e9e98f1072d93d595002dc8c221e5cca17e091b3431563a8e3e2be575c5cc1",
      },
    },
  },
};
