import moment from 'moment';

import { useParams } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Card, Typography, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils

// components
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Popup from '../../../components/hook-form/Popup';
import UpdateStatusPopup from '../../../components/hook-form/UpdateStatusPopup';

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

const StackStyle = styled(Stack)({
  justifyContent: 'center',
  alignItems: 'center',
});

AppSingleStatus.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppSingleStatus({ title, subheader, history, handleClick, ...other }) {

  const { id, isTrue } = useParams();


  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <DivStyle sx={{ p: 3 }}>
          {history?.length > 0 &&
            history?.map((option) => {
              const { status, description, updatedAt } = option;

              let status2;
              if (status === '0') {
                status2 = 'Not Done';
              } else if (status === '1') {
                status2 = 'Pending';
              } else if (status === '2') {
                status2 = 'Done';
              }

              return (
                <>
                  <BoxStyle sx={{ pt: 1, pb: 1 }}>
                    <Box>
                      <Label
                        variant="ghost"
                        color={
                          (status2 === 'Not Done' && 'error') ||
                          (status2 === 'Done' && 'success') ||
                          'warning'
                        }
                      >
                        {status2}
                      </Label>
                      <Typography variant="subtitle2">{description}</Typography>
                    </Box>
                    <StackStyle direction={{ sx: 'column' }} spacing={3}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', pr: 1 }}>
                        {moment(updatedAt).format('ddd DD-MMM-YYYY, hh:mm A')}
                      </Typography>

                      <Popup id={history[0]?._id} color={history[0]?.color}  onClick={handleClick}/>
                    </StackStyle>
                  </BoxStyle>
                </>
              );
            })}

          {isTrue && (
            <DivStyle sx={{ alignItems: 'flex-end', pt: 3 }}>
              <UpdateStatusPopup id={id} onClick={handleClick}  />
            </DivStyle>
          )}
        </DivStyle>
      </Scrollbar>
    </Card>
  );
}
