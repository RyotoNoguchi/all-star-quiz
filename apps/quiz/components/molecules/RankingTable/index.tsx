import styled from "styled-components";
import {
  TableContainer,
  TableContainerProps,
} from '@material-ui/core';

const StyledTableContainer = styled(TableContainer)<TableContainerProps>`
  background-image: radial-gradient(#11f1fd, skyblue);
  border-radius: 2rem;
  padding: 10px;
  box-shadow: 2px 2px 4px rgb(0 21 255), -2px -2px 4px rgb(0 21 255);
  height: 860px;
  transform: translateY(-20px);
  display: flex;
  align-items: center;
`;

const RankingTable:React.FC = ({
  children
}) => {
  return (
    <>
      <StyledTableContainer>
        {children}
      </StyledTableContainer>
    </>
  )
};

export default RankingTable
