import React, { useContext, useState } from 'react';
import { Button, Container, Grid, IconButton, TextField } from '@mui/material';
import { addItem } from '../../api/firebase/api';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Visualizer from './components/visualizer';
import PreLoader from '../../components/PreLoader';
import { userContext } from '../../context/authContext';
import LastResume from '../../components/LastResume';
import AWS from '../../middleware';
import useRecordAudio from '../../hooks/useRecordAudio';

export default function Home() {
  const [name, setName] = useState('');
  const { getIAText, startTranscript, getTranscript } = AWS;
  const { user } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const { isRecording, startRecording, stopRecording, downloadRecording } =
    useRecordAudio();

  const startStopRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsCompleted(false);
    const fileName = `${user.email.split('@')[0]}-${name.replace(' ', '_')}`;
    try {
      await downloadRecording(fileName);
      const transcriptJob = await startTranscript({ audioName: fileName });
      if (transcriptJob.status === 'IN_PROGRESS') {
        await sleep(5000);
        const updateStatus = await getTranscript({ audioName: fileName });
        if (updateStatus.status === 'COMPLETED') {
          const textIA = await getIAText({ audioName: fileName });
          addItem(user.email, {
            name: name,
            transcription: textIA?.transcription,
            resume: textIA?.resume[0]?.text,
            date: new Date(),
          });
        } else {
          addItem(user.email, {
            name: name,
            transcription: 'La IA está analizando tú información...',
            resume: 'La IA está analizando tú información...',
            date: new Date(),
          });
        }
      } else {
        console.log('no se creo la solicitud de transcripción');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setName('');
    setIsCompleted(true);
  };

  return (
    <Container>
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
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={isRecording}
                color="primary"
              >
                Agregar
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
