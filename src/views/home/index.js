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
  const [about, setAbout] = useState('');
  const { startTranscript, uploadAudio } = AWS;
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

  const aboutOptions = [
    'Terapia cognitivo conductual',
    'Psicoanálisis',
    'Humanista',
    'Terapia conductual dialéctica',
    'Terapia Gestal',
    'Terapia de aceptación y compromiso',
    'Psicología Positiva',
    'Terapias Basadas en la Compasión',
    'Terapia Sistémica y Relacional',
    'Psicología Transpersonal',
  ];

  const startStopRecording = async () => {
    isRecording ? stopRecording() : await startRecording();
  };

  const handleChangeAbout = (event) => {
    setAbout(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsCompleted(false);

    const idSession = await addSession(user.uid, {
      name: name,
      transcription: 'La IA está analizando tú información...',
      resume: 'La IA está analizando tú información...',
      focus: about,
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
      const response = await uploadAudio(formData);
      await downloadRecording(response.preSignedUrl, fileName);
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
              <Select
                size="small"
                id="bank"
                value={about ? about : 'default'}
                onChange={handleChangeAbout}
                input={<TextField label="Enfoque" fullWidth select={true} />}
              >
                <MenuItem autoFocus disabled value="default">
                  Seleccione un enfoque
                </MenuItem>
                {aboutOptions.length
                  ? aboutOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Nombre"
                fullWidth
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
