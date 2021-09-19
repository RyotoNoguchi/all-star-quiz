import { TableCell, TableCellProps } from '@material-ui/core';
import styled from 'styled-components';
import {
  rankRowChild,
  blinkAnswerPersonNameBox,
  animationDefault,
  blinkChampionRow
} from '../../styles/animations';

const StyledTableCell = styled(({ isChangeColorRow, isChampion, ...props }) => (<TableCell {...props} />))<TableCellProps>`
  ${rankRowChild};
  width: 80%;
  justify-content: flex-start;
  animation: ${(p) => p.isChangeColorRow && blinkAnswerPersonNameBox};
  animation: ${(p) => p.isChangeColorRow && p.isChampion && blinkChampionRow};
  ${animationDefault};
`;

interface Props {
  isChampion?: boolean;
  isChangeColorRow: boolean;
}

const AnswerPersonNameBox: React.FC<Props> = ({ 
  isChampion,
  isChangeColorRow,
  children
  }) => {
  return (
    <>
      <StyledTableCell isChangeColorRow={isChangeColorRow} isChampion={isChampion}>
        {children}
        </StyledTableCell>
    </>
  );
};

export default AnswerPersonNameBox;
