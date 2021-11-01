/* eslint-disable react-hooks/exhaustive-deps */
import firebase from '../../../../../firebase/clientApp';
import { useRouter } from 'next/router';
import { Table } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import RankingTableContainer from '../../../components/organisms/RankingTableContainer';
import RankingTitleBox from '../../../components/molecules/RankingTitleBox';
import MotionTableBody from '../../../components/molecules/MotionTableBody';
import RankRow from '../../../components/molecules/RankRow';
import AnswerPersonNameBox from '../../../components/molecules/AnswerPersonNameBox';
import AnswerTimeBox from '../../../components/molecules/AnswerTimeBox';
import RankingTitle from '../../../components/atoms/RankingTitle';
import HyphenRotation from '../../../components/atoms/HyphenRotation';
import Rank from '../../../components/atoms/Rank';
import AnswerPersonName from '../../../components/atoms/AnswerPersonName';
import AnswerTime from '../../../components/atoms/AnswerTime';
import { colors, textShadows } from '../../../components/styles/colors';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AnswerInfo } from "../../../components/types/client";
const db = firebase.firestore()

const isLastRow = (idx: number): boolean => {
  return idx + 1 === 10 ? true : false;
};

const Ranking: React.FC = () => {
  const router = useRouter();
  const socket = io('http://localhost:3333');
  const [isRankingRowsShow, setIsRankingRowsShow] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answers, answersLoading, answersError] = useCollectionData(
    db.collection('answers').where('answer', '==', correctAnswer).orderBy('time', 'asc'),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const tbodyVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.4,
      },
    },
  };

  const rankingRowVariant = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i,
      },
    }),
  };

  useEffect(() => {
    socket.on('show_worst_ranking', (questionId) => {
      // setQuestionId(questionId);
      setIsRankingRowsShow(true);
      setIsRankingRowsShow((prev) => {
        if (prev) {
          db.collection('questions').where('questionId', '==', questionId).get().then((snapShot) => {
              snapShot.forEach((doc) => { setCorrectAnswer(doc.data().correctAnswer)})
            })
        }
        return prev
      })
    });
    socket.on('go_to_designated_page', (nextQuestionId) => {
      router.push(`/monitor/question/${nextQuestionId}`)
    })
    return function cleanup() {
      setIsRankingRowsShow(false)
      socket.close()
    }
  }, []);

  const itemNumber = 10;
  const totalNumber = answers?.length;
  const answerList: AnswerInfo[] = [];
  if (totalNumber > 10) {
    const screenTop = totalNumber - itemNumber;
    for (let i = screenTop; i < totalNumber; i++) {
      answerList.push({
        answer: answers[i].answer,
        time: answers[i].time,
        user: answers[i].user,
        rank: (i + 1).toString(),
      });
    }
  } else {
    for (let i = 0; i < 10 - totalNumber; i++) {
      answerList.push({
        answer: '---',
        time: '---',
        user: '---',
        rank: '---',
      });
    }
    for (let i = 0; i < totalNumber; i++) {
      answerList.push({
        answer: answers[i].answer,
        time: answers[i].time,
        user: answers[i].user,
        rank: (i + 1).toString(),
      });
    }
  }

  return (
    <>
      <RankingTableContainer>
        <RankingTitleBox>
          <RankingTitle
            color={colors.rankingTitleBlue}
            textShadow={textShadows.rankingTitleBlue}
          >
            早押しワ<HyphenRotation>ー</HyphenRotation>スト10
          </RankingTitle>
        </RankingTitleBox>
        <Table arial-label="worst ranking table">
          {isRankingRowsShow && (
            <MotionTableBody variants={tbodyVariant}>
              {answerList.map((answerPerson: AnswerInfo, idx: number) => {
                return (
                  <RankRow
                    isChangeColorRow={isLastRow(idx)}
                    variants={rankingRowVariant}
                    iterationCount={idx + 1}
                    custom={idx === 9 ? 4.5 : idx * 0.4}
                    key={idx}
                  >
                    <AnswerPersonNameBox isChangeColorRow={isLastRow(idx)}>
                      <Rank isChangeColorRow={isLastRow(idx)}>
                        {answerPerson.rank}
                      </Rank>
                      <AnswerPersonName isChangeColorRow={isLastRow(idx)}>
                        {answerPerson.user}
                      </AnswerPersonName>
                    </AnswerPersonNameBox>
                    <AnswerTimeBox isChangeColorRow={isLastRow(idx)}>
                      <AnswerTime isChangeColorRow={isLastRow(idx)}>
                        {answerPerson.time}
                      </AnswerTime>
                    </AnswerTimeBox>
                  </RankRow>
                );
              })}
            </MotionTableBody>
          )}
        </Table>
      </RankingTableContainer>
    </>
  );
};

export default Ranking;
