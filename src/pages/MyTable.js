import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';
import {
  Paper,
  Card,
  Box,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TablePagination,
  TableContainer,
  TableHead,
  TableSortLabel,
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import { getResponse } from '../components/API/CommonAPI';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: '#',
    numeric: false,
    label: '#',
    disablePadding: false,
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },

  {
    id: 'occupation',
    numeric: false,
    label: 'Occupation',
    disablePadding: false,
  },
  {
    id: 'bankName',
    numeric: false,
    label: 'Bank Name',
    disablePadding: false,
  },
  {
    id: 'loneAmount',
    numeric: true,
    label: 'Loan Amount',
    disablePadding: false,
  },
  {
    id: 'date',
    numeric: true,
    label: 'Date',
    disablePadding: false,
  },
  {
    id: 'time',
    numeric: true,
    label: 'Time',
    disablePadding: false,
  },
  {
    id: 'leadBy',
    numeric: false,
    label: 'Salesman Name',
    disablePadding: false,
  },

  {
    id: 'address',
    numeric: false,
    label: 'Address',
    disablePadding: false,
  },
  {
    id: 'mobileNumber',
    numeric: true,
    label: 'Mobile Number',
    disablePadding: false,
  },
  {
    id: 'reminderDate',
    numeric: true,
    label: 'Reminder Date',
    alignRight: false,
  },
  {
    id: 'reminderTime',
    numeric: true,
    label: 'Reminder Time',
    disablePadding: false,
  },
  {
    id: 'status',
    numeric: false,
    label: 'Status',
    disablePadding: false,
  },
  {
    id: 'dueTime',
    numeric: true,
    label: 'Due Time',
    disablePadding: false,
  },
  { id: '' },
];

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('loanAmount');
  const [selected, setSelected] = React.useState([]);
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setrows] = useState([]);

  const TableData = async () => {
    const response = await getResponse('/user/lead', {});
    setrows(...rows, response?.data?.data);
  };
  useEffect(() => {
    TableData();
  }, []);
  console.log('tableData', rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };
  const handleFilterByName = (event) => {
    console.log('-----', event.target.value);
    setFilterName(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  //   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Page title="My table">
      <Container sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Leads
          </Typography>
        </Stack>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <UserListHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                headLabel={headCells}
                rowCount={rows.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row.name);
                    const date2 = moment(row.date).format('DD-MM-yyyy');
                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell component="th" scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.loanAmount}</TableCell>
                        <TableCell align="right">{date2}</TableCell>
                        <TableCell align="right">{date2}</TableCell>
                        <TableCell align="right">{date2}</TableCell>
                        <TableCell align="right">{date2}</TableCell>
                        <TableCell align="right">{date2}</TableCell>
                        <TableCell align="right">{date2}</TableCell>
                        <TableCell align="right">{date2}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
