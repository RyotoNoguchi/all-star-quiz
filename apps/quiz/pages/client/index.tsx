import React, { useEffect, useRef, useState } from 'react';
import router from 'next/router';
import firebase from '../../../../firebase/clientApp';
import ChoiceButton from '../../components/atoms/ChoiceButton';
import SelectedAnswer from '../../components/atoms/SelectedAnswer';
import Typography from '@mui/material/Typography';
import { Answer } from '../../components/types/question';
import { io } from 'socket.io-client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NextPageProps } from '../../components/types/pageTransition';
import { API_BASE_URL } from "../_app";
import {
  AnswerCheckIcon,
  StyledBox,
  TopTitlePart,
  TopTitle,
  ClientContainer,
} from '../../components/styles/client/styles';

const title = 'アソビュー オールスター感謝祭 2021';
const titleArray = title.split(' ');
const title1stRow = titleArray[0];
const title2ndRow = titleArray[1];
const title3rdRow = titleArray[2];

type IsRight = 'CORRECT' | 'INCORRECT';

const Home: React.FC = () => {
  const socket = io(API_BASE_URL);
  const db = firebase.firestore();
  const [user] = useAuthState(firebase.auth());
  const [isDisabled, setIsDisabled] = useState(true);
  const startTime = useRef<Date>(null);
  const finishTime = useRef<Date>(null);
  const [isAnswerDisplayed, setIsAnswerDisplayed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>(null);
  const [verifyAnswer, setVerifyAnswer] = useState<IsRight>(null);

  useEffect(() => {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
    window.addEventListener('beforeunload', function(e){
      const message = '本当に更新してよろしいですか？';
      e.returnValue = message;
      return message;
    });
    socket.open();
    socket.on('ready_go', () => {
      setIsDisabled(false);
      startTime.current = new Date();
      setTimeout(() => {
        setIsDisabled(true);
      }, 10000);
    });
    socket.on('final_ready_go', () => {
      setIsDisabled(false);
      startTime.current = new Date();
      setTimeout(() => {
        setIsDisabled(true);
      }, 10000);
    });
    socket.on('check_answer', (correctAnswer: Answer) => {
      setIsAnswerDisplayed(true);
      if (selectedAnswer === correctAnswer) {
        setVerifyAnswer('CORRECT');
      } else {
        setVerifyAnswer('INCORRECT');
        disableUser();
      }
    });
    socket.on('go_to_designated_page', async(data: NextPageProps) => {
      const disabled = await (await db.collection('users').doc(user?.uid).get()).data().disabled
      console.log('disabled', disabled);
      setSelectedAnswer(null)
      setVerifyAnswer(null)
      if (selectedAnswer === data.correctAnswer && disabled === false) {
        setIsAnswerDisplayed(false);
      } else {
        router.push('/client/gameover');
      }
      await db.collection('users').doc(user?.uid).set({ disabled: false }, { merge: true });
    });
    return function cleanup() {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer, verifyAnswer]);

  const disableUser = async () => {
    if (user?.uid) {      
      await db
        .collection('users')
        .doc(user?.uid)
        .set({ disabled: true }, { merge: true });
    }
  };

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
        uid: user.uid,
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
                <AnswerCheckIcon variant="h1" $isCorrect={true}>
                  ◯
                </AnswerCheckIcon>
              )}
              {verifyAnswer === 'INCORRECT' && (
                <AnswerCheckIcon variant="h1" $isCorrect={false}>
                  ☓
                </AnswerCheckIcon>
              )}
              <Typography variant="h2">あなたの</Typography>
              <Typography variant="h2">解答</Typography>
              {selectedAnswer ? (
                <SelectedAnswer answer={selectedAnswer}>
                  {selectedAnswer}
                </SelectedAnswer>
              ) : (
                <h1>未選択です</h1>
              )}
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
