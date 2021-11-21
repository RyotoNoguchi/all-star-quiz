import TableCell, { TableCellProps } from '@mui/material/TableCell';
import { ReactNode } from 'react';
import styled from 'styled-components';
import {
  rankRowChild,
  blinkAnswerPersonNameBox,
  animationDefault,
  blinkChampionRow,
} from '../../styles/animations';

type StyledTableCellProps = {
  tableCell?: TableCellProps;
  $isChangeColorRow: boolean;
  $isChampion: boolean;
};

const StyledTableCell = styled(TableCell)<StyledTableCellProps>`
  ${rankRowChild};
  width: 80%;
  justify-content: flex-start;
  animation: ${(p) => p.$isChangeColorRow && blinkAnswerPersonNameBox};
  animation: ${(p) => p.$isChangeColorRow && p.$isChampion && blinkChampionRow};
  ${animationDefault};
`;

type Props = {
  isChampion?: boolean;
  isChangeColorRow: boolean;
  children: ReactNode;
};

const AnswerPersonNameBox: React.VFC<Props> = ({
  isChampion,
  isChangeColorRow,
  children,
}) => {
  return (
    <>
      <StyledTableCell
        $isChangeColorRow={isChangeColorRow}
        $isChampion={isChampion}
      >
        {children}
      </StyledTableCell>
    </>
  );
};

export default AnswerPersonNameBox;
