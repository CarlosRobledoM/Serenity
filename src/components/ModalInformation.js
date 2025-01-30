import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="primary"
            variant="h6"
            component="h2"
          >
            <WarningAmberIcon sx={{ mr: 1 }} color="warning" />
            Oye!
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            🚀 ¡Grandes noticias! Pronto lanzaremos Serenity 1.5. 🔥
            <br />
            <br />
            Recuerda que esta es una versión de prueba y pronto será
            deshabilitada. Mientras tanto, sigue explorando nuestra plataforma y
            prepárate para lo que viene. ¡Lo mejor está por llegar! ✨💡{' '}
            <a
              href="https://home.serenityapp.co/instrucciones-demo"
              target="_blank"
              rel="noreferrer"
            >
              Instrucciones.
            </a>
          </Typography>
          <Button variant="contained" onClick={handleClose}>
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
