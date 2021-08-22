import Head from 'next/head';
import Image from 'next/image';
import firebase from '../../../firebase/clientApp';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'; // firebaseに作ったDBを接続する
import Auth from 'components/Auth';
import VoterList from 'components/VoterList';
import Link from 'next/link';

const TopBackGroundImg = styled.section<{ url: string }>`
  background-image: url(${(p) => p.url});
`;

const TopTitle = styled.h1``;

const Index = () => {
  return (
    <>
      <TopBackGroundImg
        url={'https://dummyimage.com/600x400/4aabcc/0011ff.jpg'}
      >
        <TopTitle>アソビュー オールスター感謝祭2021</TopTitle>
      </TopBackGroundImg>
      ;
    </>
  );
};

export default Index;

// type VoteDocument = {
//   vote: string;
// };
// export function Index() {
//   const db = firebase.firestore();
//   // Desctructure user, loading, and error out of the hook
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
