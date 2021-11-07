/* eslint-disable react-hooks/exhaustive-deps */
import firebase from '../../../../../firebase/clientApp';
import { Typography, Grid, Card, Box, GridProps, TypographyProps, BoxProps } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import AlphabetCircle from '../../../components/atoms/AlphabetCircle/index';
import { io } from 'socket.io-client';
import Cue from '../cue';
import Index from '../../index';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring';
import { useCollection } from 'react-firebase-hooks/firestore';
import React from 'react';
import useInterval from "use-interval";
import useSound from 'use-sound';
import Image from 'next/image';
import { motion } from 'framer-motion';

const gongUrl = 'https://firebasestorage.googleapis.com/v0/b/allstar-thanks-giving.appspot.com/o/sound%2Fgong.mp3?alt=media&token=3a66f8d8-23f8-48d0-a1ed-b785d2a8db3c'

import { Question as QuestionType, Answer} from "../../../components/types/question";
const db = firebase.firestore()

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await db.collection('questions').get()
  const questions: QuestionType[] = []
  docs.forEach(doc => {
    questions.push({
      id: doc.data().questionId,
      question: doc.data().question,
      answer: doc.data().correctAnswer,
      choices: doc.data().choices
    })
  })
  const paths = questions.map((question: QuestionType) => {
    return {
      params: { id: question.id },
    }
  })

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<QuestionType> = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
  const id = context.params.id;
  const docs = await db.collection('questions').where('questionId', '==', id).get()
  const questions: QuestionType[] = []
  docs.forEach(doc => {
    questions.push({
      id: doc.data().questionId,
      question: doc.data().question,
      answer: doc.data().correctAnswer,
      choices: doc.data().choices
    })
  })
  const question = questions[0]
  return {
    props: { 
      id: question.id,
      question: question.question,
      answer: question.answer,
      choices: question.choices
    },
    revalidate: 10,
  };
};

const QuestionContainer = styled(Grid)<GridProps>`
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.1rem 0.1rem 0.1rem #555;
  color: white;
  text-shadow: 3px 3px 0.1rem black;
  font-size: 2rem;
  background-image: linear-gradient(#2d3870, #586dd4);
  margin-bottom: 48px;
  border-radius: 0.5rem;
  position: relative;
`;

const QuestionBox = styled(Grid)<GridProps>`
  margin-bottom: 48px;
`;

const QuestionMark = styled.span`
  position: absolute;
  top: -6px;
  left: 12px;
  font-size: 60px;
  font-weight: 900;
  color: rgb(121, 184, 252);
  text-shadow: 0 0 4px skyblue, 0 -2px #fff;
`;

const QuestionText = styled(Typography)<TypographyProps>`
  margin: 0;
  line-height: 3rem;
  font-size: 2rem;
`;

const CountDownCircle = styled.span`
  width: 3.5rem;
  height: 3.5rem;
  font-size: 2.5rem;
  border-radius: 50%;
  margin: 0;
  position: relative;
  right: 8px;
  top: 8px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgb(255, 76, 76), red);
  position: absolute;
  color: white;
  text-shadow: 3px 3px 3px black;
  box-shadow: 1px 1px 1px 1px black;
`;

const ChoiceBox = styled(Grid)<GridProps>`
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem !important;
  position: relative;
  background-color: rgba(4, 83, 255, 0.797);
  border-radius: 1rem;
`;

const blinkQuestionCell = keyframes`
    to {
      background-image: radial-gradient(rgb(183, 58, 58), rgb(249, 120, 120));
      text-shadow: 2px 2px black;
      color: #e4d039;
    }
  `;

const QuestionCell = styled(({ isCorrect, ...props }) => <Card {...props} />)`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 2px 2px 2px 2px #5f72d1;
  font-size: 4rem;
  background-image: linear-gradient(#2d3870, #586dd4);
  text-shadow: 2px 2px #555;
  color: white;
  animation: ${(props) => (props.isCorrect ? blinkQuestionCell : '')} 600ms
    linear 0ms 4 normal forwards;
`;

const ChoiceText = styled(Typography)<TypographyProps>``;

const blinkCountAnswerBox = keyframes`
    100% {
      background-image: radial-gradient(#e4d039, #fcf4b4);
      text-shadow: 2px 2px black;
      color: rgb(183, 58, 58);
    }
  `;

