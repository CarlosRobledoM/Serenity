import React, { useContext } from 'react';
import { Box } from '@mui/material';
import image from '../../assets/forms.jpg';

export default function Forms() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: { xs: '0vw', md: '100vw' },
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'cover',
      }}
    />
  );
}
