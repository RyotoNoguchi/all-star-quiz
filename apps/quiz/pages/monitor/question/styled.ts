import styled, { keyframes } from 'styled-components';
import Grid, { GridProps } from '@mui/material/Grid';
import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';

export const QuestionContainer = styled(Grid)<GridProps>`
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.1rem 0.1rem 0.1rem #555;
  color: white;
  text-shadow: 3px 3px 0.1rem black;
  font-size: 2rem;
  background-image: linear-gradient(#2d3870, #586dd4);
  margin-bottom: 48px;
  border-radius: 0.5rem;
  position: relative;
`;

export const QuestionBox = styled(Grid)<GridProps>`
margin-bottom: 48px;
`;

export const QuestionMark = styled(Box)<BoxProps>`
position: absolute;
top: -6px;
left: 12px;
font-size: 60px;
font-weight: 900;
color: rgb(121, 184, 252);
text-shadow: 0 0 4px skyblue, 0 -2px #fff;
`;

export const QuestionText = styled(Typography)<TypographyProps>`
  margin: 0;
  line-height: 3rem;
  font-size: 2rem;
`;

export const CountDownCircle = styled(Box)<BoxProps>`
  width: 3.5rem;
  height: 3.5rem;
  font-size: 2.5rem;
  border-radius: 50%;
  margin: 0;
  position: relative;
  right: 8px;
  top: 8px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgb(255, 76, 76), red);
  position: absolute;
  color: white;
  text-shadow: 3px 3px 3px black;
  box-shadow: 1px 1px 1px 1px black;
`;

export const ChoiceBox = styled(Grid)<GridProps>`
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem !important;
  position: relative;
  background-color: rgba(4, 83, 255, 0.797);
  border-radius: 1rem;
`;

const blinkQuestionCell = keyframes`
    to {
      background-image: radial-gradient(rgb(183, 58, 58), rgb(249, 120, 120));
      text-shadow: 2px 2px black;
      color: #e4d039;
    }
`;

type QuestionCellProps = {
  cardProps?: CardProps
  $isCorrect: boolean
}

export const QuestionCell = styled(Card)<QuestionCellProps>`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 2px 2px 2px 2px #5f72d1;
  font-size: 4rem;
  background-image: linear-gradient(#2d3870, #586dd4);
  text-shadow: 2px 2px #555;
  color: white;
  animation: ${(props) => (props.$isCorrect ? blinkQuestionCell : '')} 600ms
    linear 0ms 4 normal forwards;
`;

export const ChoiceText = styled(Typography)<TypographyProps>``;

const blinkCountAnswerBox = keyframes`
    100% {
      background-image: radial-gradient(#e4d039, #fcf4b4);
      text-shadow: 2px 2px black;
      color: rgb(183, 58, 58);
    }
  `;

type CountAnswerBoxProps = {
  boxProps?: BoxProps
  $isCorrect: boolean
}

export const CountAnswerBox = styled(Box)<CountAnswerBoxProps>`
  text-align: right;
  width: 80px;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  font-size: 2.5rem;
  border: 2px solid grey;
  border-radius: 12px;
  line-height: 2.5rem;
  box-shadow: 2px 2px 2px black;
  color: blue;
  text-shadow: 2px 2px #555;
  background-image: linear-gradient(
    to right,
    rgb(125, 138, 255),
    rgb(185, 231, 249)
  );
  animation: ${(props) => (props.$isCorrect ? blinkCountAnswerBox : '')} 600ms
    linear 0ms 4 normal forwards;
`;

export const AnswerCount = styled(Typography)<TypographyProps>`
  font-size: 36px;
  line-height: normal;
  padding: 0;
  margin-right: 10px;
`;
