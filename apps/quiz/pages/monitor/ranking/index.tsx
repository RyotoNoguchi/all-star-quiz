/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableCell,
  Typography,
  TableCellProps,
  TypographyProps,
  Box,
  BoxProps,
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
import WorstRankingTitle from '../../../components/atoms/WorstRankingTitle';
import HyphenRotation from '../../../components/atoms/HyphenRotation';
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

const rankRowChild = css`
  font-family: 'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic ProN';
  font-weight: 900;
  text-shadow: 4px 4px 4px white, -4px -4px 4px white;
  padding: 4px 4px 4px 10px;
  display: flex;
  align-items: center;
  line-height: 1.25;
  border: 2px solid blue;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(#2d3870, #586dd4);
  box-shadow: 2px 2px 2px rgb(63, 63, 63), -2px -2px 2px rgb(63, 63, 63);
`;

const blinkAnswerPersonNameBox = keyframes`
  100% {
    background-image: radial-gradient(rgb(250, 133, 240),rgb(254, 207, 255));
  }
`;

const blinkAnswerPersonName = keyframes`
  100% {
    text-shadow: 2px 2px 2px black, -1px -1px 1px black;
    color: rgb(254, 0, 0);
  }
`;

const AnswerTimeBox = styled(({ isLastRow, ...props }) => (
  <TableCell {...props} />
))<TableCellProps>`
  ${rankRowChild};
  width: 15%;
  justify-content: flex-end;
  animation-name: ${(props) => props.isLastRow && blinkAnswerPersonNameBox};
  ${animationDefault};
`;

const rankRowTdChildCSS = css`
  font-size: 45px;
  color: rgb(243, 249, 132);
  text-shadow: 2px 2px 2px lightslategray, -2px -2px 2px lightslategray;
`;

const AnswerPersonName = styled(({ isLastRow, ...props }) => (
  <Typography {...props} />
))<TypographyProps>`
  ${rankRowTdChildCSS};
  animation: ${(props) => props.isLastRow && blinkAnswerPersonName};
  ${animationDefault};
`;

const AnswerTime = styled(({ isLastRow, ...props }) => (
  <Typography {...props} />
))<TypographyProps>`
  ${rankRowTdChildCSS}
  animation: ${(props) => props.isLastRow && blinkAnswerPersonName};
  ${animationDefault};
`;

const blinkRank = keyframes`
  100% {
    background-image: radial-gradient(rgb(252, 61, 230),rgb(251, 214, 252));
    box-shadow: 2px 2px 2px rgb(232, 117, 255), -1px -1px 1px rgb(232, 117, 255);
    text-shadow: 2px 2px 2px black, -1px -1px 1px black;
    color: rgb(254, 0, 0);
  }
`;

const Rank = styled(({ isLastRow, ...props }) => <Box {...props} />)<BoxProps>`
  width: 6.25rem;
  background-image: radial-gradient(#2d3870, #2945d0);
  box-shadow: 2px 2px 2px rgb(94 94 94), -2px -2px 2px rgb(94 94 94);
  left: 1.5rem;
  border: 0.2rem solid rgb(2, 2, 169);
  border-radius: 0.6rem;
  text-align: center;
  color: white;
  display: inline-block;
  margin: 10px 40px 10px 10px;
  padding: 8px 0px;
  font-size: 36px;
  padding: 0;
  text-shadow: none;
  animation: ${(props) => props.isLastRow && blinkRank};
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
                      <Rank
                        component="span"
                        isLastRow={idx + 1 === 10 ? true : false}
                      >
                        {answerPerson.id}
                      </Rank>
                      <AnswerPersonName
                        variant="body1"
                        isLastRow={idx + 1 === 10 ? true : false}
                      >
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
