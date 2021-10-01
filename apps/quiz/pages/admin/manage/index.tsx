import firebase from 'firebase/clientApp';
import AdminLogo from "../../../components/atoms/AdminLogo";
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
// import Image from 'next/image';
// import NextImage from '../../../components/atoms/NextImage';
const db = firebase.firestore();

type LogoURL = {
  url: string
}

export const getStaticProps: GetStaticProps<LogoURL> = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
  const imageCollection = await db.collection('images').get();
  const asoviewLogoUrl: string = imageCollection.docs
    .find((doc) => doc.data().name === '管理者画面トップロゴ')
    .data().url;

  return {
    props: { url: asoviewLogoUrl },
  };
};

const Manage: React.FC<LogoURL>= ({url}) => {
  
  return (
    <>
        <AdminLogo url={url}/>
    </>
  );
};

export default React.memo(Manage);
