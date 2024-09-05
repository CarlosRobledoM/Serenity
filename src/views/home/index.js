import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  useTheme,
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

export default function Home() {
  const [name, setName] = useState('');
  const { startTranscript } = AWS;
  const theme = useTheme();
  const { user } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const {
    isRecording,
    startRecording,
    stopRecording,
    downloadRecording,
    containerRef,
    recordedBlob,
  } = useRecordAudio();

  const startStopRecording = async () => {
    isRecording ? stopRecording() : await startRecording();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsCompleted(false);

    const idSession = await addSession(user.uid, {
      name: name,
      transcription: 'La IA está analizando tú información...',
      resume: 'La IA está analizando tú información...',
      date: new Date(),
    });

    const fileName = `${user.uid}-${idSession}`;
    const formData = new FormData();
    const dto_object = new Blob(
      [
        JSON.stringify({
          audioName: fileName,
          user: user.email,
        }),
      ],
      {
        type: 'application/json',
      },
    );
    formData.append('data', dto_object);

    try {
      await downloadRecording(fileName);
      await startTranscript(formData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setName('');
    setIsCompleted(true);
  };

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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {isCompleted ? (
          <>
            <Grid item xs={12}>
              <Box
                style={{
                  width: 250,
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: 20,
                }}
                ref={containerRef}
              ></Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                type="text"
                helperText="Escribir nombre del paciente"
                placeholder="José Carlos"
                onChange={(e) => setName(e.target.value)}
                value={name.length ? name : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <IconButton
                onClick={startStopRecording}
                disabled={isRecording}
                color="primary"
              >
                <PlayCircleIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={startStopRecording}
                disabled={!isRecording}
                color="primary"
              >
                <StopCircleIcon fontSize="large" />
              </IconButton>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={
                  isRecording || name.length == 0 || recordedBlob == null
                }
                color="primary"
              >
                Analizar
                <AddCircleIcon sx={{ ml: 1 }} />
              </Button>
            </Grid>
            <LastResume />
          </>
        ) : (
          <PreLoader loading={isLoading} completed={isCompleted} />
        )}
      </Grid>
    </Container>
  );
}
