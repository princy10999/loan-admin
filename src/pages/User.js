import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableContainer,
  TableCell,
  Container,
  Typography,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Page from '../components/Page';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { getResponse } from '../components/API/CommonAPI';
import UserMoreMenuUser from '../sections/@dashboard/user/UserMoreMenuUser';

const TableCellStyle = styled(TableCell)(() => ({
  cursor: 'pointer',
}));
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'i',
    numeric: true,
    label: '#',
    alignRight: false,
  },
  {
    id: 'name',
    numeric: false,
    label: 'Full Name',
    alignRight: false,
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
    alignRight: false,
  },

  {
    id: 'phoneNumber',
    numeric: true,
    label: 'Mobile Number',
    alignRight: false,
  },
  {
    id: 'birthDate',
    numeric: true,
    label: ' Date of Birth',
    alignRight: false,
  },
  {
    id: 'address',
    numeric: false,
    label: 'Address',
    alignRight: false,
  },
  {
    id: 'locatedArea',
    numeric: false,
    label: 'Located Area',
    alignRight: false,
  },

  {
    id: 'dateOfJoining',
    numeric: true,
    label: 'Date of Joining',
    alignRight: false,
  },
  { id: '' },
];

// --------------------------------------------------
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

// ------------------------------------------------------------
export default function User() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [tableData, setTableData] = useState([]);

  const TableData = async () => {
    const response = await getResponse('/user/user', {});
    setTableData(response?.data?.data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
  useEffect(() => {
    TableData();
  }, []);

  useEffect(() => {
    if (filterName) {
      const filtervalue = tableData.filter((value) => value.name.toString().includes(filterName.toString()));
      console.log('filtervalue', filtervalue);
      setTableData(filtervalue);
    } else {
      TableData();
    }
  }, [filterName]);
  return (
    <Page title="Users">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {stableSort(tableData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    const { name, email, phoneNumber, birthDate, address, locatedArea, dateOfJoining, _id } = row;

                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCellStyle
                          scope="row"
                          onClick={() => {
                            navigate(`/dashboard/single-user/${_id}`);
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {' '}
                              {i + 1}{' '}
                            </Typography>
                          </Stack>
                        </TableCellStyle>
                        <TableCellStyle
                          scope="row"
                          onClick={() => {
                            navigate(`/dashboard/single-user/${_id}`);
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {' '}
                              {name}{' '}
                            </Typography>
                          </Stack>
                        </TableCellStyle>
                        <TableCellStyle
                          scope="row"
                          onClick={() => {
                            navigate(`/dashboard/single-user/${_id}`);
                          }}
                        >
                          <Typography noWrap variant="body2">
                            {' '}
                            {email}{' '}
                          </Typography>
                        </TableCellStyle>

                        <TableCellStyle
                          scope="row"
                          onClick={() => {
                            navigate(`/dashboard/single-user/${_id}`);
                          }}
                        >
                          <Typography noWrap variant="body2">
                            {' '}
                            {phoneNumber}{' '}
                          </Typography>
                        </TableCellStyle>
                        <TableCellStyle
                          scope="row"
                          onClick={() => {
                            navigate(`/dashboard/single-user/${_id}`);
                          }}
                        >
                          <Typography noWrap variant="body2">
                            {' '}
                            {moment(birthDate).format('DD-MM-yyyy')}{' '}
                          </Typography>
                        </TableCellStyle>
                        <TableCellStyle
                          scope="row"
                          sx={{ width: 240, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis' }}
                          onClick={() => {
                            navigate(`/dashboard/single-user/${_id}`);
                          }}
                        >
                          <Typography noWrap variant="body2">
                            {' '}
                            {address}{' '}
                          </Typography>
                        </TableCellStyle>

                        <TableCellStyle
                          scope="row"
                          onClick={() => {
                            navigate(`/dashboard/single-user/${_id}`);
                          }}
                        >
                          <Typography noWrap variant="body2">
                            {' '}
                            {locatedArea}{' '}
                          </Typography>
                        </TableCellStyle>

                        <TableCellStyle
                          scope="row"
                          onClick={() => {
                            navigate(`/dashboard/single-user/${_id}`);
                          }}
                        >
                          <Typography variant="body2" noWrap>
                            {' '}
                            {moment(dateOfJoining).format('DD-MM-yyyy')}{' '}
                          </Typography>
                        </TableCellStyle>

                        <TableCellStyle align="right">
                          <UserMoreMenuUser item={row._id}  reCallFun={() => TableData()} />
                        </TableCellStyle>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCellStyle colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[25, 100, 200]}
            component="div"
            count={tableData.length}
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
