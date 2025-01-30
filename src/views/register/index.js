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
import logo from '../../assets/LOGO.png';

export default function Register() {
  const navigate = useNavigate();
  const { singUp } = useContext(userContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirm, setCofirm] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password === confirm) {
        await singUp(email, password, name);
        navigate('/login');
      } else {
        alert('Las contraseñas no coinciden');
      }
    } catch (error) {
      console.log(error.message);
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
          Registrar
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: 350 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                fullWidth
                id="name"
                label="Nombre completo"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                name="confirm"
                fullWidth
                id="confirm"
                label="Confirmar contraseña"
                type={'password'}
                onChange={(e) => setCofirm(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            id="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
          >
            Registrar
          </Button>
          <Link
            sx={{ ':hover': { cursor: 'pointer' } }}
            onClick={() => navigate('/login')}
          >
            Ingresar
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
