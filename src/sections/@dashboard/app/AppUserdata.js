import { useState } from 'react';
import moment from 'moment';
// @mui
import PropTypes from 'prop-types';
import { Box, Card, Typography, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Scrollbar from '../../../components/Scrollbar';

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

export default function AppNewsUpdate({ title, subheader, tableData, ...other }) {
  let userRole1;
  if (tableData?.userData?.userRole === 1) {
    userRole1 = 'Sales man';
  } else if (tableData?.userData?.userRole === 0) {
    userRole1 = 'Admin';
  }

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
              {tableData?.userData?.name}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Birthday Date
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {moment(tableData?.userData?.birthDate).format('DD-MM-yyyy')}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Email
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {tableData?.userData?.email}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Phone Number
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {tableData?.userData?.phoneNumber}
            </Typography>
          </BoxStyle>

          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Address
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {tableData?.userData?.address}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Located Area
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {tableData?.userData?.locatedArea}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Date Of Joining
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {moment(tableData?.userData?.dateOfJoining).format('DD-MM-yyyy')}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              User Role
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {userRole1}
            </Typography>
          </BoxStyle>

          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Created At
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {moment(tableData?.userData?.createdAt).format('DD-MM-yyyy')}
            </Typography>
          </BoxStyle>
          <BoxStyle>
            <Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
              Updated At
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }} noWrap>
              {moment(tableData?.userData?.updatedAt).format('DD-MM-yyyy')}
            </Typography>
          </BoxStyle>
        </DivStyle>
      </Scrollbar>
    </Card>
  );
}
