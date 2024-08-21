import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavbarDrawer from './components/NavbarDrawer';
import logo from '../../assets/LOGO.png';

export default function NavBar({ user, children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            background: `linear-gradient(215deg, rgba(40,22,128,1) 0%, rgba(22,71,127,1) 62%, rgba(255,255,255,1) 100%)`,
          }}
          position="fixed"
        >
          <Toolbar>
            <Box
              component="img"
              src={logo}
              alt="LOGO"
              sx={{
                width: 200,
                height: 'auto',
                cursor: 'pointer',
              }}
            />
            <Box sx={{ flexGrow: 1 }} />
            {user ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <AccountCircleIcon />
              </IconButton>
            ) : (
              <Button
                onClick={() => navigate('/login', { replace: true })}
                color="inherit"
                sx={{ mr: 2 }}
              >
                Login
              </Button>
            )}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <NavbarDrawer open={open} setOpen={setOpen} />
      </Box>
      {children}
    </>
  );
}
