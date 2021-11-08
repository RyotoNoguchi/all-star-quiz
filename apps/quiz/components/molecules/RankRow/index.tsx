import styled from 'styled-components';
import { flipRow } from '../../styles/animations';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';

type Props = {
  iterationCount: number
  isChangeColorRow: boolean
  variants: Variants
  custom: number
  children: ReactNode
}

const StyledTr = styled(motion.tr)<Props>`
  display: flex;
  margin-bottom: 6px;
  height: 78px;
  animation-delay: 0.3s;
  animation-duration: 0.4s;
  animation-timing-function: linear;
  animation-iteration-count: ${(p) => p.iterationCount};
  animation-name: ${flipRow};
  animation-delay: ${(p) => p.isChangeColorRow && '4s'};
  animation-iteration-count: ${(p) => p.isChangeColorRow && 4};
  animation-direction: reverse;
`;

const RankRow: React.VFC<Props> = ({
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
