import styled from 'styled-components';
import { flipRow } from '../../styles/animations';
import { motion, Variants } from 'framer-motion';

interface Props {
  iterationCount: number;
  isChangeColorRow: boolean;
  variants: Variants;
  custom: number;
}

const StyledTr = styled(motion.tr)<Props>`
  display: flex;
  margin-bottom: 6px;
  height: 78px;
  animation-delay: 0.3s;
  animation-duration: 0.4s;
  animation-timing-function: linear;
  animation-iteration-count: ${(props) => props.iterationCount};
  animation-name: ${flipRow};
  animation-delay: ${(props) => props.isChangeColorRow && '4s'};
  animation-iteration-count: ${(props) => props.isChangeColorRow && 4};
  animation-direction: reverse;
`;

const RankRow: React.FC<Props> = ({
  iterationCount,
  isChangeColorRow,
  variants,
  custom,
  children,
}) => {
  return (
    <StyledTr
      iterationCount={iterationCount}
      isChangeColorRow={isChangeColorRow}
      variants={variants}
      custom={custom}
    >
      {children}
    </StyledTr>
  );
};

export default RankRow;
