import firebase from '../../../../firebase/clientApp';
import styled from 'styled-components';
import ChoiceButton from '../../components/atoms/ChoiceButton';
import { Answer } from '../../components/types/question';
import { io } from 'socket.io-client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { colors } from '../../components/styles/colors';
import React, { useEffect, useRef, useState } from 'react';
import SelectedAnswer from '../../components/atoms/SelectedAnswer';
import router from 'next/router';
import { NextPageProps } from '../../components/types/pageTransition';
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Typography,
  TypographyProps,
} from '@mui/material';

const ClientContainer = styled(Container)<ContainerProps>``;

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
`;
const StyledTypography = styled(Typography)<{ $isCorrect: boolean }>`
  color: ${(p) => (p.$isCorrect ? 'red' : 'blue')};
  font-weight: bold;
  font-size: ${(p) => (p.$isCorrect ? '400px' : '800px')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const title = 'アソビュー オールスター感謝祭 2021';
const titleArray = title.split(' ');
const title1stRow = titleArray[0];
const title2ndRow = titleArray[1];
const title3rdRow = titleArray[2];

type IsRight = 'CORRECT' | 'INCORRECT';

const Home: React.FC = () => {
  const socket = io('http://localhost:3333');
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [isDisabled, setIsDisabled] = useState(true);
  const startTime = useRef<Date>(null);
  const finishTime = useRef<Date>(null);
  const [isAnswerDisplayed, setIsAnswerDisplayed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>(null);
  const [verifyAnswer, setVerifyAnswer] = useState<IsRight>(null);

  useEffect(() => {
    socket.open();
    socket.on('ready_go', () => {
      setIsDisabled(false);
      startTime.current = new Date();
    });
    socket.on('check_answer', (correctAnswer: Answer) => {
      if (selectedAnswer === correctAnswer) {
        setVerifyAnswer('CORRECT');
      } else {
        setVerifyAnswer('INCORRECT');
      }
    });
    socket.on('go_to_designated_page', (data: NextPageProps) => {
      setVerifyAnswer(null);
      if (selectedAnswer === data.correctAnswer) {
        setIsAnswerDisplayed(false);
      } else {
        router.push('/client/gameover');
      }
    });
    return function cleanup() {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer]);

  const addAnswerDocument = async (answer: Answer) => {
    setSelectedAnswer(answer);
    finishTime.current = new Date();
    const answerTime =
      Math.round(
        (finishTime.current.getTime() - startTime.current.getTime()) / 10
      ) / 100;
    setIsDisabled(true);
    // ↓ "answers"テーブルに現在サインインしているユーザーのUIDで新しいレコードを作成する
    await db
      .collection('answers')
      .doc(user.uid)
      .set({
        answer,
        user: user.displayName,
        time: answerTime.toFixed(2), // 2.50などと0埋めするため
      });
    setIsAnswerDisplayed(true);
  };

  return (
    <>
      <ClientContainer disableGutters>
        <TopTitle variant="h1">
          <TopTitlePart data-text={title1stRow}>{title1stRow}</TopTitlePart>
          <TopTitlePart data-text={title2ndRow}>{title2ndRow}</TopTitlePart>
          <TopTitlePart data-text={title3rdRow}>{title3rdRow}</TopTitlePart>
        </TopTitle>
        <StyledBox>
          {isAnswerDisplayed ? (
            <>
              {verifyAnswer === 'CORRECT' && (
                <StyledTypography variant="h1" $isCorrect={true}>
                  ◯
                </StyledTypography>
              )}
              {verifyAnswer === 'INCORRECT' && (
                <StyledTypography variant="h1" $isCorrect={false}>
                  ☓
                </StyledTypography>
              )}

              <Typography variant="h2">あなたが</Typography>
              <Typography variant="h2">選択した回答</Typography>
              <SelectedAnswer answer={selectedAnswer}>
                {selectedAnswer}
              </SelectedAnswer>
            </>
          ) : (
            <>
              <ChoiceButton
                isDisabled={isDisabled}
                addAnswerDocument={addAnswerDocument}
                choice="A"
                buttonColor="red"
              />
              <ChoiceButton
                isDisabled={isDisabled}
                addAnswerDocument={addAnswerDocument}
                choice="B"
                buttonColor="blue"
              />
              <ChoiceButton
                isDisabled={isDisabled}
                addAnswerDocument={addAnswerDocument}
                choice="C"
                buttonColor="yellow"
              />
              <ChoiceButton
                isDisabled={isDisabled}
                addAnswerDocument={addAnswerDocument}
                choice="D"
                buttonColor="green"
              />
            </>
          )}
        </StyledBox>
      </ClientContainer>
    </>
  );
};

export default React.memo(Home);
