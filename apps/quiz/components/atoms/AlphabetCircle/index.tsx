import { useMemo } from "react"
import { colors } from "../../styles/colors"
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";

interface AvatarProps {
  color: 'red' | 'blue' | 'green' | 'yellow'
  choice: 'A' | 'B' | 'C' | 'D'
}

const StyledAvatar = styled(Avatar)<{color:string}>`
  font-size: 32px;
  position: absolute;
  top: 8px;
  left: 8px;
  background-image: ${p => p.color};
`

const AlphabetCircle: React.FC<AvatarProps> = ({ 
  color: colorProp = 'red',
  choice
}) => {
  const circleColor =  useMemo(() => ({
    red: colors.circleRed,
    blue: colors.circleBlue,
    yellow: colors.circleYellow,
    green: colors.circleGreen
  }[colorProp]), [colorProp])
  
  return (
    <>
      <StyledAvatar color={circleColor} alt={choice}>{choice}</StyledAvatar>
    </>
  )
}

export default AlphabetCircle