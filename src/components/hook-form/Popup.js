import { useState, useEffect } from 'react';
import * as React from 'react';
// import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack, Button, Fade, Modal, Box, MenuItem, Backdrop } from '@mui/material';

import Iconify from '../Iconify';
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

// eslint-disable-next-line react/prop-types
export default function TransitionsModal({ id, color, onClick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tableData, setTableData] = useState([]);

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
    const response = await putResponse('/user/leadHistroy', {
      id,
      status: event.status,
      description: event.description,
      color,
    });
    if (response?.status === 200) {
      onClick();
    }
  };

  useEffect(() => {
    TableData();
  }, []);

  const TableData = async () => {
    const response = await getResponse('/user/status', {});
    setTableData(...tableData, response?.data?.data);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <Iconify icon="dashicons:edit-page" sx={{ color: 'text.secondary', width: 21, height: 21 }} />
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
                    {tableData.map((option) => (
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
