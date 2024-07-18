import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'Name' | 'NotebookName' | 'Keyword' | 'Updated' | 'links';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'Name', label: 'Name',  },
  { id: 'NotebookName', label: 'Notebook Name',  },
  {
    id: 'Keyword',
    label: 'Keyword',
    
  },
  {
    id: 'Updated',
    label: 'Updated',
    
  },
  {
    id: 'links',
    label: '',
    
  },
];

interface Data {
    Name: string;
    NotebookName: string;
    Keyword: number;
    Updated: number;
    links: number;
}

function createData(
  Name: string,
  NotebookName: string,
  Keyword: number,
  Updated: number,
  links: number,
): Data {
  return { Name, NotebookName, Keyword, Updated, links };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, 1212),
  createData('China', 'CN', 1403500365, 9596961, 1212),
  createData('Italy', 'IT', 60483973, 301340, 1212),
  createData('United States', 'US', 327167434, 9833520, 1212),
  createData('Canada', 'CA', 37602103, 9984670, 1212),
  createData('Australia', 'AU', 25475400, 7692024, 1212),
  createData('Germany', 'DE', 83019200, 357578, 1212),
  createData('Ireland', 'IE', 4857000, 70273, 1212),
  createData('Mexico', 'MX', 126577691, 1972550, 1212),
  createData('Japan', 'JP', 126317000, 377973, 1212),
  createData('France', 'FR', 67022000, 640679, 1212),
  createData('United Kingdom', 'GB', 67545757, 242495, 1212),
  createData('Russia', 'RU', 146793744, 17098246, 1212),
  createData('Nigeria', 'NG', 200962417, 923768, 1212),
  createData('Brazil', 'BR', 210147125, 8515767, 1212),
];

export default function GistsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table  aria-label="sticky table">
          <TableHead>
            <TableRow sx={{backgroundColor: 'lightgray', }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth, fontWeight: '600' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]} 
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
