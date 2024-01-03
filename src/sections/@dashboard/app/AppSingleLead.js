import moment from 'moment';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import timeFormatter from '24hto12hformat';
// @mui
import PropTypes from 'prop-types';
import { Box, Card, Typography, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Scrollbar from '../../../components/Scrollbar';
import { getResponse } from '../../../components/API/CommonAPI';

// ----------------------------------------------------------------------
const BoxStyle = styled(Box)({
  minWidth: 240,
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'space-between',
});

const DivStyle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppNewsUpdate({ title, subheader, ...other }) {
  const [time2, setTime2] = useState('');

  const [reminderDate2, setReminderDate2] = useState('');

  const [reminderTime1, setReminderTime1] = useState('');

  const [sName, setSName] = useState('');

  const { id } = useParams();

  const [data, setData] = useState([]);

  console.log(id);

  const TableData = async () => {
    const response = await getResponse(`/user/lead/${id}`, {});
    setData(response?.data?.data[0]);
  };

  useEffect(() => {
    TableData();
  }, []);

  let occupationData;
  if (data?.occupation === 1) {
    occupationData = 'Job';
  } else {
    occupationData = 'Business';
  }

  useEffect(() => {
    if (data?.time) {
      setTime2(timeFormatter(data?.time));
    }

    if (data?.ReminderTime) {
      setReminderTime1(timeFormatter(data?.ReminderTime));
    } else {
      setReminderTime1('-');
    }
    if (data?.ReminderDate) {
      setReminderDate2(moment(data?.ReminderDate).format('DD-MM-yyyy'));
    } else {
      setReminderDate2('-');
    }
    if (data?.user?.[0]?.name) {
      setSName(data?.user?.[0]?.name);
    } else {
      setSName('-');
    }
  }, [data]);

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <DivStyle sx={{ p: 3 }}>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 0.6 }} noWrap>
              Name
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 0.6 }} noWrap>
              {data?.name}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              occupationData
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {occupationData}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Bank Name
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {data?.bank}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Loan Amount
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {data?.loanAmount}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Date
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {moment(data?.date).format('DD-MM-yyyy')}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Time
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {time2}
            </Typography>
          </BoxStyle>

          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Address
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {data?.address}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Phone Number
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {data?.phoneNumber}
            </Typography>
          </BoxStyle>

          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Reminder Time
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {reminderTime1}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Reminder Date
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {reminderDate2}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Salesman Name
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {sName}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Created At
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {moment(data?.createdAt).format('DD-MM-yyyy')}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Updated At
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {moment(data?.updatedAt).format('DD-MM-yyyy')}
            </Typography>
          </BoxStyle>
        </DivStyle>
      </Scrollbar>
    </Card>
  );
}
