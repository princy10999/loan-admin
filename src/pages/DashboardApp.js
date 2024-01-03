import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppWebsiteVisits } from '../sections/@dashboard/app';
import { getResponse } from '../components/API/CommonAPI';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    TableData();
  }, []);

  const TableData = async () => {
    const response = await getResponse('/user/dashboard', {});
    setTableData(...tableData, response?.data?.data);
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWebsiteVisits
              color="primary"
              title="Total Leads"
              subtitle1={[tableData?.totalRes]}
              chartLabels={['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003']}
              chartData={[
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWebsiteVisits
              color="info"
              title="Total Done Leads"
              subtitle1={[tableData?.totalCom]}
              chartLabels={['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003']}
              chartData={[
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWebsiteVisits
              color="warning"
              title="Total Pending Leads"
              subtitle1={[tableData?.totalProcess]}
              chartLabels={['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003']}
              chartData={[
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30],
                },
              ]}
              chartColors={[theme.palette.primary.main]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWebsiteVisits
              color="error"
              title="Total Notdone Leads"
              subtitle1={[tableData?.totalPending]}
              chartLabels={['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003']}
              chartData={[
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
