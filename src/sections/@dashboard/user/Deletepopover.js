import * as React from 'react';

// @mui
import { Stack, Box, Modal, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
// components
import Iconify from '../../../components/Iconify';
import { deleteResponse } from '../../../components/API/CommonAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export default function BasicModal({ item, reCallFun }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteLead = async () => {
    const response = await deleteResponse(`/user/lead/${item}`, {});
    if (response.status === 200) {
      // setTimeout(() => toast('Lead success fully deleted'), 10);
    }
  };

  const refreshPage = () => {
    setTimeout(() => window.location.reload(false), 100);
  };

  return (
    <div>
      <Stack onClick={handleOpen} direction={{ sx: 'row' }}>
        <Iconify icon="fluent:delete-12-filled" sx={{ color: 'text.secondary' }} width={24} height={24} />
        <Typography sx={{ color: 'text.secondary', pl: 1 }}> delete</Typography>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            Are you sure you want to delete lead?
          </Typography>
          <Stack direction={{ sx: 'row', display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                handleClose();
                deleteLead();
                reCallFun(1);
                
              }}
            >
              yes
            </Button>
            <Button onClick={handleClose}> no </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
