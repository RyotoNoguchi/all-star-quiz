import styled from 'styled-components';
import { rankRowChild, animationDefault, blinkAnswerPersonNameBox, blinkChampionRow } from '../../styles/animations';
import { TableCell, TableCellProps } from '@material-ui/core';

const StyledTableCell = styled(({ isChangeColorRow, isChampion, ...props }) => (<TableCell {...props} />))<TableCellProps>`
  ${rankRowChild};
  width: 15%;
  justify-content: flex-end;
  animation-name: ${(p) => p.isChangeColorRow && blinkAnswerPersonNameBox};
  animation-name: ${(p) => p.isChangeColorRow && p.isChampion && blinkChampionRow};
  ${animationDefault};
`;

interface Props {
  isChampion?: boolean;
  isChangeColorRow: boolean;
}

const AnswerTimeBox:React.FC<Props> = ({
  isChampion = false,
  isChangeColorRow,
  children
}) => {
  return (
    <>
      <StyledTableCell isChangeColorRow={isChangeColorRow} isChampion={isChampion}>
        {children}
      </StyledTableCell>
    </>
  )
}

export default AnswerTimeBox
