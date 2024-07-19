import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Box, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import { useNavigate } from "react-router-dom";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/gist/${id}`);
  };

  const handleStarClick = (id: string) => {
    console.log(`Star clicked for gist ID: ${id}`);
  };

  const handleForkClick = (id: string) => {
    console.log(`Fork clicked for gist ID: ${id}`);
  };

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
            {publicGistData &&
              publicGistData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
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
                      <TableCell>{row.gistName}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.gistDescription}</TableCell>
                      <TableCell align="right" sx={{ display: "flex" }}>
                        <IconButton
                          onClick={() => handleStarClick(row.id)}
                          aria-label="star"
                        >
                          <StarIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleForkClick(row.id)}
                          aria-label="fork"
                        >
                          <ForkRightIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
