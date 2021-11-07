import React, { useState } from 'react';
import firebase from 'firebase/clientApp';
import AdminSidebar from '../../../components/molecules/AdminSidebar';
import AdminQuestion from '../../../components/organisms/AdminQuestion';
import AddQuestion from '../../../components/organisms/AddQuestion';
import Image from 'next/image';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Grid } from '@mui/material';
import { MainContainer, StyledBox } from './styled'
import { Question } from '../../../components/types/question';
const db = firebase.firestore();

type Props = {
  logo: string
  questions: Question[]
  nextQuestionId: string
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
      answer: d.data().correctAnswer,
      choices: d.data().choices
    })
  })

  const nextQuestionId = (questions.length + 1).toString()

  return {
    props: {     
      logo: asoviewLogoUrl,
      questions: questions, 
      nextQuestionId,
    },
    revalidate: 10,
  };
};


type ShowContent = 'QUESTION_LIST' | 'ADD_NEW_QUESTION';
const Manage: React.FC<Props> = ({ logo, questions, nextQuestionId }) => {
  const [showContent, setShowContent] = useState<ShowContent>('QUESTION_LIST')
  return (
    <>
      <StyledBox>
        <Image src={logo} alt="ロゴ" width={1000} height={80}/>
      </StyledBox>
      <MainContainer container spacing={3}>
        <Grid item xs={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={9}>
          {showContent === 'QUESTION_LIST' && <AdminQuestion questions={questions}  />}
          {showContent === 'ADD_NEW_QUESTION' && <AddQuestion nextQuestionId={nextQuestionId} />}
        </Grid>
      </MainContainer>
    </>
  );
};

export default React.memo(Manage);
