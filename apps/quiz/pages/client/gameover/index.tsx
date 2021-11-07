import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import styled from 'styled-components';
import { TopTitle, TopTitlePart } from '../../../components/molecules/TopTitle';

const GameOverTitle = styled(Typography)`
  color: blueviolet;
  font-weight: bold;
  text-shadow: 2px 2px #555, -1px -1px #555;
  font-size: 64px;
`;

const GameOver: React.VFC = () => {
  const title = 'アソビュー オールスター感謝祭 2021';
  const titleArray = title.split(' ');
  const title1stRow = titleArray[0];
  const title2ndRow = titleArray[1];
  const title3rdRow = titleArray[2];
  return (
    <>
      <Box component="section">
        <TopTitle $pageType="CLIENT">
          <TopTitlePart data-text={title1stRow}>{title1stRow}</TopTitlePart>
          <TopTitlePart data-text={title2ndRow}>{title2ndRow}</TopTitlePart>
          <TopTitlePart data-text={title3rdRow}>{title3rdRow}</TopTitlePart>
        </TopTitle>
        <GameOverTitle>GAME OVER</GameOverTitle>
      </Box>
    </>
  );
};

export default React.memo(GameOver);
