import styled from 'styled-components';
import {
  rankRowChild,
  animationDefault,
  blinkAnswerPersonNameBox,
  blinkChampionRow,
} from '../../styles/animations';
import { TableCell, TableCellProps } from '@material-ui/core';
import { ReactNode } from 'react';

type StyledTableCellProps = {
  tableCell?: TableCellProps;
  $isChangeColorRow: boolean;
  $isChampion: boolean;
};

const StyledTableCell = styled(TableCell)<StyledTableCellProps>`
  ${rankRowChild};
  width: 15%;
  justify-content: flex-end;
  animation-name: ${(p) => p.$isChangeColorRow && blinkAnswerPersonNameBox};
  animation-name: ${(p) =>
    p.$isChangeColorRow && p.$isChampion && blinkChampionRow};
  ${animationDefault};
`;

type Props = {
  isChampion?: boolean;
  isChangeColorRow: boolean;
  children: ReactNode;
};

const AnswerTimeBox: React.VFC<Props> = ({
  isChampion = false,
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

export default AnswerTimeBox;
