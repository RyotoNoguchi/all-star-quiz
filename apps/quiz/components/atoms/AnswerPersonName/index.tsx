import styled from 'styled-components';
import { Typography, TypographyProps } from '@material-ui/core';
import { rankRowTdChildCSS, blinkAnswerPersonName, animationDefault } from '../../styles/animations';

interface Props {
  isLastRow: boolean
}

const StyledTypography = styled(({ isLastRow, ...props }) => (<Typography {...props} />))<TypographyProps>`
  ${rankRowTdChildCSS};
  animation: ${(props) => props.isLastRow && blinkAnswerPersonName};
  ${animationDefault};
`;

const AnswerPersonName: React.FC<Props> = ({ 
  isLastRow,
  children
  }) => {
    return (
      <>
        <StyledTypography variants="body1" isLastRow={isLastRow}>
          {children}
        </StyledTypography>
      </>
    )
  };

export default AnswerPersonName;
