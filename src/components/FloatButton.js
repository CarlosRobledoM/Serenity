import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function FloatingActionButtonSize() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
        position: 'absolute',
        bottom: 16,
        right: 16,
      }}
    >
      <Fab color="primary" aria-label="add">
        <SmartToyIcon />
      </Fab>
    </Box>
  );
}
