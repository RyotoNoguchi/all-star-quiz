import { TableCell, TableCellProps } from '@material-ui/core';
import styled from 'styled-components';
import {
  rankRowChild,
  blinkAnswerPersonNameBox,
  animationDefault,
} from '../../styles/animations';

const StyledTableCell = styled(({ isLastRow, ...props }) => (<TableCell {...props} />))<TableCellProps>`
  ${rankRowChild};
  width: 80%;
  justify-content: flex-start;
  animation-name: ${(props) => props.isLastRow && blinkAnswerPersonNameBox};
  ${animationDefault};
`;

interface Props {
  isLastRow: boolean;
}

const AnswerPersonNameBox: React.FC<Props> = ({ 
  isLastRow,
  children
  }) => {
  return (
    <>
      <StyledTableCell isLastRow={isLastRow}>
        {children}
        </StyledTableCell>
    </>
  );
};

export default AnswerPersonNameBox;
