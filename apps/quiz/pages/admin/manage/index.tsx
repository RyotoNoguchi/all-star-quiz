import React from 'react';
import firebase from 'firebase/clientApp';
import AdminLogo from '../../../components/atoms/AdminLogo';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import AdminSidebar from '../../../components/molecules/AdminSidebar';
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

const StyledContainer = styled(Container)`
  background-image: linear-gradient(#2d3870, #586dd4);
  border-radius: 16px;
  height: 700px;
`;


const Manage: React.FC<LogoURL> = ({ url }) => {
  return (
    <>
      <StyledBox>
        <AdminLogo url={url} />
      </StyledBox>
      <StyledContainer>
        <Grid container spacing={3}>
          <AdminSidebar />
          <Grid item xs={9}></Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default React.memo(Manage);
