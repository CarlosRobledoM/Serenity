import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import AWS from '../../middleware';
import { useTheme } from '@mui/material';

export const useRecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const containerRef = useRef();
  const waveformRef = useRef();
  const { uploadAudio } = AWS;
  const theme = useTheme();

  useEffect(() => {
    createWaveSurfer();
  }, []);

  // VIEW OF SOUND
  const createWaveSurfer = () => {
    if (waveformRef.current) {
      waveformRef.current.destroy();
    }
    waveformRef.current = WaveSurfer.create({
      container: containerRef.current, //ID DEL HTML CONTENEDOR
      waveColor: theme.palette.primary.light,
      progressColor: theme.palette.primary.dark,
    });
    mediaRecorder.current = waveformRef.current.registerPlugin(
      RecordPlugin.create({ renderRecordedAudio: false }),
    );
    mediaRecorder.current.on('record-end', (blob) => {
      setRecordedBlob(blob);
    });
  };

  // SELECT AND USE MICROPHONE
  const SelectMic = async () => {
    const micOptions = await RecordPlugin.getAvailableAudioDevices();
    console.log('Microfonos:', micOptions[0].deviceId);
    return micOptions[0].deviceId;
  };

  // START RECORD
  const startRecording = async () => {
    setIsRecording(true);
    setRecordedBlob(new Blob([]));
    const deviceId = await SelectMic();
    createWaveSurfer();
    mediaRecorder.current.startRecording({ deviceId });
  };

  // STOP RECORD
  const stopRecording = () => {
    if (
      mediaRecorder.current.isRecording() ||
      mediaRecorder.current.isPaused()
    ) {
      mediaRecorder.current.stopRecording();
      setIsRecording(false);
      return;
    }
  };

  // DOWNLOAD SOUND
  const downloadRecording = async (fileName) => {
    if (recordedBlob) {
      // const downloadLink = document.createElement('a');
      // downloadLink.href = URL.createObjectURL(recordedBlob);
      // downloadLink.download = 'recorded_audio.mp3';
      // downloadLink.click();
      const formData = new FormData();
      const file = new File([recordedBlob], `${fileName}.mp3`, {
        type: 'audio/mp3',
      });
      formData.append('file', file, `${fileName}.mp3`);
      const response = await uploadAudio(formData);
      return response;
    }
  };

  // PAUSE AND CONTINUE SOUND
  const PlayPauseRecording = () => {
    if (mediaRecorder.current.isPaused()) {
      mediaRecorder.current.resumeRecording();
      setIsRecording(true);
      return;
    }
    mediaRecorder.current.pauseRecording();
    setIsRecording(false);
  };

  //TIEMPO DE GRABACIÓN
  const updateProgress = (time) => {
    const formattedTime = [
      Math.floor((time % 3600000) / 60000), // minutes
      Math.floor((time % 60000) / 1000), // seconds
    ]
      .map((v) => (v < 10 ? '0' + v : v))
      .join(':');
  };

  return {
    isRecording,
    downloadRecording,
    stopRecording,
    startRecording,
    containerRef,
    recordedBlob,
    createWaveSurfer,
  };
};
