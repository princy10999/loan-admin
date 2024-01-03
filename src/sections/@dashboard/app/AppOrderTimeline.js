// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent, Box } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
import {  styled } from '@mui/material/styles';
// utils
import { fMin } from '../../../utils/formatTime';
// components
// import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </Timeline>
      
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    type: PropTypes.string,
  }),
};

const DIV = styled('div')(() => ({
  display: 'flex',
  justifyContent:'space-between',
  alignItems: 'center',
}));

function OrderItem({ item, isLast }) {
  const { type, title, time ,subtitle} = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
      <DIV>
      <Box>
        <Typography variant="subtitle2"  color={
            (title === '#45763' && 'primary') ||
            (title === '#45762' && 'success') ||
            (title === '#45764' && 'info') ||
            (title === '#45766' && 'warning') ||
            'error'}>{title}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
</Box>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fMin(time)} min
        </Typography>
        </DIV>
      </TimelineContent>
    </TimelineItem>
  );
}
