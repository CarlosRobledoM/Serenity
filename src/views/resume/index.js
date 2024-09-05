import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function Resume() {
  const location = useLocation();
  const { itemData } = location.state;
  const theme = useTheme();

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3">{itemData?.name}</Typography>
        <Box
          sx={{
            borderRadius: 5,
            boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
            p: theme.spacing(4, 6),
            my: 2,
          }}
        >
          {itemData?.resume.toString() ===
          'La IA está analizando tú información...' ? (
            <Typography>{itemData?.resume}</Typography>
          ) : (
            <td
              dangerouslySetInnerHTML={{ __html: itemData?.resume.toString() }}
            />
          )}
        </Box>
        {/* <Typography variant="h4">Grabación de sesión</Typography>
        <Box
          sx={{
            borderRadius: 5,
            boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
            p: theme.spacing(2, 4),
            my: 4,
          }}
        >
          <Typography>{itemData?.transcription}</Typography>
        </Box>
        <Typography variant="h4">Recomendación generada</Typography>
        <Box
          sx={{
            borderRadius: 5,
            boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
            p: theme.spacing(2, 4),
            my: 4,
          }}
        >
          <Typography>{itemData?.recommendation}</Typography>
        </Box> */}
      </Grid>
    </Container>
  );
}
