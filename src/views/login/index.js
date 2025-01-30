import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { userContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../../assets/LOGO.png';

export default function Login() {
  const navigate = useNavigate();
  const { singIn, logInGoogle } = useContext(userContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await singIn(email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleSingIn = async () => {
    try {
      await logInGoogle();
    } catch (error) {
      console.log(error);
    }
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
        <Box component="img" src={logo} sx={{ mb: 3 }} alt="LOGO" height={50} />
        <Typography color="primary" component="h1" variant="h5">
          Ingresar
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Button
            fullWidth
            id="google"
            variant="outlined"
            color="info"
            onClick={() =>
              window.open('https://home.serenityapp.co/instrucciones-demo')
            }
            sx={{ mb: 3, textTransform: 'none' }}
          >
            <InfoIcon sx={{ mr: 1 }} />
            Instrucciones de uso
          </Button>
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
            Ingresar
          </Button>
          <Button
            fullWidth
            id="google"
            variant="outlined"
            color="info"
            onClick={handleGoogleSingIn}
            sx={{ mb: 3 }}
          >
            <GoogleIcon sx={{ mr: 1 }} />
            Ingresar con Google
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link
              sx={{ ':hover': { cursor: 'pointer' } }}
              onClick={() => navigate('/register')}
            >
              Registrar
            </Link>
            <Link
              sx={{ ':hover': { cursor: 'pointer' } }}
              onClick={() =>
                window.open(
                  'https://home.serenityapp.co/politica-privacidad-de-datos-demo',
                )
              }
            >
              Politica de privacidad
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
