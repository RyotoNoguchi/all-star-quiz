import styled from 'styled-components';
import { rankRowChild, animationDefault, blinkAnswerPersonNameBox } from '../../styles/animations';
import { TableCell, TableCellProps } from '@material-ui/core';

const StyledTableCell = styled(({ isLastRow, ...props }) => (<TableCell {...props} />))<TableCellProps>`
  ${rankRowChild};
  width: 15%;
  justify-content: flex-end;
  animation-name: ${(props) => props.isLastRow && blinkAnswerPersonNameBox};
  ${animationDefault};
`;

interface Props {
  isLastRow: boolean;
}

const AnswerTimeBox:React.FC<Props> = ({
  isLastRow,
  children
}) => {
  return (
    <>
      <StyledTableCell isLastRow={isLastRow}>
        {children}
      </StyledTableCell>
    </>
  )
}

export default AnswerTimeBox
