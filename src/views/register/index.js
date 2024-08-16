import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { userContext } from '../../context/authContext';

export default function Registrar() {
  const { user, singUp } = useContext(userContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRegister, setRegister] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setRegister({
      email: email,
      password: password,
    });
    singUp(email, password);
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                fullWidth
                id="password"
                label="Contraseña"
                type={'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            id="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
