import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { addItem } from '../../api/firebase/api';

export default function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      addItem({
        name: name,
        description: description,
        stock: stock,
        price: price,
      });
      alert('Producto agregado exitosamente');
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
        <Typography component="h1" variant="h5">
          Agregar producto
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nombre"
                fullWidth
                id="nombre"
                label="Nombre"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="descripcion"
                fullWidth
                id="descripcion"
                label="Descripción"
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="stock"
                label="Stock"
                name="stock"
                type={'number'}
                onChange={(e) => setStock(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="price"
                label="Precio"
                name="price"
                type={'number'}
                onChange={(e) => setPrice(e.target.value)}
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
            Agregar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
