import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import { userContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { getSessions } from '../../../api/firebase/api';

//-----------------------------------------------------------

export default function NavbarDrawer({ open, setOpen }) {
  const { user, logOut } = useContext(userContext);
  const navigate = useNavigate();

  const obtainItem = async () => {
    const response = await getSessions(user.uid);
    const lastResume = response.reduce((previous, current) => {
      return current.date.seconds > previous.date.seconds ? current : previous;
    });
    navigate('/resume', { state: { itemData: lastResume } });
    setOpen(false);
  };

  const options = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      action: () => {
        navigate('/');
        setOpen(false);
      },
    },
    {
      text: 'Ultima consulta',
      icon: <InboxIcon />,
      action: obtainItem,
    },
    {
      text: 'Historial',
      icon: <HistoryIcon />,
      action: () => {
        navigate('/history');
        setOpen(false);
      },
    },
    {
      text: 'Contacto',
      icon: <MailIcon />,
      action: () => {
        setOpen(false);
      },
    },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {options.map((option) => (
          <ListItem key={option.text} disablePadding onClick={option.action}>
            <ListItemButton>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem key="close" disablePadding onClick={handleLogout}>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      {DrawerList}
    </Drawer>
  );
}
