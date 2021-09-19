import styled from 'styled-components';
import { Typography, TypographyProps } from '@material-ui/core';
import {
  rankRowTdChildCSS,
  animationDefault,
  blinkAnswerPersonName,
  blinkChampionTypography,
} from '../../styles/animations';

const StyledTypography = styled(({ isChangeColorRow, isChampion, ...props }) => <Typography {...props} />)<TypographyProps>`
  ${rankRowTdChildCSS};
  animation: ${(p) => p.isChangeColorRow && blinkAnswerPersonName};
  animation: ${(p) =>
    p.isChangeColorRow && p.isChampion && blinkChampionTypography};
  ${animationDefault};
`;

interface Props {
  isChangeColorRow: boolean;
  isChampion?: boolean;
}

const AnswerTime: React.FC<Props> = ({
  isChangeColorRow,
  isChampion = false,
  children,
}) => {
  return (
    <>
      <StyledTypography
        isChangeColorRow={isChangeColorRow}
        isChampion={isChampion}
      >
        {children}
      </StyledTypography>
    </>
  );
};

export default AnswerTime;
