import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js';
import AWS from '../../middleware';

const useRecordAudio = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const mediaRecorder = useRef(null);
  const { uploadAudio } = AWS;
  const [isRecording, setIsRecording] = useState(false);
  const [isFinish, setIsFinish] = useState(true);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const initializeWaveSurferWithMicrophone = () => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        height: 200,
        responsive: true,
        plugins: [MicrophonePlugin.create({})],
        progressColor: '#4a74a5',
        waveColor: '#ccc',
        cursorColor: '#4a74a5',
      });
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordedBlob(new Blob([]));
    if (waveformRef.current) {
      waveformRef.current.innerHTML = '';
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.current.addEventListener('dataavailable', (event) => {
          chunks.push(event.data);
        });

        mediaRecorder.current.addEventListener('stop', () => {
          const recordedBlobUpdate = new Blob(chunks, { type: 'audio/mp3' });
          setRecordedBlob(recordedBlobUpdate);
        });

        mediaRecorder.current.start();
        initializeWaveSurferWithMicrophone();
        if (wavesurfer.current) {
          wavesurfer.current?.microphone.start();
        }
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.current?.stop();
    wavesurfer.current?.microphone.stop();
  };

  const playRecording = () => {
    if (recordedBlob && wavesurfer.current) {
      const audioUrl = URL.createObjectURL(recordedBlob);
      wavesurfer.current.load(audioUrl);
      wavesurfer.current.on('ready', () => {
        setIsFinish(false);
        wavesurfer.current?.play();
      });
      wavesurfer.current.on('finish', () => {
        setIsFinish(true);
      });
    }
  };

  useEffect(() => {
    if (wavesurfer.current && recordedBlob) {
      const audioUrl = URL.createObjectURL(recordedBlob);
      wavesurfer.current.load(audioUrl);
    }
  }, [recordedBlob]);

  const StopPlayRecording = () => {
    if (recordedBlob && wavesurfer.current) {
      const audioUrl = URL.createObjectURL(recordedBlob);
      wavesurfer.current.load(audioUrl);
      wavesurfer.current.on('ready', () => {
        wavesurfer.current?.stop();
      });
    }
  };

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
      formData.append('data', 'hola');
      formData.append('file', file, `${fileName}.mp3`);
      const response = await uploadAudio(formData);
      console.log('upload: ', response);
    }
  };

  return {
    isRecording,
    isFinish,
    recordedBlob,
    StopPlayRecording,
    downloadRecording,
    playRecording,
    stopRecording,
    startRecording,
  };
};

export default useRecordAudio;
