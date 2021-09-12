import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import firebase from '../../../firebase/clientApp';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'; // firebaseに作ったDBを接続する
import Auth from '../components/Auth';
import VoterList from '../components/VoterList';
import Link from 'next/link';
import { colors } from '../components/styles/colors';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router'

const db = firebase.firestore();

const TopBackGroundImg = styled.section``;

const TopTitle = styled.h1`
  font-family: 'Dela Gothic One', cursive;
  font-size: 8rem;
  font-weight: 400;
`;

const TopTitlePart = styled.span`
  display: inline-block;
  position: relative;
  background-clip: border-box;
  background: linear-gradient(
    ${colors.titleOrange},
    ${colors.titleYellow},
    ${colors.titleOrange}
  );
  -webkit-background-clip: text; //テキストでくり抜く
  -webkit-text-fill-color: transparent; //くり抜いた部分は背景を表示
  &::after {
    background: none;
    content: attr(data-text);
    left: 0;
    position: absolute;
    text-shadow: 6px 6px 1px ${colors.titlePurple},
      -6px -6px 1px ${colors.titlePurple};
    top: 0;
    z-index: -1;
  }
`;

const Index = () => {

  const title = 'アソビュー オールスター感謝祭 2021';
  const titleArray = title.split(' ');
  const title1stRow = titleArray[0];
  const title2ndRow = titleArray[1];
  const title3rdRow = titleArray[2];
  return (
    <>
      <TopBackGroundImg>
        <TopTitle>
          <TopTitlePart data-text={title1stRow}>{title1stRow}</TopTitlePart>
          <TopTitlePart data-text={title2ndRow}>{title2ndRow}</TopTitlePart>
          <TopTitlePart data-text={title3rdRow}>{title3rdRow}</TopTitlePart>
        </TopTitle>
      </TopBackGroundImg>
    </>
  );
};

export default Index;

// type VoteDocument = {
//   vote: string;
// };
// export function Index() {
//   const db = firebase.firestore();
//   // Destruct user, loading, and error out of the hook
//   // user: 現在サインインしているユーザ情報。undefinedが返ってきたら、サインインしているユーザがないということ
//   // loading: ユーザ情報がloading状態であるかどうかの真偽値
//   // error: ユーザ情報のロードに失敗したときの情報
//   const [user, loading, error] = useAuthState(firebase.auth());
//   console.log(`Loading: ${loading} | Current user: ${user}`);

//   // Votes Collection
//   const [votes, votesLoading, votesError] = useCollection(
//     firebase.firestore().collection('votes'),
//     {}
//   );

//   if (!votesLoading && votes) {
//     votes.docs.map((doc) => console.log(doc.data()));
//   }

//   // Create document function
//   const addVoteDocument = async (vote: string) => {
//     await db.collection('votes').doc(user.uid).set({
//       // 「パラメータとして渡ってきたvoteを'votes"という名前でdocumentをfirebaseに作る。現在サインインしているuserのuidを使って」という意味
//       vote,
//     });
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: '100vh',
//         width: '100vw',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         gridGap: 8,
//         background:
//           'linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
//       }}
//     >
//       <div style={{ flexDirection: 'row', display: 'block' }}>
//         {loading && <h4>Loading...</h4>}
//         {!user && <Auth />}
//         {user && (
//           <>
//             <h1>Pineapple on Pizza?</h1>
//             <button
//               onClick={() => addVoteDocument('yes')}
//               style={{ fontSize: 32, marginRight: 8 }}
//             >
//               ✔️🍍🍕
//             </button>
//             <h3>
//               Pineapple Lovers:{' '}
//               {
//                 votes?.docs?.filter(
//                   (doc) => (doc.data() as VoteDocument).vote === 'yes'
//                 ).length
//               }
//             </h3>
//             <button
//               onClick={() => addVoteDocument('no')}
//               style={{ fontSize: 32, marginRight: 8 }}
//             >
//               ❌🍍🍕
//             </button>
//             <h3>
//               Pineapple Haters:{' '}
//               {
//                 votes?.docs?.filter(
//                   (doc) => (doc.data() as VoteDocument).vote === 'no'
//                 ).length
//               }
//             </h3>

//             <div style={{ marginTop: '64px' }}>
//               <h3>Voters:</h3>
//               <div
//                 style={{
//                   maxHeight: '320px',
//                   overflowY: 'auto',
//                   width: '240px',
//                 }}
//               >
//                 {votes?.docs?.map((doc) => (
//                   <>
//                     <VoterList
//                       id={doc.id}
//                       key={doc.id}
//                       vote={doc.data().vote}
//                     />
//                   </>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
