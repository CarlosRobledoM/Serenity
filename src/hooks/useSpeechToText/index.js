import React, { useEffect, useRef, useState } from 'react';

const useSpeechToText = (options) => {
  const [isListening, setisListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recongnitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Web speech api is not suportted.');
      return;
    }

    recongnitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recongnitionRef.current;
    recognition.interimResutls = options.interimResutls || true;
    recognition.lang = options.lang || 'es-Es';
    recognition.continuous = options.continuous || false;

    if ('webkitSpeechGrammarList' in window) {
      const grammar =
        '#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;';
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setisListening(false);
      setTranscript('');
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recongnitionRef.current && !isListening) {
      recongnitionRef.current.start();
      setisListening(true);
    }
  };

  const stopListening = () => {
    if (recongnitionRef.current && isListening) {
      recongnitionRef.current.stop();
      setisListening(false);
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};

export default useSpeechToText;
