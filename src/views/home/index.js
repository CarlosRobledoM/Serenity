import React, { useContext, useState } from 'react';
import { Button, Container, Grid, IconButton, TextField } from '@mui/material';
import { addItem } from '../../api/firebase/api';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Visualizer from './components/visualizer';
import useSpeechToText from '../../hooks/useSpeechToText';
import PreLoader from '../../components/PreLoader';
import { userContext } from '../../context/authContext';
import LastResume from '../../components/LastResume';

export default function Home() {
  const [name, setName] = useState('');
  const { user } = useContext(userContext);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setTranscription(
      (prevVal) =>
        prevVal +
        (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''),
    );
    stopListening();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCompleted(false);
    setIsLoading(true);
    try {
      addItem(user.email, {
        name: name,
        transcription: transcription,
        date: new Date(),
      });
      setName('');
      setTranscription('');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setIsCompleted(true);
  };

  return (
    <>
      {isCompleted ? (
        <Container>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              {/* <Visualizer /> */}
            </Grid>
            <Grid item xs={12}>
              <IconButton
                onClick={startStopListening}
                disabled={isListening}
                color="primary"
              >
                <PlayCircleIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={startStopListening}
                disabled={!isListening}
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
              <TextField
                multiline
                label="Transcripción de texto"
                type="text"
                rows={3}
                sx={{
                  width: 400,
                }}
                value={
                  isListening
                    ? transcription +
                      (transcript.length
                        ? (transcription.length ? ' ' : '') + transcript
                        : '')
                    : transcription
                }
                onChange={(e) => {
                  setTranscription(e.target.value);
                }}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={isListening}
                color="primary"
              >
                Agregar
                <AddCircleIcon sx={{ ml: 1 }} />
              </Button>
            </Grid>
          </Grid>
          <LastResume />
        </Container>
      ) : (
        <PreLoader loading={isLoading} completed={isCompleted} />
      )}
    </>
  );
}