const CountAnswerBox = styled(({ isCorrect, ...props }) => <Box {...props} />)<BoxProps>`
  text-align: right;
  width: 80px;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  font-size: 2.5rem;
  border: 2px solid grey;
  border-radius: 12px;
  line-height: 2.5rem;
  box-shadow: 2px 2px 2px black;
  color: blue;
  text-shadow: 2px 2px #555;
  background-image: linear-gradient(
    to right,
    rgb(125, 138, 255),
    rgb(185, 231, 249)
  );
  animation: ${(props) => (props.isCorrect ? blinkCountAnswerBox : '')} 600ms
    linear 0ms 4 normal forwards;
`;

const AnswerCount = styled(Typography)<TypographyProps>`
  font-size: 36px;
  line-height: normal;
  padding: 0;
  margin-right: 10px;
`;

const countdownSec = 10;

const Question: React.FC<QuestionType> = ({id, question, answer, choices}) => {
  
  const router = useRouter();
  const socket = io('http://localhost:3333');
  const [questionId, setQuestionId] = useState(id);
  const [currentPath, setCurrentPath] = useState(
    `/monitor/question/${questionId}`
  );
  const [isQuestionDisplayed, setIsQuestionDisplayed] = useState(false);
  const [isTopPage, setIsTopPage] = useState(true);
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const [countdownTimeSec, setCountdownTimeSec] = useState(countdownSec);
  const [isNumberCountShown, setIsNumberCountShown] = useState(false);
  const [isCorrectForA, setIsCorrectForA] = useState(false);
  const [isCorrectForB, setIsCorrectForB] = useState(false);
  const [isCorrectForC, setIsCorrectForC] = useState(false);
  const [isCorrectForD, setIsCorrectForD] = useState(false);
  const [mounted, setMounted] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState<Answer>(answer as Answer)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playGong] = useSound(gongUrl, { volume: 0.5 })
  const QImgBaseUrl = 'https://firebasestorage.googleapis.com'

  
  const resetQuestion = () => {
    setCountdownTimeSec(countdownSec);
    setIsNumberCountShown(false);
    setIsCorrectForA(false);
    setIsCorrectForB(false);
    setIsCorrectForC(false);
    setIsCorrectForD(false);
    setIsTopPage(false);
    setIsQuestionDisplayed(false);
  };
  // https://usehooks-typescript.com/react-hook/use-interval
  useInterval(() => {
    
    if (isQuestionDisplayed && countdownTimeSec > 0) {
      setCountdownTimeSec(countdownTimeSec - 1)
    }
    if (countdownTimeSec === 0) {
      // カウントダウンが0になった3400ms（「アンサーチェック！」）後に解答数枠を表示する
      setIsPlaying(false)
      setTimeout(() => {
        setIsNumberCountShown(true);
        if (isLastQuestion) {
          setTimeout(() => {
            playGong()
          }, 7000);
        }
      }, 3400);

      // カウントダウンが0になった7000ms（「正解はこちら！」）後に正解を点滅させる
      setTimeout(() => {
        switch (correctAnswer) {
          case 'A':
            setIsCorrectForA(true);
            break;
          case 'B':
            setIsCorrectForB(true);
            break;
          case 'C':
            setIsCorrectForC(true);
            break;
          case 'D':
            setIsCorrectForD(true);
            break;
          default:
            break;
        }
      }, 7000);
      
    }

  }, isPlaying ? 1000 : null)

  useEffect(() => {
    setMounted(true)
    socket.open()
    setMounted((prev) => {
      socket.on('ready_go', () => {
        setIsQuestionDisplayed(true);
        setIsTopPage(false);
        setIsPlaying(true)
        setTimeout(() => {
          socket.emit('check_answer', correctAnswer)
        }, 20000);
      });
      socket.on('final_ready_go', () => {
        setIsQuestionDisplayed(true);
        setIsTopPage(false);
        setIsPlaying(true)
        setIsLastQuestion(true)
      })
      socket.on('go_to_designated_page', (nextQuestionId) => {
        resetQuestion();
        const newQuestionId = nextQuestionId;
        setQuestionId(newQuestionId);
        const newCurrentPath = `/monitor/question/${newQuestionId}`;
        setCurrentPath(newCurrentPath);
        router.push(newCurrentPath);
      });
      socket.on('display_cue_page', () => {
        setIsTopPage(false);
      });
      socket.on('display_top_page', () => {
        setIsTopPage(true);
      }); 
      socket.on('go_to_worst_ranking_page', (path) => {
        resetQuestion()
        const newCurrentPath = path;
        setCurrentPath(newCurrentPath)
        router.push(newCurrentPath)
      })
      socket.on('go_to_champion_ranking_page', (path) => {
        resetQuestion()
        const newCurrentPath = path;
        setCurrentPath(newCurrentPath)
        router.push(newCurrentPath)
      })
      return prev
    })  
    setMounted(false)
    return function cleanup() {
      socket.close()
    }
  }, [correctAnswer]);

  const [answers, answersLoading, answersError] = useCollection(
    firebase.firestore().collection('answers'),
    {}
  );

  if (isTopPage) {
    return <Index />;
  }

  if (!isQuestionDisplayed) {
    // [READY-GO]ボタンが押下される前
    return <Cue questionNumber={questionId} />;
  } 

  const srcA = choices.A
  const srcB = choices.B
  const srcC = choices.C
  const srcD = choices.D

  return (
    <>
      <QuestionContainer container spacing={3}>
        <QuestionBox item xs={12}>
          <QuestionMark>Q</QuestionMark>
          <QuestionText variant="h1">{question}</QuestionText>
          <CountDownCircle>{countdownTimeSec}</CountDownCircle>
        </QuestionBox>
        <ChoiceBox item xs={6}>
          <QuestionCell isCorrect={isCorrectForA}>
            <AlphabetCircle choice="A" color="red" />
            {choices.A.startsWith(QImgBaseUrl) 
              ? <motion.div initial={{clipPath: 'circle(0 at 50% 50%)'}} animate={{ clipPath: 'circle(100% at 50% 50%)'}} transition={{ ease: [1, .02, 1, .42], duration: 10}}>
                  <Image loader={() => srcA} src={srcA} alt="選択肢Aの画像" width={320} height={320} priority/> 
                </motion.div>
              : <ChoiceText variant="h2">{choices.A}</ChoiceText>}
            {isNumberCountShown && (
              <CountAnswerBox isCorrect={isCorrectForA}>
                <AnswerCount variant="body1">{answers?.docs.filter((doc)=>doc.data().answer === 'A').length}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell isCorrect={isCorrectForB}>
            <AlphabetCircle choice="B" color="blue" />
            {choices.B.startsWith(QImgBaseUrl) 
              ? <motion.div initial={{clipPath: 'circle(0 at 50% 50%)'}} animate={{ clipPath: 'circle(100% at 50% 50%)'}} transition={{ ease: [1, .02, 1, .42], duration: 10}}>
              <Image loader={() => srcB} src={srcB} alt="選択肢Bの画像" width={320} height={320} priority/> 
            </motion.div>
              : <ChoiceText variant="h2">{choices.B}</ChoiceText>}
            {isNumberCountShown && (
              <CountAnswerBox isCorrect={isCorrectForB}>
                <AnswerCount variant="body1">{answers?.docs.filter((doc)=>doc.data().answer === 'B').length}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell isCorrect={isCorrectForC}>
            <AlphabetCircle choice="C" color="yellow" />
            {choices.C.startsWith(QImgBaseUrl) 
              ? <motion.div initial={{clipPath: 'circle(0 at 50% 50%)'}} animate={{ clipPath: 'circle(100% at 50% 50%)'}} transition={{ ease: [1, .02, 1, .42], duration: 10}}>
              <Image loader={() => srcC} src={srcC} alt="選択肢Cの画像" width={320} height={320} priority/> 
            </motion.div>
              : <ChoiceText variant="h2">{choices.C}</ChoiceText>}
            {isNumberCountShown && (
              <CountAnswerBox isCorrect={isCorrectForC}>
                <AnswerCount variant="body1">{answers?.docs.filter((doc)=>doc.data().answer === 'C').length}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell isCorrect={isCorrectForD}>
            <AlphabetCircle choice="D" color="green" />
            {choices.D.startsWith(QImgBaseUrl) 
              ? <motion.div initial={{clipPath: 'circle(0 at 50% 50%)'}} animate={{ clipPath: 'circle(100% at 50% 50%)'}} transition={{ ease: [1, .02, 1, .42], duration: 10}}>
              <Image loader={() => srcD} src={srcD} alt="選択肢Dの画像" width={320} height={320} priority/> 
            </motion.div>
              : <ChoiceText variant="h2">{choices.D}</ChoiceText>}
            {isNumberCountShown && (
              <CountAnswerBox isCorrect={isCorrectForD}>
                <AnswerCount variant="body1">{answers?.docs.filter((doc)=>doc.data().answer === 'D').length}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
      </QuestionContainer>
    </>
  );
};

export default React.memo(Question);
