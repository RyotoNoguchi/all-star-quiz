/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useInterval from "use-interval";
import useSound from 'use-sound';
import Image from 'next/image';
import firebase from '../../../../../firebase/clientApp';
import AlphabetCircle from '../../../components/atoms/AlphabetCircle/index';
import { io } from 'socket.io-client';
import Index from '../../index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring';
import { useCollection } from 'react-firebase-hooks/firestore';
import { motion } from 'framer-motion';
import { API_BASE_URL } from "../../_app";
import {QuestionContainer, QuestionBox, QuestionMark, QuestionText, CountDownCircle, ChoiceBox, QuestionCell, ChoiceText, CountAnswerBox, AnswerCount} from '../../../components/styles/monitor/questionStyles'

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

const countdownSec = 10;

const Question: React.VFC<QuestionType> = ({id, question, answer, choices}) => {

  const router = useRouter();
  const socket = io(API_BASE_URL);
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
  useInterval( async() => {

    if (isQuestionDisplayed && countdownTimeSec > 0) {
      setCountdownTimeSec(countdownTimeSec - 1)
    }
    if (countdownTimeSec === 0) {
      // カウントダウンが0になった3400ms（「アンサーチェック！」）後に解答数枠を表示する
      setIsPlaying(false)
      await startCountdown()
      // 「アンサーチェック！」の後3000ms（「正解はこちら！」）後に正解を点滅させる
      await openAnswer()

      setTimeout(() => {
        socket.emit('answer_displayed')
      }, 3000);
    }

  }, isPlaying ? 1000 : null)

  const startCountdown = () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setIsNumberCountShown(true);
        if (isLastQuestion) {
          setTimeout(() => {
            playGong()
          }, 7000);
        }
        resolve();
      }, 3400);
    })

  }

  const openAnswer = () => {
    return new Promise<void>(resolve => {
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
        resolve();
      }, 3000);
    })
  }


  useEffect(() => {
    (async () => {
      const docs = await db.collection('answers').get()
      const docIds: string[] = []
      docs.forEach(doc => { docIds.push(doc.id)})
      docIds.map(async (docId) => { await db.collection('answers').doc(docId).delete()})
    })()
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
        setTimeout(() => {
          socket.emit('check_answer', correctAnswer)
        }, 20000);
      })
      socket.on('go_to_designated_page', (nextQuestionId) => {
        resetQuestion();
        const newQuestionId = nextQuestionId;
        setQuestionId(newQuestionId);
        const newCurrentPath = `/monitor/question/${newQuestionId}`;
        setCurrentPath(newCurrentPath);
        router.push(newCurrentPath);
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
          <QuestionCell $isCorrect={isCorrectForA}>
            <AlphabetCircle choice="A" color="red" />
            {choices.A.startsWith(QImgBaseUrl)
              ? <motion.div initial={{clipPath: 'circle(0 at 50% 50%)'}} animate={{ clipPath: 'circle(100% at 50% 50%)'}} transition={{ ease: [1, .02, 1, .42], duration: 10}}>
                  <Image loader={() => srcA} src={srcA} alt="選択肢Aの画像" width={320} height={320} priority/>
                </motion.div>
              : <ChoiceText variant="h2">{choices.A}</ChoiceText>}
            {isNumberCountShown && (
              <CountAnswerBox $isCorrect={isCorrectForA}>
                <AnswerCount variant="body1">{answers?.docs.filter((doc)=>doc.data().answer === 'A').length}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell $isCorrect={isCorrectForB}>
            <AlphabetCircle choice="B" color="blue" />
            {choices.B.startsWith(QImgBaseUrl)
              ? <motion.div initial={{clipPath: 'circle(0 at 50% 50%)'}} animate={{ clipPath: 'circle(100% at 50% 50%)'}} transition={{ ease: [1, .02, 1, .42], duration: 10}}>
              <Image loader={() => srcB} src={srcB} alt="選択肢Bの画像" width={320} height={320} priority/>
            </motion.div>
              : <ChoiceText variant="h2">{choices.B}</ChoiceText>}
            {isNumberCountShown && (
              <CountAnswerBox $isCorrect={isCorrectForB}>
                <AnswerCount variant="body1">{answers?.docs.filter((doc)=>doc.data().answer === 'B').length}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell $isCorrect={isCorrectForC}>
            <AlphabetCircle choice="C" color="yellow" />
            {choices.C.startsWith(QImgBaseUrl)
              ? <motion.div initial={{clipPath: 'circle(0 at 50% 50%)'}} animate={{ clipPath: 'circle(100% at 50% 50%)'}} transition={{ ease: [1, .02, 1, .42], duration: 10}}>
              <Image loader={() => srcC} src={srcC} alt="選択肢Cの画像" width={320} height={320} priority/>
            </motion.div>
              : <ChoiceText variant="h2">{choices.C}</ChoiceText>}
            {isNumberCountShown && (
              <CountAnswerBox $isCorrect={isCorrectForC}>
                <AnswerCount variant="body1">{answers?.docs.filter((doc)=>doc.data().answer === 'C').length}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell $isCorrect={isCorrectForD}>
            <AlphabetCircle choice="D" color="green" />
            {choices.D.startsWith(QImgBaseUrl)
              ? <motion.div initial={{clipPath: 'circle(0 at 50% 50%)'}} animate={{ clipPath: 'circle(100% at 50% 50%)'}} transition={{ ease: [1, .02, 1, .42], duration: 10}}>
              <Image loader={() => srcD} src={srcD} alt="選択肢Dの画像" width={320} height={320} priority/>
            </motion.div>
              : <ChoiceText variant="h2">{choices.D}</ChoiceText>}
            {isNumberCountShown && (
              <CountAnswerBox $isCorrect={isCorrectForD}>
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
