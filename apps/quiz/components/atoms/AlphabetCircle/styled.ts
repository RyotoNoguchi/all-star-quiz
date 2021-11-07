import Avatar, {AvatarProps} from "@mui/material/Avatar";
import styled from "styled-components";

type ChoiceAvatarProps = {
  avatarProps?: AvatarProps
  $color: string
}

export const ChoiceAvatar = styled(Avatar)<ChoiceAvatarProps>`
  font-size: 32px;
  position: absolute;
  top: 8px;
  left: 8px;
  background-image: ${p => p.$color};
`