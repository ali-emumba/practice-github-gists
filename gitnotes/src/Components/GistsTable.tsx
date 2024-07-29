import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Box, IconButton, Skeleton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../Store/hooks";
import { forkGist, starGist } from "../Services/gistsServiceFunctions";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { truncateText } from "../utils/utils";

interface Column {
  id: "ownerName" | "gistName" | "createdAt" | "gistDescription" | "actions";
  label: string;
}

const columns: Column[] = [
  { id: "ownerName", label: "Owner Name" },
  { id: "gistName", label: "Gist Name" },
  { id: "createdAt", label: "Created At" },
  { id: "gistDescription", label: "Description" },
  { id: "actions", label: "" },
];

interface publicGistData {
  id: string;
  ownerName: string;
  ownerImageUrl: string;
  gistName: string;
  createdAt: string;
  gistDescription: string;
  rawUrl: string;
}

interface GistsTableProps {
  publicGistData: publicGistData[];
}

export default function GistsTable({ publicGistData }: GistsTableProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [starLoading, setStarLoading] = useState<string | null>(null); // Track which gist is loading for starring
  const [forkLoading, setForkLoading] = useState<string | null>(null); // Track which gist is loading for forking

  const userAuthToken = useAppSelector((state) => state.auth.user?.accessToken);

  useEffect(() => {
    if (publicGistData && publicGistData.length > 0) {
      setLoading(false);
    }
  }, [publicGistData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/gist/${id}`);
  };

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

  console.log(publicGistData);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightgray" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={"left"}
                  style={{ top: 57, minWidth: "150px", fontWeight: "600" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="90%" />
                    </TableCell>
                    <TableCell align="right" sx={{ display: "flex" }}>
                      <Skeleton variant="rectangular" width={24} height={24} />
                      <Skeleton variant="rectangular" width={24} height={24} />
                    </TableCell>
                  </TableRow>
                ))
              : publicGistData &&
                publicGistData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      sx={{ cursor: "pointer" }}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => handleRowClick(row.id)}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            src={row.ownerImageUrl}
                            alt="User"
                            sx={{ width: 40, height: 40, marginRight: "10px" }}
                          />
                          {row.ownerName}
                        </Box>
                      </TableCell>
                      <TableCell>{truncateText(row.gistName, 20)}</TableCell>
                      <TableCell>{truncateText(row.createdAt, 20)}</TableCell>
                      <TableCell>
                        {row.gistDescription &&
                          truncateText(row.gistDescription, 20)}
                      </TableCell>
                      <TableCell align="right" sx={{ display: "flex" }}>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStarClick(row.id);
                          }}
                          disabled={!isAuthenticated || starLoading === row.id}
                          aria-label="star"
                        >
                          {starLoading === row.id ? (
                            <Skeleton
                              variant="circular"
                              width={24}
                              height={24}
                            />
                          ) : (
                            <StarBorderIcon />
                          )}
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleForkClick(row.id);
                          }}
                          disabled={!isAuthenticated || forkLoading === row.id}
                          aria-label="fork"
                        >
                          {forkLoading === row.id ? (
                            <Skeleton
                              variant="circular"
                              width={24}
                              height={24}
                            />
                          ) : (
                            <ForkRightIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={publicGistData && publicGistData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
