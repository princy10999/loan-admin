// material
import { Container, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// components
import Page from '../components/Page';
import AppSingleLead from '../sections/@dashboard/app/AppSingleLead';
import AppSingleStatus from '../sections/@dashboard/app/AppSingleStatus';
import { getResponse } from '../components/API/CommonAPI';

export default function SingleLead() {
  const { id } = useParams();

  const [history, setHistory] = useState([]);

  const TableData = async () => {
    const response = await getResponse(`/user/lead/${id}`, {});
    setHistory(response?.data?.data[0]?.leadHistroy);
  };

  useEffect(() => {
    TableData();
  }, []);
  

  return (
    <Page title="Lead: Single Lead">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          single Lead
        </Typography>
         <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <AppSingleLead title="Lead Details" />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppSingleStatus title="Lead Status" history={history || []} handleClick={TableData} />
          </Grid>
        </Grid>  
      </Container>
    </Page>
  );
}
