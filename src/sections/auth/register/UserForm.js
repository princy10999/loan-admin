import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'yup-phone-lite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, MenuItem, Typography, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { postResponse, getResponse, putResponse } from '../../../components/API/CommonAPI';

// ----------------------------------------------------------------------

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [singleData, setSingleData] = useState({});

  const [tableData, setTableData] = useState([]);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('First name a required field'),
    email: Yup.string().email('Email must be a valid email address').required('Email is a required field'),
    password: Yup.string().required('Password is a required field'),
    phoneNumber: Yup.string().phone('IN').required('PhoneNumber is a required field'),
    birthDate: Yup.date().nullable('Number only ').required('Date a required field'),
    address: Yup.string().required('Address a required field'),
    locatedArea: Yup.string().required('locatedArea Name is a required field'),
    userRole: Yup.string().required('userRole is a required field'),
    dateOfJoining: Yup.date().nullable('Number only ').required('joiningDate is a required field'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthDate: '',
    address: '',
    locatedArea: '',
    userRole: '',
    dateOfJoining: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (id) {
      SingleData();
    }
    TableData();
  }, []);

  useEffect(() => {
    reset(singleData);
  }, [singleData]);

  const SingleData = async () => {
    const response = await getResponse(`/user/user/${id}`, {});
    const res = await response?.data?.data?.userData;
    res.birthDate = moment(res?.birthDate).format('yyyy-MM-DD');
    res.dateOfJoining = moment(res?.dateOfJoining).format('yyyy-MM-DD');
    setSingleData(res);
  };

  const TableData = async () => {
    const response = await getResponse('/user/userRole', {});
    setTableData(...tableData, response?.data?.data);
  };

  const onSubmit = async (values) => {
    const response = !id
      ? await postResponse(`/user/user`, {
          name: values.name,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
          birthDate: new Date(moment(values.dateOfBirth).format('yyyy-MM-DD')),
          address: values.address,
          locatedArea: values.locatedArea,
          userRole: values.userRole,
          dateOfJoining: new Date(values.dateOfJoining).toLocaleDateString('fr-CA'),
        })
      : await putResponse('/user/user', {
          id: values._id,
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          birthDate: new Date(moment(values.dateOfBirth).format('yyyy-MM-DD')),
          address: values.address,
          locatedArea: values.locatedArea,
          dateOfJoining: new Date(values.dateOfJoining).toLocaleDateString('fr-CA'),
        });
    if (response.status === 200) {
      toast(!id ? 'Add User success fully' : 'Update User success fully');
      reset(formState);
      navigate(`/dashboard/user`);
      await SingleData();
    }
  };

  const notify = () => toast;

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {!id ? 'Add' : 'Update'} User
      </Typography>
      <Grid spacing={3}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="name" label=" Full Name" />
              <RHFTextField name="birthDate" label="Date of Birth" type="date" />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="email" label=" Email address" />
              <RHFTextField name="password" label="Password" />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="phoneNumber" label="PhoneNumber" type="number" />
              <RHFTextField name="address" label="Address" />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="dateOfJoining" label="Date of joining" type="date" />
              <RHFTextField name="locatedArea" label="Located Area" />
              <RHFTextField name="userRole" label="User Role" select>
                {tableData &&
                  tableData
                    .filter((item) => item?.code === 1)
                    .map((option) => (
                      <MenuItem key={option?._id} value={option?.code}>
                        {option?.role}
                      </MenuItem>
                    ))}
              </RHFTextField>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              {!id ? 'Add' : 'Update'} User
            </LoadingButton>
            <ToastContainer pauseOnFocusLoss pauseOnHover={false} />
          </Stack>
        </FormProvider>
      </Grid>
    </>
  );
}
