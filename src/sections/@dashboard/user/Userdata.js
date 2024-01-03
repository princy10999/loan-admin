import moment from 'moment';
import { useParams } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Card, Typography, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils

// components
import Scrollbar from '../../../components/Scrollbar';
import Label from '../../../components/Label';

// ----------------------------------------------------------------------
const BoxStyle = styled(Box)({
  minWidth: 240,
});

const DivStyle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const StackStyle = styled(Stack)({
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingTop: '10px',
});

userData.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function userData({ title, subheader, tableData, ...other }) {

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <DivStyle sx={{ p: 3 }}>
          <BoxStyle sx={{ pt: 1, pb: 1 }}>
            <StackStyle direction={{ sx: 'column', }} spacing={3}>
              <Label
                variant="ghost"
                color= 'primary'
              >
                Total Lead
              </Label>
              <Label
                color= 'primary'
              >
               {tableData?.totalRes}
              </Label>

            </StackStyle>
            <StackStyle direction={{ sx: 'column' }} spacing={3}>
              <Label
                variant="ghost"
                color= 'success'
              >
                Total Done Lead
              </Label>
              <Label
                color= 'success'
              >
               {tableData?.totalCom}
              </Label>

            </StackStyle>
            <StackStyle direction={{ sx: 'column' }} spacing={3}>
              <Label
                variant="ghost"
                color= 'warning'
              >
                Total Pending Lead
              </Label>
              <Label
                color= 'warning'
              >
               {tableData?.totalRes}
              </Label>
            </StackStyle>
            <StackStyle direction={{ sx: 'column' }} spacing={3}>
              <Label
                variant="ghost"
                color= 'error'
              >
                Total Not Done Lead
              </Label>
              <Label
                color= 'error'
              >
               {tableData?.totalRes}
              </Label>
            </StackStyle>
          </BoxStyle>
        </DivStyle>
      </Scrollbar>
    </Card>
  );
}
