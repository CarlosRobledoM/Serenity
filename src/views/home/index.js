import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  useTheme,
  Select,
  MenuItem,
  Typography,
  Card,
} from '@mui/material';
import { addSession } from '../../api/firebase/api';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Visualizer from './components/visualizer';
import PreLoader from '../../components/PreLoader';
import { userContext } from '../../context/authContext';
import LastResume from '../../components/LastResume';
import AWS from '../../middleware';
import { useRecordAudio } from '../../hooks/useRecordAudio';
import './style.css';

export default function Home() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const { startTranscript, uploadAudio } = AWS;
  const theme = useTheme();
  const { user } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  // const {
  //   isRecording,
  //   startRecording,
  //   stopRecording,
  //   downloadRecording,
  //   containerRef,
  //   recordedBlob,
  // } = useRecordAudio();

  // const aboutOptions = [
  //   'Terapia cognitivo conductual',
  //   'Psicoanálisis',
  //   'Humanista',
  //   'Terapia dialéctica conductual',
  //   'Terapia Gestal',
  //   'Terapia de aceptación y compromiso',
  //   'Psicología Positiva',
  //   'Terapias Basadas en la Compasión',
  //   'Terapia Sistémica y Relacional',
  //   'Psicología Transpersonal',
  // ];

  // const startStopRecording = async () => {
  //   isRecording ? stopRecording() : await startRecording();
  // };

  // const handleChangeAbout = (event) => {
  //   setAbout(event.target.value);
  // };

  // const handleSubmit = async () => {
  //   setIsLoading(true);
  //   setIsCompleted(false);

  //   const idSession = await addSession(user.uid, {
  //     name: name,
  //     transcription: 'La IA está analizando tú información...',
  //     resume: 'La IA está analizando tú información...',
  //     focus: about,
  //     date: new Date(),
  //   });

  //   const fileName = `${user.uid}-${idSession}`;
  //   const formData = new FormData();
  //   const dto_object = new Blob(
  //     [
  //       JSON.stringify({
  //         audioName: fileName,
  //         user: user.email,
  //       }),
  //     ],
  //     {
  //       type: 'application/json',
  //     },
  //   );
  //   formData.append('data', dto_object);

  //   try {
  //     const response = await uploadAudio(formData);
  //     await downloadRecording(response.preSignedUrl, fileName);
  //     await startTranscript(formData);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setName('');
  //   setIsCompleted(true);
  // };

  return (
    <Container
      sx={{
        height: '100%',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ul className="background">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Card
            elevation={10}
            sx={{
              maxWidth: { xs: '100%', md: '50%' },
              p: 4,
              boxShadow: '0px 0px 20px 0px #000',
              maxHeight: '100vh',
              overflowY: 'auto',
            }}
          >
            {isCompleted ? (
              <>
                <Typography variant="h6">
                  ¡La nueva versión 1.5 ya está aquí!
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <br />
                  Organiza las sesiones por pacientes, una IA más inteligente,
                  captura sesiones virtuales y más funciones útiles para ti.
                  <br /> <br /> Solicitar una demostración:
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.open(
                      'https://api.whatsapp.com/send/?phone=573183975258',
                      '_blank',
                    );
                  }}
                >
                  Ir ahora
                </Button>
                <LastResume />
              </>
            ) : (
              <PreLoader loading={isLoading} completed={isCompleted} />
            )}
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
