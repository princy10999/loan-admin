import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import 'yup-phone-lite';
import moment from 'moment';
// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  MenuItem,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { postResponse, getResponse, putResponse } from '../../../components/API/CommonAPI';
import AppSingleStatus from '../../@dashboard/app/AppSingleStatus';

// ----------------------------------------------------------------------

export default function LeadForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [occupationName, setOccupationName] = useState('1');
  const [userName, setUserName] = useState([]);

  const [tableData, setTableData] = useState([]);

  const [singleData, setSingleData] = useState({});

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('First name is a required field'),
    bank: Yup.string().required('Bank name is a required field'),
    loanAmount: Yup.number('Number only')
      .required('loneAmount is a required field')
      .positive('loneAmount must be positive')
      .integer(),
    date: Yup.date().nullable('Number only ').required('Date is a required field'),
    time: Yup.string().required('Time is a required field'),
    address: Yup.string().required('Address is a required field'),
    phoneNumber: Yup.string().phone('IN').required('PhoneNumber is a required field'),
    status: Yup.string().required('Status is a required field'),
    description: Yup.string().required('Description is a required field'),
  });

  const defaultValues = {
    name: '',
    occupation: '',
    bank: '',
    loanAmount: '',
    topup: '',
    date: '',
    time: '',
    address: '',
    leadBy: '',
    ReminderDate: '',
    ReminderTime: '',
    phoneNumber: '',
    status: '',
    description: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitting, errors },
  } = methods;
  console.log('error', errors);

  useEffect(() => {
    Username();
    TableData();
  }, []);

  useEffect(() => {
    // setTimeout(() => SingleData(), 10)
    if (id) {
      SingleData();
    }
  }, []);

  useEffect(() => {
    reset(singleData);
  }, [singleData, reset]);

  const SingleData = async () => {
    const response = await getResponse(`/user/lead/${id}`, {});
    const res = await response?.data?.data[0];
    if (res?.ReminderDate) {
      res.ReminderDate = moment(res?.ReminderDate).format('yyyy-MM-DD');
    }
    res.date = moment(res?.date).format('yyyy-MM-DD');
    setSingleData(res);
    setOccupationName(res?.occupation);
  };
  const TableData = async () => {
    const response = await getResponse('/user/status', {});
    setTableData(response?.data?.data);
  };

  const Username = async () => {
    const response = await getResponse('/user/user', {});
    setUserName(response?.data?.data);
  };
  const onSubmit = async (values) => {
    console.log('submit', typeof occupationName);
    const body = {
      name: values.name,
      occupation: JSON.parse(occupationName),
      bank: values.bank,
      loanAmount: values.loanAmount,
      date: new Date(values.date).toLocaleDateString('fr-CA'),
      time: values.time,
      address: values.address,
      phoneNumber: values.phoneNumber,
      status: values.status,
      description: values.description,
    };
    if (values.topup) {
      body.topup = values.topup;
    }
    if (values.leadBy) {
      body.leadBy = values.leadBy;
    }
    console.log(values?.ReminderDate, 'sdghkjek');
    if (values.ReminderDate) {
      body.ReminderDate = new Date(values.ReminderDate).toLocaleDateString('fr-CA');
    }
    if (values.ReminderTime) body.ReminderTime = values.ReminderTime;
    if (id) {
      body.id = values._id;
    }

    const response = !id ? await postResponse(`/user/lead`, body) : await putResponse('/user/lead', body);

    if (response.status === 200) {
      console.log(response, 'good');
      toast(!id ? 'Add Lead success fully add!' : 'Update Lead success fully add!');
      reset(formState);
      navigate(`/dashboard/lead`);
      await SingleData();
    }
  };

  const handleChange = (event) => {
    setOccupationName(event.target.value);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {!id ? 'Add' : 'Update'} Lead
      </Typography>

      <Grid spacing={3}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="name" label="Name" sx={{ width: '80%' }} />
              <FormControl name="occupation" value={occupationName}>
                <FormLabel id="demo-controlled-radio-buttons-group">Occupation</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="occupation"
                  value={occupationName}
                  onChange={handleChange}
                  sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Job" />
                  <FormControlLabel value="0" control={<Radio />} label="Business" />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="bank" label="Bank Name" />
              <RHFTextField name="loanAmount" label="Lone Amount" type="number" />
              <RHFTextField name="topup" label="Top Up Amount " type="number" />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="date" type="date" label="Date" />
              <RHFTextField name="time" label="Time" type="time" defaultValue="07:30" />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="leadBy" label="Salesman Name" select>
                {userName.map((option) => (
                  <MenuItem key={option?._id} value={option?._id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </RHFTextField>
              <RHFTextField name="phoneNumber" label="Mobile Number" type="number" />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="ReminderDate" label="Reminder Date" type="date" />
              <RHFTextField name="ReminderTime" label="Reminder Time" type="time" />
            </Stack>
            {id && (
              <>
                <Grid item xs={12} md={6} lg={6}>
                  <AppSingleStatus title="Lead Status" history={singleData?.leadHistroy || []} />
                </Grid>
              </>
            )}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="status" label="status" select>
                {tableData.map((option) => (
                  <MenuItem key={option?._id} value={option?.code}>
                    {option?.name}
                  </MenuItem>
                ))}
              </RHFTextField>
              <RHFTextField name="description" label="Description" />
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              {!id ? 'Add New' : 'Update'} Lead
            </LoadingButton>
            <ToastContainer />
          </Stack>
        </FormProvider>
      </Grid>
    </>
  );
}
