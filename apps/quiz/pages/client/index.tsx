import firebase from '../../../../firebase/clientApp';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'; // firebaseに作ったDBを接続する
import { colors } from '../../components/styles/colors';
import ChoiceButton from '../../components/atoms/ChoiceButton'
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import { settings } from 'cluster';

const ClientContainer = styled(Container)<ContainerProps>`
  /* transform: translateY(-30px); */
`;

const TopTitle = styled(Typography)<TypographyProps>`
  font-family: 'Dela Gothic One', cursive;
  font-size: 2rem;
  font-weight: 400;
`;

const TopTitlePart = styled(Box)<BoxProps>`
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

const StyledBox = styled(Box)`
  text-align: center;
  margin-top: 50px;
`
const title = 'アソビュー オールスター感謝祭 2021';
const titleArray = title.split(' ');
const title1stRow = titleArray[0];
const title2ndRow = titleArray[1];
const title3rdRow = titleArray[2];

type ChoiceType = 'A' | 'B' | 'C' | 'D'

const Home: React.FC = () => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading: ", loading, "|", "Current user: ", user );

  const [answers, answersLoading, answersError] = useCollection(
    firebase.firestore().collection('answers'),
    {}
  );
  const addAnswerDocument = async (answer: ChoiceType) => {
    await db.collection('answers').doc(user.uid).set({
      // "answers"テーブルに現在サインインしているユーザーのUIDで新しいレコードを作成する
      answer,
    });
  }

  if (!answersLoading && answers) {
    answers.docs.map((doc) => console.log(doc.data()));
  }
  return (
    <>
      <ClientContainer disableGutters>
        <TopTitle variant="h1">
          <TopTitlePart data-text={title1stRow}>{title1stRow}</TopTitlePart>
          <TopTitlePart data-text={title2ndRow}>{title2ndRow}</TopTitlePart>
          <TopTitlePart data-text={title3rdRow}>{title3rdRow}</TopTitlePart>
        </TopTitle>
        <StyledBox>
          <ChoiceButton addAnswerDocument={addAnswerDocument} choice="A" buttonColor="red"/>
          <ChoiceButton addAnswerDocument={addAnswerDocument} choice="B" buttonColor="blue"/>
          <ChoiceButton addAnswerDocument={addAnswerDocument} choice="C" buttonColor="yellow"/>
          <ChoiceButton addAnswerDocument={addAnswerDocument} choice="D" buttonColor="green"/>
        </StyledBox>
      </ClientContainer>
    </>
  );
};

export default Home;
