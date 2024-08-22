import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { addItem } from '../../api/firebase/api';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Visualizer from './components/visualizer';
import useSpeechToText from '../../hooks/useSpeechToText';

export default function Home() {
  const [name, setName] = useState('');
  const [transcription, setTranscription] = useState('');
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
    try {
      addItem({
        name: name,
        transcription: transcription,
      });
      alert('Resumen agregado exitosamente');
    } catch (error) {
      console.log(error);
    }
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
          <IconButton disabled={!isListening} color="primary">
            <PauseCircleIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            type="text"
            helperText="Escribir nombre del paciente"
            placeholder="José Carlos"
            onChange={(e) => setName(e.target.value)}
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
    </Container>
  );
}
