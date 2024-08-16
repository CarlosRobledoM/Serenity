import React from 'react';
import { Grid } from '@mui/material';
import NavBar from './navbar';

export default function Layout({ children }) {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
      }}
    >
      <NavBar />
      {children}
    </Grid>
  );
}
