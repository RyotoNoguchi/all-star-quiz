import { Typography, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const QuestionBox = styled(Grid)`
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.1rem 0.1rem 0.1rem #555;
  color: white;
  text-shadow: 3px 3px 0.1rem black;
  font-size: 2rem;
  background-image: linear-gradient(#2d3870, #586dd4);
  /* margin-right: 3rem;
  margin-left: 3rem; */
  border-radius: 0.5rem;
  position: relative;
`;
const QuestionMark = styled.span`
  position: absolute;
  left: 2rem;
  font-size: 4rem;
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
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgb(255, 76, 76), red);
  position: absolute;
  right: 1rem;
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

`


const Question = ({ post }) => {
  return (
    <>
      <QuestionBox container spacing={3}>
        <QuestionMark>Q</QuestionMark>
        <QuestionText variant="body1">{post.title}</QuestionText>
        <CountDownCircle>9</CountDownCircle>
      </QuestionBox>
      <ChoiceBox item xs={12}>

      </ChoiceBox>
    </>
  );
};

export default Question;
