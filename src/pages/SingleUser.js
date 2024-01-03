import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Typography, Grid } from '@mui/material';
// components
import Page from '../components/Page';
// import { AppOrderTimeline } from '../sections/@dashboard/app';
import AppSingleUser from '../sections/@dashboard/app/AppUserdata';
import UserData from '../sections/@dashboard/user/Userdata';
import UserSingleTable from '../sections/@dashboard/user/UserSingleTable'
import { getResponse } from '../components/API/CommonAPI';

export default function SingleUser() {
  const { id } = useParams();
  const [tableData, setTableData] = useState([]);

  const TableData = async () => {
    const response = await getResponse(`/user/user/${id}`, {});
    const res = await response?.data?.data;
    setTableData(res);
  };

  useEffect(() => {
    TableData();
  }, []);

  console.log(tableData, "tableData");

  return (
    <Page title="User: Single User">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          single User
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <AppSingleUser title="User Details"  tableData={tableData}/>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <UserData title="User Details" tableData={tableData} />
          </Grid>
        </Grid>
        <UserSingleTable tableData={tableData}/>
      </Container>
    </Page>
  );
}
