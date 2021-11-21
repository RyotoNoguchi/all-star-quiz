import { useMemo } from 'react';
import { Colors, colors } from '../../styles/colors';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';

type ChoiceType = 'A' | 'B' | 'C' | 'D'
type ButtonProps = {
  isDisabled: boolean
  buttonColor: 'red' | 'blue' | 'green' | 'yellow'
  choice: ChoiceType,
  addAnswerDocument: (choice: ChoiceType) => void
}

type StyledButtonProps = {
  buttonProps?: ButtonProps
  $buttonColor: Colors
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 10%;
  display: inline-block;
  width: 100px;
  height: 100px;
  background-image: ${p => p.$buttonColor};
  padding: 0;
  margin: 16px;
  font-size: 50px;
  text-shadow: 2px 2px #555, -1px -1px #555;
  color: white;
`

const ChoiceButton: React.FC<ButtonProps> = ({
  isDisabled = true,
  buttonColor: colorProp = "red", // 初期値が"red"でpropsとして渡されてきた値で実際は決まる
  choice, 
  addAnswerDocument
}) => {

  const buttonColor = useMemo(() => ({
    red: colors.circleRed,
    blue: colors.circleBlue,
    yellow: colors.circleYellow,
    green: colors.circleGreen
  }[colorProp]), [colorProp]) // 親から渡ってきたcolorPropが"blue"なら第一引数で"blue"に該当する色が"buttonColor"になる

  return (
    <>
      <StyledButton 
        disabled={isDisabled}
        variant="contained" 
        $buttonColor={buttonColor} 
        onClick={()=> addAnswerDocument(choice)}>
        {choice}
      </StyledButton>
    </>
  )
}

export default React.memo(ChoiceButton)
