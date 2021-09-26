/* eslint-disable react-hooks/exhaustive-deps */
import firebase from '../../../../../firebase/clientApp';
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


type AnswerPersonInfo = {
  uid: string
  displayName: string
}

const isLastRow = (idx: number): boolean => {  return idx + 1 === 10 ? true : false }

const Ranking: React.FC = () => {
  const socket = io('http://localhost:3333');
  const [isRankingRowsShow, setIsRankingRowsShow] = useState(false);

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
    socket.on('show_worst_ranking', () => {
      setIsRankingRowsShow(true);
    });
  }, []);

  const [users, usersLoading, usersError] = useCollectionData(
    firebase.firestore().collection("users")
    .orderBy("displayName", "asc"),
    { snapshotListenOptions: { includeMetadataChanges: true },}
  );

  const itemNumber = 10;
  const totalNumber = users?.length
  const screenTop = totalNumber - itemNumber
  const answerPeopleNames: AnswerPersonInfo[] = []
  
  for (let i = screenTop; i < totalNumber; i++) {
      answerPeopleNames.push({
        uid: users[i].uid,
        displayName: users[i].displayName
    });
  }
  
  return (
    <>
      <RankingTableContainer>
        <RankingTitleBox>
          <RankingTitle 
            color={colors.rankingTitleBlue} 
            textShadow={textShadows.rankingTitleBlue}>
            早押しワ<HyphenRotation>ー</HyphenRotation>スト10
          </RankingTitle>
        </RankingTitleBox>
        <Table arial-label="worst ranking table">
          {isRankingRowsShow && (
            <MotionTableBody variants={tbodyVariant}>
              {answerPeopleNames.map((answerPerson: AnswerPersonInfo, idx: number) => {
                return (
                  <RankRow
                    isChangeColorRow={isLastRow(idx)}
                    variants={rankingRowVariant}
                    iterationCount={idx + 1}
                    custom={idx === 9 ? 4.5 : idx * 0.4}
                    key={idx}
                  >
                    <AnswerPersonNameBox isChangeColorRow={isLastRow(idx)}>
                      <Rank isChangeColorRow={isLastRow(idx)}>{idx + 1}</Rank>
                      <AnswerPersonName isChangeColorRow={isLastRow(idx)}>{answerPerson.displayName}</AnswerPersonName>
                    </AnswerPersonNameBox>
                    <AnswerTimeBox isChangeColorRow={isLastRow(idx)}>
                      <AnswerTime isChangeColorRow={isLastRow(idx)}>{idx + 1}</AnswerTime>
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
