import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ children }) {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              onClick={() => navigate('/', { replace: true })}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
            >
              LOGO
            </Typography>
            <Button
              onClick={() => navigate('/login', { replace: true })}
              color="inherit"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  );
}
