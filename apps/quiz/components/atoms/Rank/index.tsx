import styled from 'styled-components';
import { Box, BoxProps } from '@material-ui/core';
import { blinkRank, animationDefault, blinkChampionRank } from '../../styles/animations';

const StyledSpan = styled(({ isChangeColorRow, isChampion, ...props }) => <Box {...props} />)<BoxProps>`
  width: 6.25rem;
  background-image: radial-gradient(#2d3870, #2945d0);
  box-shadow: 2px 2px 2px rgb(94 94 94), -2px -2px 2px rgb(94 94 94);
  left: 1.5rem;
  border: 0.2rem solid rgb(2, 2, 169);
  border-radius: 0.6rem;
  text-align: center;
  color: white;
  display: inline-block;
  margin: 10px 40px 10px 10px;
  padding: 8px 0px;
  font-size: 36px;
  padding: 0;
  text-shadow: none;
  animation: ${(p) => p.isChangeColorRow && blinkRank};
  animation: ${(p) => p.isChangeColorRow && p.isChampion && blinkChampionRank};
  ${animationDefault};
`;

interface Props {
  isChampion?: boolean
  isChangeColorRow: boolean;
}

const Rank: React.FC<Props> = ({
  isChampion = false,
  isChangeColorRow,
  children
}) => {
  return (
    <>
      <StyledSpan component="span" isChangeColorRow={isChangeColorRow} isChampion={isChampion}>
        {children}
      </StyledSpan>
    </>
  )
}

export default Rank
