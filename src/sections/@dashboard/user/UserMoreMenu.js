import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import Deletepopover from './Deletepopover';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ item, reCallFun }) {
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
        <MenuItem sx={{ color: 'text.secondary' ,width:'100%' }}>
          <Deletepopover item={item}  reCallFun={()=>reCallFun()}/>
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.secondary',width:'100%' }}
          onClick={() => {
            navigate(`/dashboard/add-lead/${item}`);
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
