import React from 'react';
import firebase from 'firebase/clientApp';
import AdminLogo from '../../../components/atoms/AdminLogo';
import AdminSidebar from '../../../components/molecules/AdminSidebar';
import AdminQuestion from '../../../components/organisms/AdminQuestion';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Container, Grid } from '@material-ui/core';
import styled from 'styled-components';
// import Image from 'next/image';
// import NextImage from '../../../components/atoms/NextImage';
const db = firebase.firestore();

type LogoURL = {
  url: string;
};

export const getStaticProps: GetStaticProps<LogoURL> = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const imageCollection = await db.collection('images').get();
  const asoviewLogoUrl: string = imageCollection.docs
    .find((doc) => doc.data().name === '管理者画面トップロゴ')
    .data().url;

  return {
    props: { url: asoviewLogoUrl },
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

const Manage: React.FC<LogoURL> = ({ url }) => {
  return (
    <>
      <StyledBox>
        <AdminLogo url={url} />
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
