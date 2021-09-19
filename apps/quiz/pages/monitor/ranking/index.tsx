/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableCell,
  Typography,
  TableCellProps,
  TypographyProps,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';
import { io } from 'socket.io-client';
import RankingTable from '../../../components/molecules/RankingTable';
import WorstRankingTitleBox from '../../../components/molecules/WorstRankingTitleBox';
import MotionTableBody from '../../../components/molecules/MotionTableBody';
import RankRow from '../../../components/molecules/RankRow';
import AnswerPersonNameBox from '../../../components/molecules/AnswerPersonNameBox';
import AnswerTimeBox from '../../../components/molecules/AnswerTimeBox';
import WorstRankingTitle from '../../../components/atoms/WorstRankingTitle';
import HyphenRotation from '../../../components/atoms/HyphenRotation';
import Rank from '../../../components/atoms/Rank';
import AnswerPersonName from '../../../components/atoms/AnswerPersonName';
// import {  } from "../../../components/styles/animations";

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = response.data;

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

const animationDefault = css`
  animation-delay: 4.8s;
  animation-duration: 500ms;
  animation-timing-function: linear;
  animation-iteration-count: 6;
  animation-fill-mode: forwards;
`;

const blinkAnswerPersonName = keyframes`
  100% {
    text-shadow: 2px 2px 2px black, -1px -1px 1px black;
    color: rgb(254, 0, 0);
  }
`;

const rankRowTdChildCSS = css`
  font-size: 45px;
  color: rgb(243, 249, 132);
  text-shadow: 2px 2px 2px lightslategray, -2px -2px 2px lightslategray;
`;

const AnswerTime = styled(({ isLastRow, ...props }) => (<Typography {...props} />))<TypographyProps>`
  ${rankRowTdChildCSS}
  animation: ${(props) => props.isLastRow && blinkAnswerPersonName};
  ${animationDefault};
`;

const Ranking = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <RankingTable>
        <WorstRankingTitleBox>
          <WorstRankingTitle>
            早押しワ<HyphenRotation>ー</HyphenRotation>スト10
          </WorstRankingTitle>
        </WorstRankingTitleBox>
        <Table arial-label="raking table">
          {isRankingRowsShow && (
            <MotionTableBody variants={tbodyVariant}>
              {displayAnswerPeople.map((answerPerson: User, idx: number) => {
                return (
                  <RankRow
                    isLastRow={idx + 1 === 10 ? true : false}
                    variants={rankingRowVariant}
                    iterationCount={idx + 1}
                    custom={idx === 9 ? 4.5 : idx * 0.4}
                    key={idx}
                  >
                    <AnswerPersonNameBox
                      isLastRow={idx + 1 === 10 ? true : false}
                    >
                      <Rank isLastRow={idx + 1 === 10 ? true : false}>
                        {answerPerson.id}
                      </Rank>
                      <AnswerPersonName isLastRow={idx + 1 === 10 ? true : false}>
                        {answerPerson.name}
                      </AnswerPersonName>
                    </AnswerPersonNameBox>
                    <AnswerTimeBox isLastRow={idx + 1 === 10 ? true : false}>
                      <AnswerTime isLastRow={idx + 1 === 10 ? true : false}>
                        {answerPerson.id}
                      </AnswerTime>
                    </AnswerTimeBox>
                  </RankRow>
                );
              })}
            </MotionTableBody>
          )}
        </Table>
      </RankingTable>
    </>
  );
};

export default Ranking;
