/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';
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

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data: User[] = response.data;

  return {
    props: {
      users: data,
    },
  };
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const isLastRow = (idx: number): boolean => {
  return idx + 1 === 10 ? true : false
}

const Ranking: React.FC = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const socket = io('http://localhost:3333');
  const [isRankingRowsShow, setIsRankingRowsShow] = useState(false);
  const numberItemShow = 10;
  const answerPersonTotalNumber = users.length;
  const numberScreenTop = answerPersonTotalNumber - numberItemShow;
  const displayAnswerPeople: User[] = [];
  for (let i = numberScreenTop; i < answerPersonTotalNumber; i++) {
    displayAnswerPeople.push(users[i]);
  }

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
              {displayAnswerPeople.map((answerPerson: User, idx: number) => {
                return (
                  <RankRow
                    isChangeColorRow={isLastRow(idx)}
                    variants={rankingRowVariant}
                    iterationCount={idx + 1}
                    custom={idx === 9 ? 4.5 : idx * 0.4}
                    key={idx}
                  >
                    <AnswerPersonNameBox isChangeColorRow={isLastRow(idx)}>
                      <Rank isChangeColorRow={isLastRow(idx)}>{answerPerson.id}</Rank>
                      <AnswerPersonName isChangeColorRow={isLastRow(idx)}>{answerPerson.name}</AnswerPersonName>
                    </AnswerPersonNameBox>
                    <AnswerTimeBox isChangeColorRow={isLastRow(idx)}>
                      <AnswerTime isChangeColorRow={isLastRow(idx)}>{answerPerson.id}</AnswerTime>
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
