import { css, keyframes } from 'styled-components';

export const flipRow = keyframes`
  0% {
    transform: rotateX(0)
  }

  100% {
    transform: rotateX(360deg)
  }
`;

export const blinkAnswerPersonNameBox = keyframes`
100% {
  background-image: radial-gradient(rgb(250, 133, 240),rgb(254, 207, 255));
}
`;

export const blinkAnswerPersonName = keyframes`
100% {
  text-shadow: 2px 2px 2px black, -1px -1px 1px black;
  color: rgb(254, 0, 0);
}
`;

export const blinkRank = keyframes`
100% {
  background-image: radial-gradient(rgb(252, 61, 230),rgb(251, 214, 252));
  box-shadow: 2px 2px 2px rgb(232, 117, 255), -1px -1px 1px rgb(232, 117, 255);
  text-shadow: 2px 2px 2px black, -1px -1px 1px black;
  color: rgb(254, 0, 0);
}
`;

export const animationDefault = css`
animation-delay: 4.8s;
animation-duration: 500ms;
animation-timing-function: linear;
animation-iteration-count: 6;
animation-fill-mode: forwards;
`;

export const rankRowChild = css`
font-family: 'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic ProN';
font-weight: 900;
text-shadow: 4px 4px 4px white, -4px -4px 4px white;
padding: 4px 4px 4px 10px;
display: flex;
align-items: center;
line-height: 1.25;
border: 2px solid blue;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
background-image: radial-gradient(#2d3870, #586dd4);
box-shadow: 2px 2px 2px rgb(63, 63, 63), -2px -2px 2px rgb(63, 63, 63);
`;

export const rankRowTdChildCSS = css`
font-size: 45px;
color: rgb(243, 249, 132);
text-shadow: 2px 2px 2px lightslategray, -2px -2px 2px lightslategray;
`;
