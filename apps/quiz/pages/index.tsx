import styled from 'styled-components';
import { colors } from '../components/styles/colors';
import { Box } from '@material-ui/core';
import React from 'react';


const TopBackGroundImg = styled(Box)``;

const TopTitle = styled.h1`
  font-family: 'Dela Gothic One', cursive;
  font-size: 8rem;
  font-weight: 400;
`;

const TopTitlePart = styled.span`
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

const Index = () => {  
  const title = 'アソビュー オールスター感謝祭 2021';
  const titleArray = title.split(' ');
  const title1stRow = titleArray[0];
  const title2ndRow = titleArray[1];
  const title3rdRow = titleArray[2];
  return (
    <>
      <TopBackGroundImg component="section">
        <TopTitle>
          <TopTitlePart data-text={title1stRow}>{title1stRow}</TopTitlePart>
          <TopTitlePart data-text={title2ndRow}>{title2ndRow}</TopTitlePart>
          <TopTitlePart data-text={title3rdRow}>{title3rdRow}</TopTitlePart>
        </TopTitle>
      </TopBackGroundImg>
    </>
  );
};

export default React.memo(Index);