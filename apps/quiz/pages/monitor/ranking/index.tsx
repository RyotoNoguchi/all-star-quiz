/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableCell,
  TableContainer,
  Typography,
  TableCellProps,
  TableContainerProps,
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
import { motion } from 'framer-motion';

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = response.data;
  console.log(data);

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

const AnswerPersonNameBox = styled(TableCell)<TableCellProps>`
  ${rankRowChild};
  width: 80%;
  justify-content: flex-start;
`;

const AnswerTimeBox = styled(TableCell)<TableCellProps>`
  ${rankRowChild};
  width: 15%;
  justify-content: flex-end;
`;

const rankRowTdChildCSS = css`
  font-size: 45px;
  color: rgb(243, 249, 132);
  text-shadow: 2px 2px 2px lightslategray, -2px -2px 2px lightslategray;
`;

const AnswerPersonName = styled(Typography)<TypographyProps>`
  ${rankRowTdChildCSS}
`;

const AnswerTime = styled(Typography)<TypographyProps>`
  ${rankRowTdChildCSS}
`;

const HyphenRotation = styled.span`
  display: inline-block;
  transform: rotate(-90deg);
`;

const RankingTable = styled(TableContainer)<TableContainerProps>`
  background-image: radial-gradient(#11f1fd, skyblue);
  border-radius: 2rem;
  padding: 10px;
  box-shadow: 2px 2px 4px rgb(0 21 255), -2px -2px 4px rgb(0 21 255);
  height: 860px;
  transform: translateY(-20px);
  display: flex;
  align-items: center;
`;

const Rank = styled.span`
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
`;

const flipRows = keyframes`
  0% {
    transform: rotateX(0)
  }

  100% {
    transform: rotateX(360deg)
  }
`;

const RankRow = styled(motion.tr)<{ iterationCount: number }>`
  display: flex;
  margin-bottom: 6px;
  height: 78px;
  animation-delay: 0.3s;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-iteration-count: ${(props) => props.iterationCount};
  animation-name: ${flipRows};
`;

const MotionTableBody = styled(motion.tbody)``;

const WorstRankingTitleBox = styled(Box)<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const WorstRankingTitle = styled(Typography)<TypographyProps>`
  text-align: center;
  font-size: 3.2rem;
  line-height: 1.43;
  border: none;
  font-family: 'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic ProN';
  font-weight: 900;
  color: rgb(0, 21, 255);
  text-shadow: 4px 4px 4px white, -4px -4px 4px white;
  border-collapse: separate;
  width: 80%;
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
        delayChildren: 0.3,
        staggerChildren: 0.5,
      },
    },
  };

  const rankingRowVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
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
            <MotionTableBody
              variants={tbodyVariant}
              initial="hidden"
              animate="visible"
            >
              {displayAnswerPeople.map((answerPerson: User, idx: number) => {
                return (
                  <RankRow
                    variants={rankingRowVariant}
                    iterationCount={idx + 1}
                    key={idx}
                  >
                    <AnswerPersonNameBox>
                      <Rank>{answerPerson.id}</Rank>
                      <AnswerPersonName variant="body1">
                        {answerPerson.name}
                      </AnswerPersonName>
                    </AnswerPersonNameBox>
                    <AnswerTimeBox>
                      <AnswerTime>{answerPerson.id}</AnswerTime>
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
