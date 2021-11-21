import Typography, { TypographyProps } from "@mui/material/Typography";
import { ReactNode } from "react";
import styled from "styled-components";
import { Colors, TextShadows } from "../../styles/colors"

type RankingTitleTextProps = {
  typography?: TypographyProps
  $color: Colors
  $textShadow: TextShadows
}

const RankingTitleText = styled(Typography)<RankingTitleTextProps>`
  text-align: center;
  font-size: 3.2rem;
  line-height: 1.43;
  border: none;
  font-family: 'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic ProN';
  font-weight: 900;
  border-collapse: separate;
  width: 80%;
  color: ${props => props.$color};
  text-shadow: ${props => props.$textShadow};
`
type Props = {
  color: Colors
  textShadow: TextShadows
  children: ReactNode
}

const RankingTitle: React.VFC<Props> = ({
  color,
  textShadow,
  children
}) => {
  return (
    <>
      <RankingTitleText $color={color} $textShadow={textShadow}>
        {children}
      </RankingTitleText>
    </>
  )
}

export default RankingTitle