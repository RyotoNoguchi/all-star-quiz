import styled from 'styled-components';
import Box, { BoxProps } from '@mui/material/Box'
import Container, { ContainerProps } from '@mui/material/Container'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { colors } from '../colors';

export const ClientContainer = styled(Container)<ContainerProps>``;

export const TopTitle = styled(Typography)<TypographyProps>`
font-family: 'Dela Gothic One', cursive;
font-size: 2rem;
font-weight: 400;
`;

export const TopTitlePart = styled(Box)<BoxProps>`
display: inline-block;
position: relative;
background-clip: border-box;
background: linear-gradient(
  ${colors.titleOrange},
  ${colors.titleYellow},
  ${colors.titleOrange}
);
-webkit-background-clip: text; //テキストでくり抜く
-webkit-text-fill-color: transparent; //くり抜いた部分は背景を表示
&::after {
  background: none;
  content: attr(data-text);
  left: 0;
  position: absolute;
  text-shadow: 6px 6px 1px ${colors.titlePurple},
    -6px -6px 1px ${colors.titlePurple};
  top: 0;
  z-index: -1;
}
`;

export const StyledBox = styled(Box)<BoxProps>`
  text-align: center;
  margin-top: 50px;
`;

type AnswerCheckProps = {
  typographyProps?: TypographyProps
  $isCorrect: boolean
}

export const AnswerCheckIcon = styled(Typography)<AnswerCheckProps>`
  color: ${(p) => (p.$isCorrect ? 'red' : 'blue')};
  font-weight: bold;
  font-size: ${(p) => (p.$isCorrect ? '400px' : '800px')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;