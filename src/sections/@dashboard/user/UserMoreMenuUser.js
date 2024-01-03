import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// import { deleteResponse } from '../../../components/API/CommonAPI';
import DeletePopoverUser from './DeletePopoverUser';

// ----------------------------------------------------------------------

export default function UserMoreMenuUser({ item,reCallFun }) {
  const navigate = useNavigate();

 
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <DeletePopoverUser item={item} reCallFun={()=>reCallFun()} />
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            navigate(`/dashboard/add-user/${item}`);
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

       
      </Menu>
    </>
  );
}
