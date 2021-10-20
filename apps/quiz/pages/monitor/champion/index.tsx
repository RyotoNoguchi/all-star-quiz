/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import { io } from 'socket.io-client';
import { AnswerInfo } from "../../../components/types/client";
import axios from 'axios';
import ChampionRankingTableContainer from "../../../components/organisms/ChampingRankingTableContainer";

// TODO SSRで"answers"コレクションをとってきてpropsとしてわたす
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

const ChampionRanking: React.FC = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const socket = io('http://localhost:3333');
  const [isRankingRowsShow, setIsRankingRowsShow] = useState(false);
  const numberItemShow = 10;
  const answerPersonTotalNumber = users.length;
  const numberScreenTop = answerPersonTotalNumber - numberItemShow;
  const displayAnswerPeople: User[] = [];
  for (let i = numberScreenTop; i < answerPersonTotalNumber; i++) {
    displayAnswerPeople.push(users[i]);
  }

  useEffect(() => {
    socket.on('show_champion_ranking', () => {
      setIsRankingRowsShow(true);
    });
  }, []);
  
  return (
    <>
      <ChampionRankingTableContainer users={displayAnswerPeople} isRankingRowsShow={isRankingRowsShow} />
    </>
  )
}

export default ChampionRanking