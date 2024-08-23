import React from 'react';
import Lottie from 'react-lottie';
import * as load from '../assets/LOAD.json';
import * as success from '../assets/SUCCES.json';
import { Container } from '@mui/material';

//-----------------------------------------------------

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: load.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

//-----------------------------------------------------

export default function PreLoader({ completed, loading }) {
  return (
    <Container>
      {!completed ? (
        <>
          {loading ? (
            <Lottie options={defaultOptions1} height={300} width={300} />
          ) : (
            <Lottie options={defaultOptions2} height={300} width={300} />
          )}
        </>
      ) : null}
    </Container>
  );
}
