import React, { useEffect, useState } from 'react';
import firebase from 'firebase/clientApp';
import AdminSidebar from '../../../components/molecules/AdminSidebar';
import AdminQuestion from '../../../components/organisms/AdminQuestion';
import AddQuestion from '../../../components/organisms/AddQuestion';
import Image from 'next/image';
import ActiveUserList from '../../../components/organisms/ActiveUserList';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Grid } from '@mui/material';
import { MainContainer, StyledBox } from './styled'
import { Question } from '../../../components/types/question';
import { useAdminManageDisplayContentContext } from '../../../components/contexts/AdminManageContext'
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

// TODO "useContext"を使って`showContent`のstateを管理して、"AdminSidebarの深いところにある"ListItemButton"のonClickで変更できるようにする

const Manage: React.FC<Props> = ({ logo, questions, nextQuestionId }) => {
  const { displayContent } = useAdminManageDisplayContentContext()
  return (
    <>
      <StyledBox>
        <Image src={logo} alt="ロゴ" width={1000} height={80}/>
      </StyledBox>
      <MainContainer container spacing={3}>
        <Grid item xs={3} style={{paddingLeft: '2px', paddingTop: '0', paddingRight: '4px'}}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={9} style={{paddingLeft: '8px', paddingTop: '0'}}>
          {displayContent === 'QUESTION_LIST' && <AdminQuestion questions={questions}  />}
          {displayContent === 'ADD_NEW_QUESTION' && <AddQuestion nextQuestionId={nextQuestionId} />}
          {displayContent === 'ACTIVE_USER_LIST' && <ActiveUserList/>}
        </Grid>
      </MainContainer>
    </>
  );
};

export default React.memo(Manage);
