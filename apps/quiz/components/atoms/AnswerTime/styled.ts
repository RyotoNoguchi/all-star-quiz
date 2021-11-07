import styled from 'styled-components';
import Typography, { TypographyProps } from '@mui/material/Typography';
import {
  rankRowTdChildCSS,
  animationDefault,
  blinkAnswerPersonName,
  blinkChampionTypography,
} from '../../styles/animations';

type AnswerTimeTextProps = {
  typographyProps?: TypographyProps;
  $isChangeColorRow: boolean;
  $isChampion: boolean;
};

export const AnswerTimeText = styled(Typography)<AnswerTimeTextProps>`
  ${rankRowTdChildCSS};
  animation: ${(p) => p.$isChangeColorRow && blinkAnswerPersonName};
  animation: ${(p) =>
    p.$isChangeColorRow && p.$isChampion && blinkChampionTypography};
  ${animationDefault};
`;
