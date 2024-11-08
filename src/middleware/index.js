import serverRequests from './axios-server';

const AWS = {
  uploadAudio: (body) => serverRequests.post('/', body),
  startTranscript: (body) => serverRequests.post('/start', body),
  getSessions: (body) => serverRequests.post('/read', body),
  getTranscript: (body) => serverRequests.post('/get', body),
  getIAText: (body) => serverRequests.post('/model', body),
};

export default AWS;
