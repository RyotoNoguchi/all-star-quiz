import styled from 'styled-components';
import { Typography, TypographyProps } from '@material-ui/core';
import { rankRowTdChildCSS, animationDefault, blinkAnswerPersonName } from '../../styles/animations';

const StyledTypography = styled(({ isLastRow, ...props }) => (<Typography {...props} />))<TypographyProps>`
  ${rankRowTdChildCSS}
  animation: ${(props) => props.isLastRow && blinkAnswerPersonName};
  ${animationDefault};
`;

interface Props {
  isLastRow: boolean;
}

const AnswerTime:React.FC<Props> = ({
  isLastRow,
  children
}) => {
  return (
    <>
      <StyledTypography isLastRow={isLastRow}>
        {children}
      </StyledTypography>
    </>
  )
}

export default AnswerTime