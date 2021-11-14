import styled from 'styled-components';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const GameOverTitle = styled(Typography)<TypographyProps>`
  color: blueviolet;
  font-weight: bold;
  text-shadow: 2px 2px #555, -1px -1px #555;
  font-size: 64px;
`;
