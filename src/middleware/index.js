import serverRequests from './axios-server';

const AWS = {
  uploadAudio: (body) => serverRequests.post('/upload', body),
  startTranscript: (body) => serverRequests.post('/start', body),
  getTranscript: (body) => serverRequests.post('/get', body),
  getIAText: (body) => serverRequests.post('/model', body),
};

export default AWS;
