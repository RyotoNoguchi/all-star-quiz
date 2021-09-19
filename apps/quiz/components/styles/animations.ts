import {keyframes } from 'styled-components';

export const flipRow = keyframes`
  0% {
    transform: rotateX(0)
  }

  100% {
    transform: rotateX(360deg)
  }
`;