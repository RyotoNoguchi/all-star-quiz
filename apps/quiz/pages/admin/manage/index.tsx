import React, { useState } from 'react';
import firebase from 'firebase/clientApp';
import AdminLogo from '../../../components/atoms/AdminLogo';
import AdminSidebar from '../../../components/molecules/AdminSidebar';
import AdminQuestion from '../../../components/organisms/AdminQuestion';
import AddQuestion from '../../../components/organisms/AddQuestion';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Grid } from '@material-ui/core';
import styled from 'styled-components';
// import Image from 'next/image';
// import NextImage from '../../../components/atoms/NextImage';
const db = firebase.firestore();

type Question = {
  question: string
  id: string
  answer: string
}

type Props = {
  logo: string
  questions: Question[]
}

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const imageCollection = await db.collection('images').get();
  const asoviewLogoUrl: string = imageCollection.docs
    .find((doc) => doc.data().name === '管理者画面トップロゴ')
    .data().url;

  const questionCollection = await db.collection('questions').orderBy('questionId').get()
  const questions: Question[] = []
  questionCollection.docs.forEach(d => {
    questions.push({
      question: d.data().question,
      id: d.data().questionId,
      answer: d.data().correctAnswer
    })
  })

  return {
    props: {     
      logo: asoviewLogoUrl,
      questions: questions, 
    }
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

type ShowContent = 'QUESTION_LIST' | 'ADD_NEW_QUESTION';
const Manage: React.FC<Props> = ({ logo, questions }) => {
  const [showContent, setShowContent] = useState<ShowContent>('ADD_NEW_QUESTION')
  return (
    <>
      <StyledBox>
        <AdminLogo url={logo} />
      </StyledBox>
      <MainContainer container spacing={3}>
        <Grid item xs={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={9}>
          {showContent === 'QUESTION_LIST' && <AdminQuestion questions={questions}  />}
          {showContent === 'ADD_NEW_QUESTION' && <AddQuestion/>}

        </Grid>
      </MainContainer>
    </>
  );
};

export default React.memo(Manage);
