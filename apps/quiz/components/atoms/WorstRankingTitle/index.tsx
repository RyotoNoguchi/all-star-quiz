import { Typography, TypographyProps } from "@material-ui/core";
import styled from "styled-components";

const StyledTypography = styled(Typography)<TypographyProps>`
  text-align: center;
  font-size: 3.2rem;
  line-height: 1.43;
  border: none;
  font-family: 'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic ProN';
  font-weight: 900;
  color: rgb(0, 21, 255);
  text-shadow: 4px 4px 4px white, -4px -4px 4px white;
  border-collapse: separate;
  width: 80%;
`;

const WorstRankingTitle: React.FC = ({children}) => {
  
  return (
    <>
      <StyledTypography>
        {children}
      </StyledTypography>
    </>
  )
}

export default WorstRankingTitle