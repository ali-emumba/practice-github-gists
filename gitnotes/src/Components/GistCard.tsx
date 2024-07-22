import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import JSONPretty from "react-json-pretty";

interface publicGistDataProps {
  id: string;
  ownerName: string;
  ownerImageUrl: string;
  gistName: string;
  createdAt: string;
  gistDescription: string;
  rawUrl: string;
}

export default function GistCard({
  id,
  ownerName,
  ownerImageUrl,
  gistName,
  createdAt,
  gistDescription,
  rawUrl,
}: publicGistDataProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/gist/${id}`);
  };

  const [fileData, setFileData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(rawUrl);
        setFileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [rawUrl]);

  return (
    <StyledCard onClick={handleCardClick}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      ) : (
        <>
          <StyledCardContent>
            <JSONPretty id="json-pretty" data={fileData} />
          </StyledCardContent>
          <CardFooter>
            <Avatar
              src={ownerImageUrl}
              alt="User"
              sx={{ width: 60, height: 60 }}
            />
            <UserDetails>
              <Typography variant="body2" component="span">
                {ownerName} /{" "}
                <Typography variant="body2" fontWeight="bold" component="span">
                  {gistName}
                </Typography>
              </Typography>
              <GistInfo>
                <Typography variant="caption" component="span">
                  Created at {createdAt}
                </Typography>
                <Typography variant="caption" component="span">
                  {gistDescription}
                </Typography>
              </GistInfo>
            </UserDetails>
          </CardFooter>
        </>
      )}
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 380px;
  min-height: 300px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black;
  overflow: hidden;
  cursor: pointer;
`;

const StyledCardContent = styled(CardContent)`
  margin-bottom: 16px;
  height: 250px;
  overflow: hidden;
  background-color: rgba(250, 250, 250, 1);
`;

const CardFooter = styled(Box)`
  display: flex;
  min-height: 50px;
  align-items: center;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  overflow: hidden;
`;

const UserDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  line-height: 1;
  margin-left: 10px;
`;

const GistInfo = styled(Box)`
  font-size: 12px;
  color: #586069;

  span {
    display: block;
  }
`;
