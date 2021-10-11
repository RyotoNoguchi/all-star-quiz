import firebase from '../../../../../firebase/clientApp';
import { Typography, Grid, Card, Box, GridProps, TypographyProps, BoxProps } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import AlphabetCircle from '../../../components/atoms/AlphabetCircle/index';
import { io } from 'socket.io-client';
import Cue from '../cue';
import Index from '../../index';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring';
import { useCollection } from 'react-firebase-hooks/firestore';
import React from 'react';
import { Question as QuestionType} from "../../../components/types/question";
const db = firebase.firestore()

type Props = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const docs = await db.collection('questions').get()
  // const questions: QuestionType[] = []
  // docs.forEach(doc => {
  //   questions.push(doc.data() as QuestionType)
  // })
  // console.log(questions);
  // const paths = questions.map((question: QuestionType) => {
  //   return {
  //     params: { id: question.id }
  //   }
  // })
  
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const data: Props[] = response.data;

  const paths = data.map((post: Props) => {
    return {
      params: { id: post.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};
// TODO SSGの処理がどっかで間違っているからその修正から。値がちゃんと取れているかはほかの画面でconsole.log使いながら見る

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
  // const questions = await db.collection('question').where('questionId', '==', id).get()
  // console.log(questions);
  // const question = questions[0]
  // console.log(question);
  
  const id = context.params.id;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data: Props = await response.json();
  return {
    props: { 
      userId: data.userId,
      id: data.id,
      title: data.title,
      body: data.body
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

type CorrectAnswer = 'A' | 'B' | 'C' | 'D';

const countdownSec = 10;

const Question: React.FC<Props> = ({userId, id, title, body}) => {
  const router = useRouter();
  const socket = io('http://localhost:3333');
  const [questionId, setQuestionId] = useState('1');
  const [currentPath, setCurrentPath] = useState(
    `/monitor/question/${questionId}`
  );
  const [isQuestionDisplayed, setIsQuestionDisplayed] = useState(false);
  const [isTopPage, setIsTopPage] = useState(true);
  const [countdownTimeSec, setCountdownTimeSec] = useState(countdownSec);
  const [isNumberCountShown, setIsNumberCountShown] = useState(false);
  const [isCorrectForA, setIsCorrectForA] = useState(false);
  const [isCorrectForB, setIsCorrectForB] = useState(false);
  const [isCorrectForC, setIsCorrectForC] = useState(false);
  const [isCorrectForD, setIsCorrectForD] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<CorrectAnswer>('A');
  const [mounted, setMounted] = useState(false)
  
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
  useEffect(() => {
    setMounted(true)
    setMounted((prev) => {
      socket.on('ready_go', () => {
        setIsQuestionDisplayed(true);
        setIsTopPage(false);
        const CD10SecTimerId = setInterval(() => {
          setCountdownTimeSec((countdownTimeSec) => countdownTimeSec - 1);
          setCountdownTimeSec((countdownTimeSec) => {
            if (countdownTimeSec === 0) {
              clearInterval(CD10SecTimerId);
  
              // カウントダウンが0になった3400ms（「アンサーチェック！」）後に解答数枠を表示する
              setTimeout(() => {
                setIsNumberCountShown(true);
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
            return countdownTimeSec;
          });
        }, 1000);
      });
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
        console.log(path);
        resetQuestion()
        const newCurrentPath = path;
        setCurrentPath(newCurrentPath)
        router.push(newCurrentPath)
      })
      return prev
    })  
    return setMounted(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  return (
    <>
      <QuestionContainer container spacing={3}>
        <QuestionBox item xs={12}>
          <QuestionMark>Q</QuestionMark>
          <QuestionText variant="h1">{title}</QuestionText>
          <CountDownCircle>{countdownTimeSec}</CountDownCircle>
        </QuestionBox>
        <ChoiceBox item xs={6}>
          <QuestionCell isCorrect={isCorrectForA}>
            <AlphabetCircle choice="A" color="red" />
            <ChoiceText variant="h2">{title}</ChoiceText>
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
            <ChoiceText variant="h2">{title}</ChoiceText>
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
            <ChoiceText variant="h2">{title}</ChoiceText>
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
            <ChoiceText variant="h2">{title}</ChoiceText>
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
