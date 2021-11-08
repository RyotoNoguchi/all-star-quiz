import Box from '@mui/material/Box';
import React from 'react';
import { GameOverTitle } from './styled';
import { TopTitle, TopTitlePart } from '../../../components/molecules/TopTitle';

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
