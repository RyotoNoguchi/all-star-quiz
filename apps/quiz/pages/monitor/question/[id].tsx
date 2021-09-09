import { Typography, Grid, Card, Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Colors, colors } from '../../../components/styles/colors';
import AlphabetCircle from '../../../components/atoms/AlphabetCirce/index';
import { io } from 'socket.io-client';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getStaticPaths = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const data = response.data;

  const paths = data.map((post: Post) => {
    return {
      params: { id: post.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = await response.json();
  console.log('データ');
  return {
    props: { post: data },
  };
};

const QuestionContainer = styled(Grid)`
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.1rem 0.1rem 0.1rem #555;
  color: white;
  text-shadow: 3px 3px 0.1rem black;
  font-size: 2rem;
  background-image: linear-gradient(#2d3870, #586dd4);
  margin-bottom: 48px;
  border-radius: 0.5rem;
  position: relative;
`;

const QuestionBox = styled(Grid)`
  margin-bottom: 48px;
`;

const QuestionMark = styled.span`
  position: absolute;
  top: -6px;
  left: 12px;
  font-size: 60px;
  font-weight: 900;
  color: rgb(121, 184, 252);
  text-shadow: 0 0 4px skyblue, 0 -2px #fff;
`;

const QuestionText = styled(Typography)`
  margin: 0;
  line-height: 3rem;
  font-size: 2rem;
`;

const CountDownCircle = styled.span`
  width: 3.5rem;
  height: 3.5rem;
  font-size: 2.5rem;
  border-radius: 50%;
  margin: 0;
  position: relative;
  right: 8px;
  top: 8px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgb(255, 76, 76), red);
  position: absolute;
  color: white;
  text-shadow: 3px 3px 3px black;
  box-shadow: 1px 1px 1px 1px black;
`;

const ChoiceBox = styled(Grid)`
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem !important;
  position: relative;
  background-color: rgba(4, 83, 255, 0.797);
  border-radius: 1rem;
`;

const QuestionCell = styled(Card)`
  border: none;
  color: black;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 2px 2px 2px 2px #5f72d1;
  text-shadow: 2px 2px #555;
  font-size: 4rem;
  color: white;
  background-image: linear-gradient(#2d3870, #586dd4);
`;

const ChoiceText = styled(Typography)``;

const CountAnswerBox = styled(Box)`
  width: 80px;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  font-size: 2.5rem;
  border: 2px solid grey;
  border-radius: 12px;
  line-height: 2.5rem;
  box-shadow: 2px 2px 2px black;
  text-shadow: 2px 2px #555;
  background-image: linear-gradient(
    to right,
    rgb(125, 138, 255),
    rgb(185, 231, 249)
  );
  color: blue;
`;

const AnswerCount = styled(Typography)`
  font-size: 36px;
  line-height: normal;
  padding: 0;
  margin: 0;
  transform: translate(25%, 0);
`;

const Question = ({ post }) => {
  const socket = io('http://localhost:3333');
  const [countdownTimeSec, setCountdownTimeSec] = useState(10);
  const [isNumberCountShown, setIsNumberCountShown] = useState(false);

  useEffect(() => {
    socket.on('countdown', () => {
      const timerId = setInterval(() => {
        setCountdownTimeSec((countdownTimeSec) => countdownTimeSec - 1);
        setCountdownTimeSec((countdownTimeSec) => {
          if (countdownTimeSec === 0) {
            clearInterval(timerId);
            setTimeout(() => {
              setIsNumberCountShown(true)
            }, 2400);
          }
          return countdownTimeSec;
        });
      }, 1000);
    });
  }, []);

  return (
    <>
      <QuestionContainer container spacing={3}>
        <QuestionBox item xs={12}>
          <QuestionMark>Q</QuestionMark>
          <QuestionText variant="h1">{post.title}</QuestionText>
          <CountDownCircle>{countdownTimeSec}</CountDownCircle>
        </QuestionBox>
        <ChoiceBox item xs={6}>
          <QuestionCell>
            <AlphabetCircle choice="A" color="red" />
            <ChoiceText variant="h2">{post.title}</ChoiceText>
            {isNumberCountShown && (
              <CountAnswerBox>
                <AnswerCount variant="body1">{post.id}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell>
            <AlphabetCircle choice="B" color="blue" />
            <ChoiceText variant="h2">{post.title}</ChoiceText>
            {isNumberCountShown && (
              <CountAnswerBox>
                <AnswerCount variant="body1">{post.id}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell>
            <AlphabetCircle choice="C" color="yellow" />
            <ChoiceText variant="h2">{post.title}</ChoiceText>
            {isNumberCountShown && (
              <CountAnswerBox>
                <AnswerCount variant="body1">{post.id}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
        <ChoiceBox item xs={6}>
          <QuestionCell>
            <AlphabetCircle choice="D" color="green" />
            <ChoiceText variant="h2">{post.title}</ChoiceText>
            {isNumberCountShown && (
              <CountAnswerBox>
                <AnswerCount variant="body1">{post.id}</AnswerCount>
              </CountAnswerBox>
            )}
          </QuestionCell>
        </ChoiceBox>
      </QuestionContainer>
    </>
  );
};

export default Question;
