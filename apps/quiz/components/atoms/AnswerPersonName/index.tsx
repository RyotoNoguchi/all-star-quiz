import styled from 'styled-components';
import { Typography, TypographyProps } from '@material-ui/core';
import { rankRowTdChildCSS, blinkAnswerPersonName, animationDefault, blinkChampionTypography} from '../../styles/animations';

interface Props {
  isChampion?: boolean
  isChangeColorRow: boolean
}

const StyledTypography = styled(({ isChangeColorRow, isChampion, ...props }) => (<Typography {...props} />))<TypographyProps>`
  ${rankRowTdChildCSS};
  animation: ${(p) => p.isChangeColorRow && blinkAnswerPersonName};
  animation: ${(p) => p.isChangeColorRow && p.isChampion && blinkChampionTypography};
  ${animationDefault};
`;

const AnswerPersonName: React.FC<Props> = ({ 
  isChampion = false,
  isChangeColorRow,
  children
  }) => {
    return (
      <>
        <StyledTypography variants="body1" isChangeColorRow={isChangeColorRow} isChampion={isChampion}>
          {children}
        </StyledTypography>
      </>
    )
  };

export default AnswerPersonName;
