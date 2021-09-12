import { Typography, Grid, Card, Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Colors, colors } from '../../../components/styles/colors';
import AlphabetCircle from '../../../components/atoms/AlphabetCirce/index';
import { io } from 'socket.io-client';
import Cue from '../cue';
import Index from '../../index';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getStaticPaths = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const data = response.data;

  const paths = data.map((post: Post) => {
    return {
      params: { id: post.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = await response.json();
  return {
    props: { post: data },
  };
};

const QuestionContainer = styled(Grid)`
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

const QuestionBox = styled(Grid)`
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

const QuestionText = styled(Typography)`
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

const ChoiceBox = styled(Grid)`
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
  text-shadow: 2px 2px #555;
  background-image: linear-gradient(#2d3870, #586dd4);
  color: white;
  animation: ${(props) => (props.isCorrect ? blinkQuestionCell : '')} 600ms
    linear 0ms 4 normal forwards;
`;

const ChoiceText = styled(Typography)``;

const blinkingCountAnswerBox = keyframes`
    100% {
      background-image: radial-gradient(#e4d039, #fcf4b4);
      text-shadow: 2px 2px black;
      color: rgb(183, 58, 58);
    }
  `;

const CountAnswerBox = styled(({ isCorrect, ...props }) => <Box {...props} />)`
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
  animation: ${(props) => (props.isCorrect ? blinkingCountAnswerBox : '')} 600ms
    linear 0ms 4 normal forwards;
`;

const AnswerCount = styled(Typography)`
  font-size: 36px;
  line-height: normal;
  padding: 0;
  margin: 0;
  transform: translate(25%, 0);
`;

type CorrectAnswer = 'A' | 'B' | 'C' | 'D';

const countdownSec = 10;

const Question = ({ post }) => {
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
  const countdownAudioEl = useRef(null);
  const cueAudioEl = useRef(null)
  
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
    socket.on('ready_go', () => {
      setIsQuestionDisplayed(true);
      setIsTopPage(false);
      countdownAudioEl.current.play();
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
      cueAudioEl.current.play();
      setIsTopPage(false);
    });
    socket.on('display_top_page', () => {
      setIsTopPage(true);
    });
  }, []);

  if (isTopPage) {
    return <Index />;
  }

  if (!isQuestionDisplayed) {
    // [READY-GO]ボタンが押下される前
    return <Cue questionNumber={questionId} />;
  } else {
    return (
      <>
        <QuestionContainer container spacing={3}>
          <QuestionBox item xs={12}>
            <QuestionMark>Q</QuestionMark>
            <QuestionText variant="h1">{post.title}</QuestionText>
            <CountDownCircle>{countdownTimeSec}</CountDownCircle>
          </QuestionBox>
          <ChoiceBox item xs={6}>
            <QuestionCell isCorrect={isCorrectForA}>
              <AlphabetCircle choice="A" color="red" />
              <ChoiceText variant="h2">{post.title}</ChoiceText>
              {isNumberCountShown && (
                <CountAnswerBox isCorrect={isCorrectForA}>
                  <AnswerCount variant="body1">{post.id}</AnswerCount>
                </CountAnswerBox>
              )}
            </QuestionCell>
          </ChoiceBox>
          <ChoiceBox item xs={6}>
            <QuestionCell isCorrect={isCorrectForB}>
              <AlphabetCircle choice="B" color="blue" />
              <ChoiceText variant="h2">{post.title}</ChoiceText>
              {isNumberCountShown && (
                <CountAnswerBox isCorrect={isCorrectForB}>
                  <AnswerCount variant="body1">{post.id}</AnswerCount>
                </CountAnswerBox>
              )}
            </QuestionCell>
          </ChoiceBox>
          <ChoiceBox item xs={6}>
            <QuestionCell isCorrect={isCorrectForC}>
              <AlphabetCircle choice="C" color="yellow" />
              <ChoiceText variant="h2">{post.title}</ChoiceText>
              {isNumberCountShown && (
                <CountAnswerBox isCorrect={isCorrectForC}>
                  <AnswerCount variant="body1">{post.id}</AnswerCount>
                </CountAnswerBox>
              )}
            </QuestionCell>
          </ChoiceBox>
          <ChoiceBox item xs={6}>
            <QuestionCell isCorrect={isCorrectForD}>
              <AlphabetCircle choice="D" color="green" />
              <ChoiceText variant="h2">{post.title}</ChoiceText>
              {isNumberCountShown && (
                <CountAnswerBox isCorrect={isCorrectForD}>
                  <AnswerCount variant="body1">{post.id}</AnswerCount>
                </CountAnswerBox>
              )}
            </QuestionCell>
          </ChoiceBox>
        </QuestionContainer>
        <div>
          <audio
            src="https://firebasestorage.googleapis.com/v0/b/allstar-thanks-giving.appspot.com/o/sound%2Fcountdown.mp3?alt=media&token=1f25a4b9-30b1-4eba-bacd-3dcd86b31f37"
            ref={countdownAudioEl}
          ></audio>
          <audio
            src="https://firebasestorage.googleapis.com/v0/b/allstar-thanks-giving.appspot.com/o/sound%2Fquiz_cue.mp3?alt=media&token=d671624b-80e4-40c4-ae5d-ce147a1515f2"
            ref={cueAudioEl}
          ></audio>
        </div>
      </>
    );
  }
};

export default Question;
