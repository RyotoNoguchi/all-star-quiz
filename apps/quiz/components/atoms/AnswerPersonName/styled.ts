import styled from 'styled-components';
import { rankRowTdChildCSS, blinkAnswerPersonName, animationDefault, blinkChampionTypography} from '../../styles/animations';
import  Typography, {TypographyProps } from '@mui/material/Typography';

type AnswerPersonNameTextProps = {
  typographyProps?: TypographyProps
  $isChangeColorRow: boolean
  $isChampion: boolean
}

export const AnswerPersonNameText = styled(Typography)<AnswerPersonNameTextProps>`
  ${rankRowTdChildCSS};
  animation: ${(p) => p.$isChangeColorRow && blinkAnswerPersonName};
  animation: ${(p) => p.$isChangeColorRow && p.$isChampion && blinkChampionTypography};
  ${animationDefault};
`;