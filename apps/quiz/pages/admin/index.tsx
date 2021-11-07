import { Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import router from 'next/router';
import firebase from '../../../../firebase/clientApp';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Answer } from '../../components/types/question';

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
  margin-right: 10px;
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-around;
`

const Index: React.FC<Props> = ({cueUrl, countdownUrl, worstRankingUrl, championRankingUrl}) => {
  const socket = io('http://localhost:3333');
  const MONITOR_BASE_URL = '/monitor/question';
  const [questionId, setQuestionId] = useState('1');
  const [correctAnswer, setCorrectAnswer] = useState<Answer>(null)
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
    console.log("現在の問題の正解の選択肢",correctAnswer);
    
    socket.emit('go_to_question_page', {nextQuestionId, correctAnswer});
  };

  const goToWorstRanking = () => {
    setIsReadyGoBtnDisabled(false)
    const worstRankingPagePath = '/monitor/ranking'
    setMonitorCurrentPath(worstRankingPagePath)
    socket.emit('go_to_worst_ranking_page', worstRankingPagePath)
  }

  const goToChampionRanking = () => {
    console.log('チャンピオンボタンが押されました');
    
    setIsReadyGoBtnDisabled(false)
    const championRankingPagePath = '/monitor/champion'
    setMonitorCurrentPath(championRankingPagePath)
    socket.emit('go_to_champion_ranking_page', championRankingPagePath)
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

  const finalReadyGo = () => {
    playCountDown()
    setIsReadyGoBtnDisabled(true)
    socket.emit('final_ready_go');
  }

  const showWorstRanking = () => {
    playWorstRanking()
    setIsReadyGoBtnDisabled(true)
    socket.emit('show_worst_ranking', questionId)
  }

  const showChampionRanking = () => {
    playChampionRanking()
    setIsReadyGoBtnDisabled(true)
    socket.emit('show_champion_ranking', correctAnswer)
  }

  const goToQuestionManage = () => {
    router.push('admin/manage')
  }

  useEffect(() => {
    db.collection('questions').where('questionId', '==', questionId).get().then((snapShot) => {
      snapShot.forEach((doc) => { setCorrectAnswer(doc.data().correctAnswer)})
    })
  }, [correctAnswer, questionId])

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
      <StyledBox>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => displayCuePage()}
        >
          CUE
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => displayTopPage()}
        >
          TOP
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToQuestion()}
        >
          INDEX
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToQuestion()}
        >
          NEXT
        </StyledButton>
        <StyledButton disabled={isReadyGoBtnDisabled} color="secondary" variant="contained" onClick={() => readyGo()}>
          READY-GO
        </StyledButton>
        <StyledButton disabled={isReadyGoBtnDisabled} color="secondary" variant="contained" onClick={() => finalReadyGo()}>
          FINAL READY-GO
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToWorstRanking()}
        >
          Worst Ranking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => showWorstRanking()}
        >
          Open Worst Ranking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToChampionRanking()}
        >
          Champion Ranking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => showChampionRanking()}
        >
          Open Champion Ranking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToQuestionManage()}
        >
          Q Manage
        </StyledButton>
      </StyledBox>
    </>
  );
};

export default Index;
