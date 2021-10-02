import React from 'react';
import firebase from 'firebase/clientApp';
import AdminLogo from '../../../components/atoms/AdminLogo';
import AdminSidebar from '../../../components/molecules/AdminSidebar';
import AdminQuestion from '../../../components/organisms/AdminQuestion';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { DefaultDeserializer } from 'v8';
// import Image from 'next/image';
// import NextImage from '../../../components/atoms/NextImage';
const db = firebase.firestore();

type LogoURL = {
  url: string;
};

type Question = {
  question: string
  questionId: string
  answer: string
}

// type Props = {
//   logo: LogoURL
//   questions: Question[]
// }


export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const imageCollection = await db.collection('images').get();
  const asoviewLogoUrl: LogoURL = imageCollection.docs
    .find((doc) => doc.data().name === '管理者画面トップロゴ')
    .data().url;

  const questionCollection = await db.collection('questions').get()
  const test: Question[] = []
  questionCollection.docs.forEach(d => {
    test.push({
      question: d.data().question,
      questionId: d.data().questionId,
      answer: d.data().correctAnswer
    })
  })

  const data = {
    url: asoviewLogoUrl,
    questionInfo: test,
  }


  return {
    props: {post: data}
  };
};

const StyledBox = styled(Box)`
  margin-bottom: 28px;
`;

const MainContainer = styled(Grid)`
  background-image: linear-gradient(#2d3870, #586dd4);
  border-radius: 16px;
  height: 700px;
  padding-right: 8px;
`;

const Manage = ({ post }) => {
  console.log(post.questionInfo);
  
  return (
    <>
      <StyledBox>
        <AdminLogo url={post.url} />
      </StyledBox>
      <MainContainer container spacing={3}>
        <Grid item xs={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={9}>
          <AdminQuestion />
        </Grid>
      </MainContainer>
    </>
  );
};

export default React.memo(Manage);
