import styled from "styled-components";
import {
  Box,
  BoxProps,
} from '@material-ui/core';

const StyledSpan = styled(Box)<BoxProps>`
  display: inline-block;
  transform: rotate(-90deg);
`;

const HyphenRotation: React.FC = ({children}) => {
  return (
    <>
      <StyledSpan component="span">
        {children}
      </StyledSpan>
    </>
  )
}

export default HyphenRotation