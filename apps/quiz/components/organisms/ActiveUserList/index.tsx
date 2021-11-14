import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

type Column = {
  id: 'name';
  label: string;
  minWidth?: number;
};

const columns: readonly Column[] = [
  { id: 'name', label: '名前', minWidth: 300 },
];

type Data = {
  name: string;
};

const createData = (name: string): Data => {
  return { name };
};

const ActiveUserList: React.FC<{ activeUsers: string[] }> = ({
  activeUsers,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = activeUsers.map((u) => createData(u));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.currentTarget.value));
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative', top: '12px', borderRadius: '12px' }}>
        <TableContainer sx={{ minHeight: '625px' }}>
          <Table stickyHeader aria-label="active user table">
            <TableHead>
              <TableRow>
                {columns.map((c) => (
                  <TableCell key={c.id}>{c.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover key={row.name}>
                      {columns.map((c) => (
                        <TableCell key={c.id}>{row.name}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ActiveUserList;
