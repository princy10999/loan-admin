import { useState, useEffect } from 'react';
import * as React from 'react';
import * as Yup from 'yup';
import 'yup-phone-lite';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack, Button, Fade, Modal, Box, MenuItem, Backdrop } from '@mui/material';

import FormProvider from './FormProvider';
import RHFTextField from './RHFTextField';
import { getResponse, putResponse } from '../API/CommonAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export default function TransitionsModal({ id, onClick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [statusData, setStatusData] = useState([]);

  const RegisterSchema = Yup.object().shape({
    status: Yup.string().required('status required'),
    description: Yup.string().required('description required'),
  });
  const defaultValues = {
    status: '',
    description: '',
  };
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (event) => {
    const response = await putResponse('/user/lead', {
      id,
      status: event.status,
      description: event.description,
    });
    if (response?.status === 200) {
      console.log(response, 'STATUS UPDATE');
      onClick();
    }
  };

  const StatusData = async () => {
    const response = await getResponse('/user/status', {});
    setStatusData(...statusData, response?.data?.data);
  };

  useEffect(() => {
    StatusData();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} size="medium" variant="contained" sx={{ width: 150 }}>
        Update Status
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <RHFTextField name="status" label="Status" select>
                    {statusData.map((option) => (
                      <MenuItem key={option?._id} value={option?.code}>
                        {option?.name}
                      </MenuItem>
                    ))}
                  </RHFTextField>
                  <RHFTextField name="description" label="Description" />
                </Stack>

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                  }}
                  loading={isSubmitting}
                >
                  Update Status
                </Button>
              </Stack>
            </FormProvider>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
