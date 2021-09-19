import { Typography, TypographyProps } from "@material-ui/core";
import styled from "styled-components";
import { Colors, TextShadows } from "../../styles/colors"

const StyledTypography = styled(({ color, textShadow, ...props }) => (<Typography {...props} />))<TypographyProps>`
  text-align: center;
  font-size: 3.2rem;
  line-height: 1.43;
  border: none;
  font-family: 'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic ProN';
  font-weight: 900;
  border-collapse: separate;
  width: 80%;
  color: ${props => props.color};
  text-shadow: ${props => props.textShadow};
`
interface Props {
  color: Colors
  textShadow: TextShadows
}

const RankingTitle: React.FC<Props> = ({
  color,
  textShadow,
  children
}) => {
  return (
    <>
      <StyledTypography color={color} textShadow={textShadow}>
        {children}
      </StyledTypography>
    </>
  )
}

export default RankingTitle