import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { userContext } from '../context/authContext';
import NavBar from './navbar';
import Forms from './forms';
import FloatingActionButtonSize from '../components/FloatButton';

export default function Layout({ children }) {
  const { user } = useContext(userContext);
  return (
    <Grid
      container={user ? true : false}
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {user ? <NavBar user={user} /> : <Forms />}
      {children}
      <FloatingActionButtonSize />
    </Grid>
  );
}
