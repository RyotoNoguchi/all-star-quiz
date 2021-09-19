import Box, { BoxProps } from '@material-ui/core/Box';
import styled from 'styled-components';

const StyledBox = styled(Box)<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const RankingTitleBox: React.FC = ({ children }) => {
  return (
    <>
      <StyledBox>{children}</StyledBox>
    </>
  );
};

export default RankingTitleBox;
