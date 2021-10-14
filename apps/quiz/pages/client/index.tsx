import firebase from '../../../../firebase/clientApp';
import styled from 'styled-components';
import ChoiceButton from '../../components/atoms/ChoiceButton'
import { Answer } from "../../components/types/question";
import { io } from 'socket.io-client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { colors } from '../../components/styles/colors';
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const ClientContainer = styled(Container)<ContainerProps>`
  /* transform: translateY(-30px); */
`;

const TopTitle = styled(Typography)<TypographyProps>`
  font-family: 'Dela Gothic One', cursive;
  font-size: 2rem;
  font-weight: 400;
`;

const TopTitlePart = styled(Box)<BoxProps>`
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

const StyledBox = styled(Box)`
  text-align: center;
  margin-top: 50px;
`
const title = 'アソビュー オールスター感謝祭 2021';
const titleArray = title.split(' ');
const title1stRow = titleArray[0];
const title2ndRow = titleArray[1];
const title3rdRow = titleArray[2];

const Home: React.FC = () => {
  const socket = io('http://localhost:3333');
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [isDisabled, setIsDisabled] = useState(true)
  const startTime = useRef<Date>(null)
  const finishTime = useRef<Date>(null)

  useEffect(() => {
  socket.on('ready_go', ()=> {
    setIsDisabled(false)
    startTime.current = new Date()
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const addAnswerDocument = async (answer: Answer) => {
    finishTime.current = new Date()
    const answerTime = Math.round((finishTime.current.getTime() - startTime.current.getTime()) / 10) / 100
    setIsDisabled(true)
    // ↓ "answers"テーブルに現在サインインしているユーザーのUIDで新しいレコードを作成する
    await db.collection('answers').doc(user.uid).set({
      answer,
      user: user.displayName,
      time: answerTime.toFixed(2), // 2.50などと0埋めするため
    });
  }

  return (
    <>
      <ClientContainer disableGutters>
        <TopTitle variant="h1">
          <TopTitlePart data-text={title1stRow}>{title1stRow}</TopTitlePart>
          <TopTitlePart data-text={title2ndRow}>{title2ndRow}</TopTitlePart>
          <TopTitlePart data-text={title3rdRow}>{title3rdRow}</TopTitlePart>
        </TopTitle>
        <StyledBox>
          <ChoiceButton isDisabled={isDisabled} addAnswerDocument={addAnswerDocument} choice="A" buttonColor="red"/>
          <ChoiceButton isDisabled={isDisabled} addAnswerDocument={addAnswerDocument} choice="B" buttonColor="blue"/>
          <ChoiceButton isDisabled={isDisabled} addAnswerDocument={addAnswerDocument} choice="C" buttonColor="yellow"/>
          <ChoiceButton isDisabled={isDisabled} addAnswerDocument={addAnswerDocument} choice="D" buttonColor="green"/>
        </StyledBox>
      </ClientContainer>
    </>
  );
};

export default React.memo(Home);
