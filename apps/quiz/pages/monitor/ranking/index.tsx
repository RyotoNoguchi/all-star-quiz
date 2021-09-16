import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  TableCellProps,
  TableContainerProps,
  TypographyProps,
  TableRowProps,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';

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

const WorstRankingPushingEarly = styled(TableCell)<TableCellProps>`
  text-align: center;
  font-size: 3.2rem;
  line-height: 1.43;
  border: none;
  font-family: 'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic ProN';
  font-weight: 900;
  color: rgb(0, 21, 255);
  text-shadow: 4px 4px 4px white, -4px -4px 4px white;
  border-collapse: separate;
`;

const rankRowChild = css`
  font-family: 'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic ProN';
  font-weight: 900;
  text-shadow: 4px 4px 4px white, -4px -4px 4px white;
  padding: 4px 4px 4px 40px;
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

const RankRow = styled(TableRow)<TableRowProps>`
  display: flex;
  margin-bottom: 6px;
  height: 78px;
`;

const Ranking = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const numberItemShow = 10;
  const answerPersonTotalNumber = users.length;
  const numberScreenTop = answerPersonTotalNumber - numberItemShow;
  const displayAnswerPeople: User[] = [];
  for (let i = numberScreenTop; i < answerPersonTotalNumber; i++) {
    displayAnswerPeople.push(users[i]);
  }

  return (
    <>
      <RankingTable component={Paper}>
        <Table arial-label="raking table">
          <TableBody id="root">
            <TableRow>
              <WorstRankingPushingEarly
                component="th"
                width="10%"
                variant="head"
                rowSpan={11}
              >
                早押しワ<HyphenRotation>ー</HyphenRotation>スト10
              </WorstRankingPushingEarly>
            </TableRow>
            {displayAnswerPeople.map((answerPerson: User, idx: number) => {
              return (
                <RankRow key={idx}>
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
          </TableBody>
        </Table>
      </RankingTable>
    </>
  );
};

export default Ranking;
