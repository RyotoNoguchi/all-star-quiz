import { useMemo } from 'react';
import { colors } from '../../styles/colors';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

interface ButtonProps {
  buttonColor: 'red' | 'blue' | 'green' | 'yellow'
  choice: 'A' | 'B' | 'C' | 'D'
}

const StyledButton = styled(Button)<{buttonColor: string}>`
  border-radius: 10%;
  display: inline-block;
  width: 150px;
  height: 150px;
  background-image: ${p => p.buttonColor};
  padding: 0;
  margin: 16px;
  font-size: 50px;
  text-shadow: 2px 2px #555, -1px -1px #555;
  color: white;
`

const handleSubmit = () => {
  console.log("ボタンが押されました");
}

const ChoiceButton: React.FC<ButtonProps> = ({
  buttonColor: colorProp = "red",
  choice
}) => {
  const buttonColor = useMemo(() => ({
    red: colors.circleRed,
    blue: colors.circleBlue,
    yellow: colors.circleYellow,
    green: colors.circleGreen
  }[colorProp]), [colorProp])
  return (
    <>
      <StyledButton 
        variant="contained" 
        buttonColor={buttonColor} 
        onClick={()=> handleSubmit()}>
        {choice}
      </StyledButton>
    </>
  )
}

export default ChoiceButton
