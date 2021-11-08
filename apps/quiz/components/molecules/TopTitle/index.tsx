import Typography, { TypographyProps } from "@mui/material/Typography";
import { colors } from "../../styles/colors";
import styled from "styled-components";

type PageType = 'MONITOR' | 'CLIENT'

type TopTitleProps = {
  typography?: TypographyProps
  $pageType: PageType
}

export const TopTitle = styled(Typography)<TopTitleProps>`
  font-family: 'Dela Gothic One', cursive;
  font-size: ${p => p.$pageType === 'MONITOR' ? '8rem' : '40px'};
  font-weight: 400;
`;

export const TopTitlePart = styled.span`
  display: inline-block;
  position: relative;
  background-clip: border-box;
  background: linear-gradient(
    ${colors.titleOrange},
    ${colors.titleYellow},
    ${colors.titleOrange}
  );
  -webkit-background-clip: text; //テキストでくり抜く
  -webkit-text-fill-color: transparent; //くり抜いた部分は背景を表示
  &::after {
    background: none;
    content: attr(data-text);
    left: 0;
    position: absolute;
    text-shadow: 6px 6px 1px ${colors.titlePurple},
      -6px -6px 1px ${colors.titlePurple};
    top: 0;
    z-index: -1;
  }
`;