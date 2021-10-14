import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { useState } from 'react';
import useSound from 'use-sound';
import router from 'next/router';
import firebase from '../../../../firebase/clientApp';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
const db = firebase.firestore()

type Props = {
  cueUrl: string
  countdownUrl: string
  worstRankingUrl: string
  championRankingUrl: string
}

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const soundCollection = await db.collection('sounds').get()
  const cueUrl = soundCollection.docs.find(doc => doc.data().name === 'quizCue')?.data()?.url
  const countdownUrl = soundCollection.docs.find(doc => doc.data().name === 'countdown')?.data()?.url
  const worstRankingUrl = soundCollection.docs.find(doc => doc.data().name === 'worstRanking')?.data()?.url
  const championRankingUrl = soundCollection.docs.find(doc => doc.data().name === 'championRanking')?.data()?.url
  return {
    props: {     
      cueUrl,
      countdownUrl,
      worstRankingUrl,
      championRankingUrl,
    },
  };
}

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

const Index: React.FC<Props> = ({cueUrl, countdownUrl, worstRankingUrl, championRankingUrl}) => {
  const socket = io('http://localhost:3333');
  const MONITOR_BASE_URL = '/monitor/question';
  const [questionId, setQuestionId] = useState('1');
  const [monitorCurrentPath, setMonitorCurrentPath] = useState(`${MONITOR_BASE_URL}/${questionId}`);
  const [isReadyGoBtnDisabled, setIsReadyGoBtnDisabled] = useState(false)
  const [playActive] = useSound(cueUrl, { volume: 0.5 })
  const [playCountDown] = useSound(countdownUrl, { volume: 0.5 })
  const [playWorstRanking] = useSound(worstRankingUrl, { volume: 0.5 })
  const [playChampionRanking] = useSound(championRankingUrl, { volume: 0.5 })

  const goToQuestion = async () => {
    // 初期ページが"/monitor/question/1
    playActive()
    setIsReadyGoBtnDisabled(false)
    const nextQuestionId = (parseInt(questionId) + 1).toString()
    setQuestionId(nextQuestionId);
    setMonitorCurrentPath(`${MONITOR_BASE_URL}/${nextQuestionId}`)
    const docs = await db.collection('test').get()
    const docIds: string[] = []
    docs.forEach(doc => { docIds.push(doc.id)})
    // TODO ↓の「test」を「answers」に変更
    docIds.map(async (docId) => { await db.collection('test').doc(docId).delete()})
    socket.emit('go_to_question_page', nextQuestionId);
  };

  const goToWorstRanking = () => {
    setIsReadyGoBtnDisabled(false)
    const worstRankingPagePath = '/monitor/ranking'
    setMonitorCurrentPath(worstRankingPagePath)
    socket.emit('go_to_worst_ranking_page', worstRankingPagePath)
  }

  const displayCuePage = () => {
    playActive()
    setIsReadyGoBtnDisabled(false)
    socket.emit('display_cue_page');    
  }

  const displayTopPage = () => {
    socket.emit('display_top_page')
  }

  const readyGo = () => {
    playCountDown()
    setIsReadyGoBtnDisabled(true)
    socket.emit('ready_go');
  };

  const showWorstRanking = () => {
    playWorstRanking()
    setIsReadyGoBtnDisabled(true)
    socket.emit('show_worst_ranking', questionId)
  }

  const showChampionRanking = () => {
    playChampionRanking()
    setIsReadyGoBtnDisabled(true)
    socket.emit('show_champion_ranking')
  }

  const goToQuestionManage = () => {
    router.push('admin/manage')
  }


  return (
    <>
      <Typography variant="h1">管理者画面です</Typography>
      <Typography variant="h6">
        現在のモニターのパス:{' '}
        {monitorCurrentPath === '' ? '/' : monitorCurrentPath}
      </Typography>
      <Typography variant="h6">
        現在の問題番号: {questionId === '' ? 0 : questionId}
      </Typography>
      {/* TODO HStackを導入して横のmargin開ける */}
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => displayCuePage()}
        >
          CUE
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => displayTopPage()}
        >
          TOP
        </Button>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToQuestion()}
        >
          GO TO Q-INDEX
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToQuestion()}
        >
          GO TO NEXT-Q
        </StyledButton>
        <Button disabled={isReadyGoBtnDisabled} color="secondary" variant="contained" onClick={() => readyGo()}>
          READY GO !
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => goToWorstRanking()}
        >
          Go To Worst Ranking
        </Button>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => showWorstRanking()}
        >
          ShowWorstRanking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => showChampionRanking()}
        >
          ShowChampionRanking
        </StyledButton>
        <Button
          color="primary"
          variant="contained"
          onClick={() => goToQuestionManage()}
        >
          Q Manage Page
        </Button>
      </div>
    </>
  );
};

export default Index;
