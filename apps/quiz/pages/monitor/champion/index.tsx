import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AnswerInfo } from "../../../components/types/client";
import { Answer } from "../../../components/types/question";
import firebase from '../../../../../firebase/clientApp'
import ChampionRankingTableContainer from "../../../components/organisms/ChampingRankingTableContainer";
const db = firebase.firestore()

export const getServerSideProps: GetServerSideProps = async () => {
  const docs = await db.collection("answers").orderBy("time", "asc").get()
  const answers: AnswerInfo[] = []
  docs.forEach(doc => {
    answers.push({
      answer: doc.data().answer,
      time: doc.data().time,
      user: doc.data().user,
    })
  })
  return {
    props: {
      answers
    }
  }
}

const ChampionRanking: React.FC<AnswerInfo[]> = ({ answers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const socket = io('http://localhost:3333');
  const [isRankingRowsShow, setIsRankingRowsShow] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<Answer>(null)
  const [answerList, setAnswerList] = useState<AnswerInfo[]>(answers)
  const numberItemShow = 10;
  const totalNumber = answerList?.length
  
  const Top10AnswerInfo: AnswerInfo[] = []
  if (answerList.length >= 10) {
    for (let i = 0; i < numberItemShow; i++) {
      Top10AnswerInfo.push({
        answer: answerList[i]?.answer,
        time: answerList[i]?.time,
        user: answerList[i]?.user,
        rank: (i + 1).toString(),
      });
    }
  } else {
    for (let i = 0; i < totalNumber; i++) {
      Top10AnswerInfo.push({
        answer: answerList[i]?.answer,
        time: answerList[i]?.time,
        user: answerList[i]?.user,
        rank: (i + 1).toString(),
      });
    }
    for (let i = 0; i < 10 - totalNumber; i++) {
      Top10AnswerInfo.push({
        answer: '---',
        time: '---',
        user: '---',
        rank: '---',
      });
    }
  }
  useEffect(() => {
    socket.open();
    socket.on('show_champion_ranking', (newCorrectAnswer) => {
      setCorrectAnswer(newCorrectAnswer)
      const correctAnswerPeople = answerList.filter(answerList => answerList.answer === newCorrectAnswer)
      setAnswerList(correctAnswerPeople)
      setIsRankingRowsShow(true);
    });
    return function cleanup () {
      socket.close()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerList, correctAnswer]);
  
  return (
    <>
      <ChampionRankingTableContainer answerInfo={Top10AnswerInfo} isRankingRowsShow={isRankingRowsShow} />
    </>
  )
}

export default ChampionRanking