import { useMemo } from "react";
import { colors } from "../../styles/colors";
import { Answer } from "../../types/question";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

const StyledTypography = styled(Typography)<{color: string}>`
  color: ${p => p.color};
  font-weight: bold;
  text-shadow: 2px 2px #555, -1px -1px #555;
`

const SelectedAnswer: React.FC<{answer: Answer}> = ({
  answer,
}) => {
  const color = useMemo(() => ({
    A: colors.answerARed,
    B: colors.answerBBlue,
    C: colors.answerCYellow,
    D: colors.answerDGreen
  }[answer]), [answer])
  return (
    <>
      <StyledTypography variant="h1" color={color}>{answer}</StyledTypography>
    </>
  )
}

export default SelectedAnswer