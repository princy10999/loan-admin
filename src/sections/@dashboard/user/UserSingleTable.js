import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import timeFormatter from '24hto12hformat';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableContainer,
  TableCell,
  Typography,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Label from '../../../components/Label';
import { UserListHead, UserListToolbar, UserMoreMenu } from './index';
import { getResponse } from '../../../components/API/CommonAPI';

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
    id: 'phoneNumber',
    numeric: true,
    label: 'Mobile Number',
    alignRight: false,
  },
  {
    id: 'name',
    numeric: false,
    label: 'name',
    alignRight: false,
  },
  {
    id: 'address',
    numeric: false,
    label: 'Address',
    alignRight: false,
  },
  {
    id: 'bank',
    numeric: false,
    label: 'Bank Name',
    alignRight: false,
  },
  {
    id: 'loanAmount',
    numeric: true,
    label: 'Loan Amount',
    alignRight: false,
  },
  {
    id: 'topup',
    numeric: true,
    label: 'Top up Amount',
    alignRight: false,
  },
  {
    id: 'date',
    numeric: true,
    label: 'Date',
    alignRight: false,
  },
  {
    id: 'occupation',
    numeric: false,
    label: 'Occupation',
    alignRight: false,
  },
  {
    id: 'leadBy',
    numeric: false,
    label: 'Salesman Name',
    alignRight: false,
  },
  {
    id: 'time',
    numeric: true,
    label: 'Time',
    alignRight: false,
  },

  {
    id: 'ReminderDate',
    numeric: true,
    label: 'Reminder Date',
    alignRight: false,
  },
  {
    id: 'ReminderTime',
    numeric: true,
    label: 'Reminder Time',
    alignRight: false,
  },
  {
    id: 'status',
    numeric: false,
    label: 'Status',
    alignRight: false,
  },
  {
    id: 'dueTime',
    numeric: false,
    label: 'Due Time',
    alignRight: false,
  },
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

// ----------------------------------------------------------------------

export default function UserLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState([]);
  const [leadName, setLeadName] = useState([]);


  const TableData = async () => {
    const response = await getResponse(`/user/user/${id}`, {});
    setRows(response?.data?.data?.userHistory);
  };

  // ---------------------------------------------------------
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    console.log('-----', event.target.value);
    setFilterName(event.target.value);
  };

  // ----------------------------------------------------

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    TableData();
  }, []);

  useEffect(() => {
    if (filterName) {
      const filtervalue = rows.filter((value) => value.name.toString().includes(filterName.toString()));
      console.log('filtervalue', filtervalue);
      setRows(filtervalue);
    } else {
      TableData();
    }
  }, [filterName]);

  return (
    <Card sx={{mt:9}}>
      <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <UserListHead
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={rows.length}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                const {
                  name,
                  occupation,
                  bank,
                  loanAmount,
                  date,
                  ReminderTime,
                  ReminderDate,
                  time,
                  address,
                  status,
                  leadBy,
                  phoneNumber,
                  _id,
                } = row;

                const time2 = timeFormatter(time);
                const date2 = moment(date).format('DD-MM-yyyy');

                const ReminderDate1 = moment(ReminderDate).format('MM-DD-yyyy'); // difference of days
                const date1 = new Date(ReminderDate1);
                const date3 = new Date();
                const diffDay = date3.getTime() - date1.getTime();
                const diffDays = Math.ceil(diffDay / (1000 * 60 * 60 * 24));

                let SName;
                if (leadBy === leadName[0]?._id) {
                  SName = leadName[0]?.name;
                }

                let dueDate;
                if (ReminderDate === null) {
                  dueDate = ' - ';
                }  else if ( status === 2) {
                    dueDate='-'
                }else if (ReminderTime === null) {
                  dueDate = diffDays;
                } 
                 else {
                  dueDate = diffDays;
                }

                let occupationData;
                if (occupation === 1) {
                  occupationData = 'Sales man';
                } else {
                  occupationData = 'admin';
                }

                let daysdiff;
                if (ReminderDate === null) {
                  daysdiff = ' ';
                } else {
                  daysdiff = 'Day';
                }

                let reminderTime;
                if (ReminderTime === null) {
                  reminderTime = ' - ';
                } else {
                  reminderTime = timeFormatter(ReminderTime);
                }

                let reminderDate;
                if (ReminderDate === null) {
                  reminderDate = ' - ';
                } else {
                  reminderDate = moment(ReminderDate).format('DD-MM-yyyy');
                }

                let status2;
                if (status === 0) {
                  status2 = 'Not Done';
                } else if (status === 1) {
                  status2 = 'Pending';
                } else if (status === 2) {
                  status2 = 'Done';
                }

                let rowColor;
                if (loanAmount >= 15) {
                  rowColor = ' #ccf1fdd6';
                }

                return (
                  <TableRow hover key={_id} tabIndex={-1} role="checkbox" sx={{ background: rowColor }}>
                    <TableCellStyle
                      scope="row"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
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
                        navigate(`/dashboard/single-lead/${_id}/true`);
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
                        navigate(`/dashboard/single-lead/${_id}/true`);
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
                      sx={{ width: 240, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis' }}
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography variant="body2" noWrap>
                        {' '}
                        {address}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      sx={{ width: 240, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis' }}
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography noWrap variant="body2">
                        {' '}
                        {bank}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography noWrap variant="body2">
                        {' '}
                        {loanAmount}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography noWrap variant="body2">
                        {' '}
                        {loanAmount}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography noWrap variant="body2">
                        {' '}
                        {date2}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography noWrap variant="body2">
                        {' '}
                        {occupationData}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography variant="body2" noWrap>
                        {' '}
                        {SName}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography noWrap variant="body2">
                        {' '}
                        {time2}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography noWrap variant="body2">
                        {' '}
                        {reminderDate}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography variant="body2" noWrap>
                        {' '}
                        {reminderTime}{' '}
                      </Typography>
                    </TableCellStyle>

                    <TableCellStyle
                      align="left"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Label
                        variant="ghost"
                            color={
                              (status2 === 'Not Done' && 'error') || (status2 === 'Done' && 'success') || 'warning'
                            }
                      >
                        {status2}
                      </Label>
                    </TableCellStyle>

                    <TableCellStyle
                      scope="row"
                      onClick={() => {
                        navigate(`/dashboard/single-lead/${_id}/true`);
                      }}
                    >
                      <Typography variant="body2" noWrap>
                        {' '}
                        {dueDate} {daysdiff}
                      </Typography>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
