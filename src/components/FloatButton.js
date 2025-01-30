import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';

export default function FloatingActionButtonSize() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
        position: 'absolute',
        bottom: 16,
        right: 16,
      }}
      onClick={() => {
        window.open(
          'https://api.whatsapp.com/send/?phone=573183975258',
          '_blank',
        );
      }}
    >
      <Fab
        sx={{
          bgcolor: '#25D366',
          '&:hover': { bgcolor: '#25D316' },
        }}
        aria-label="add"
      >
        <WhatsAppIcon sx={{ color: 'white' }} />
      </Fab>
    </Box>
  );
}
