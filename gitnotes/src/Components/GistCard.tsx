import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import the edit icon
import { toast } from "react-toastify";
import {
  forkGist,
  starGist,
  deleteGist,
} from "../Services/gistsServiceFunctions";
import { useAppSelector } from "../Store/hooks";
import { truncateText } from "../utils/utils";

interface GistCardProps {
  id: string;
  ownerName: string;
  ownerImageUrl: string;
  gistName: string;
  createdAt: string;
  gistDescription: string;
  rawUrl: string;
  fullWidth: boolean;
  isDeletable?: boolean; // Include isDeletable prop
  isEditable?: boolean; // Include isEditable prop
  onDelete?: (id: string) => void; // Callback for delete
}

export default function GistCard({
  id,
  ownerName,
  ownerImageUrl,
  gistName,
  createdAt,
  gistDescription,
  rawUrl,
  fullWidth,
  isDeletable,
  isEditable = false, // Default value for isEditable
  onDelete,
}: GistCardProps) {
  const navigate = useNavigate();
  const [fileData, setFileData] = useState("");
  const [loading, setLoading] = useState(true);
  const [starLoading, setStarLoading] = useState<string | null>(null);
  const [forkLoading, setForkLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isAuthenticated = useAppSelector(
    (state) => state.auth?.isAuthenticated
  );
  const userAuthToken = useAppSelector((state) => state.auth.user?.accessToken);

  const handleCardClick = () => {
    navigate(`/gist/${id}`);
  };

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

  const handleDeleteClick = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!isAuthenticated || !userAuthToken) {
      console.error("User is not authenticated or no auth token available.");
      return;
    }

    setDeleteLoading(true);

    try {
      await deleteGist(id, userAuthToken);
      toast.success(`Gist deleted successfully with ID: ${id}`);
      onDelete!(id);
    } catch (error) {
      console.error("Error deleting gist:", error);
      toast.error("Error deleting gist. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent navigation on card click
    navigate(`/editGist/${id}`); // Navigate to the edit page
  };

  return (
    <StyledCard
      onClick={handleCardClick}
      sx={fullWidth ? { width: "100%", minHeight: "auto" } : null}
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      ) : (
        <>
          <StyledCardContent
            sx={
              fullWidth
                ? {
                    minHeight: "auto",
                    maxHeight: "250px",
                    height: "auto",
                  }
                : null
            }
          >
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
                {ownerName && truncateText(ownerName, 20)}/
                <Typography variant="body2" fontWeight="bold" component="span">
                  {truncateText(gistName, 20)}
                </Typography>
              </Typography>
              <GistInfo>
                <Typography variant="caption" component="span">
                  Created at {createdAt}
                </Typography>
                <Typography variant="caption" component="span">
                  {gistDescription && truncateText(gistDescription, 30)}
                </Typography>
              </GistInfo>
            </UserDetails>
            <ActionButtons className="action-buttons">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleForkClick(id);
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
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleStarClick(id);
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
              {isEditable && (
                <IconButton
                  onClick={(e) => handleEditClick(e, id)}
                  disabled={!isAuthenticated}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              )}
              {isDeletable && (
                <IconButton
                  onClick={(e) => handleDeleteClick(e, id)}
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
            </ActionButtons>
          </CardFooter>
        </>
      )}
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  width: 380px;
  min-height: 300px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black;
  overflow: hidden;
  cursor: pointer;
  position: relative;
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
  border-top: 1px solid #ddd;
  padding-top: 10px;
  overflow: hidden;
  position: relative;
`;

const UserDetails = styled(Box)`
  display: flex;
  width: 60%;
  overflow: hidden;
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

const ActionButtons = styled(Box)`
  flex-grow: 1;
  display: flex;
`;
