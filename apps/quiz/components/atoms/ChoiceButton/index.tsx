import { useMemo } from 'react';
import { colors } from '../../styles/colors';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';


type ChoiceType = 'A' | 'B' | 'C' | 'D'
interface ButtonProps {
  buttonColor: 'red' | 'blue' | 'green' | 'yellow'
  choice: ChoiceType,
  addAnswerDocument: (choice: ChoiceType) => void
}

const StyledButton = styled(({buttonColor, ...props}) => <Button {...props}/>)`
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

const ChoiceButton: React.FC<ButtonProps> = ({
  buttonColor: colorProp = "red",
  choice, 
  addAnswerDocument
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
        onClick={()=> addAnswerDocument(choice)}>
        {choice}
      </StyledButton>
    </>
  )
}

export default React.memo(ChoiceButton)
