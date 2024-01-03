import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, Typography } from '@mui/material';
import {  styled } from '@mui/material/styles';
// components
import { BaseOptionChart } from '../../../components/chart';

const DRAWER_WIDTH = 301;
const TABES_WIDTH = 273;
// ----------------------------------------------------------------------
const CardStyle = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minHeight: TABES_WIDTH,
  },
  [theme.breakpoints.up('md')]: {
    minHeight: DRAWER_WIDTH,
  },
}));
AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  color: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  sx: PropTypes.object,
  subtitle1: PropTypes.string,
};
const CardFlexStyle = styled('div')(() => ({
  display: 'flex',
  justifyContent:'space-between',
  alignItems: 'center',
}));


export default function AppWebsiteVisits({ title, subtitle1, sx, chartLabels, chartData , color = 'primary', ...other }) {
 
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
   
    labels: chartLabels,
    xaxis: { 
    type: 'datetime',
    show: false,
    labels: {
      show: false,
    }, },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
     
    },
 
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <CardStyle {...other} sx={{
      boxShadow: 0,
      textAlign: 'center',
      color: (theme) => theme.palette[color].darker,
      bgcolor: (theme) => theme.palette[color].lighter,
      ...sx,
    }}>
  
      <Box sx={{ p: 2, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={158} />
      </Box>
      <CardFlexStyle>
      <CardHeader title={title}  sx={{ p: 1.5, pb: 1 }}/>
      <Typography   sx={{ p:1.5, pb: 1 }} >{subtitle1}</Typography>
      </CardFlexStyle>
    </CardStyle>
  );
}
