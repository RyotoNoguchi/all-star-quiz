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
import { API_BASE_URL } from '../_app'

const db = firebase.firestore()

type Props = {
  cueUrl: string
  countdownUrl: string
  worstRankingUrl: string
  championRankingUrl: string
  lastQuestionId: number
}

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const soundCollection = await db.collection('sounds').get()
  const cueUrl = soundCollection.docs.find(doc => doc.data().name === 'quizCue')?.data()?.url
  const countdownUrl = soundCollection.docs.find(doc => doc.data().name === 'countdown')?.data()?.url
  const worstRankingUrl = soundCollection.docs.find(doc => doc.data().name === 'worstRanking')?.data()?.url
  const championRankingUrl = soundCollection.docs.find(doc => doc.data().name === 'championRanking')?.data()?.url
  const questionCollection = await db.collection('questions').get()
  const lastQuestionId = questionCollection.docs.length
  return {
    props: {     
      cueUrl,
      countdownUrl,
      worstRankingUrl,
      championRankingUrl,
      lastQuestionId,
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

const Index: React.FC<Props> = ({cueUrl, countdownUrl, worstRankingUrl, championRankingUrl, lastQuestionId}) => {
  const socket = io(API_BASE_URL);
  const MONITOR_BASE_URL = '/monitor/question';
  const [questionId, setQuestionId] = useState('1');
  const [correctAnswer, setCorrectAnswer] = useState<Answer>(null)
  const [monitorCurrentPath, setMonitorCurrentPath] = useState(`${MONITOR_BASE_URL}/${questionId}`);
  const [isReadyGoBtnDisabled, setIsReadyGoBtnDisabled] = useState(false)
  const [isFinalReadyGoBtnDisabled, setIsFinalReadyGoBtnDisabled] = useState(true)
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true)
  const [isWorstRankingBtnDisabled, setIsWorstRankingBtnDisabled] = useState(true)
  const [isOpenWorstRankingBtnDisabled, setIsOpenWorstRankingBtnDisabled] = useState(true)
  const [isChampionRankingDisabled, setIsChampionRankingDisabled] = useState(true)
  const [isOpenChampionRankingBtnDisabled, setIsOpenChampionRankingBtnDisabled] = useState(true)
  const [isQuestionBtnDisabled, setIsQuestionBtnDisabled] = useState(true)
  const [playActive] = useSound(cueUrl, { volume: 0.5 })
  const [playCountDown] = useSound(countdownUrl, { volume: 0.5 })
  const [playWorstRanking] = useSound(worstRankingUrl, { volume: 0.5 })
  const [playChampionRanking] = useSound(championRankingUrl, { volume: 0.5 })

  const goToQuestion = async () => {
    setIsNextBtnDisabled(true)
    // 初期ページが"/monitor/question/1
    playActive()
    setIsReadyGoBtnDisabled(false)
    const nextQuestionId = (parseInt(questionId) + 1).toString()
    setQuestionId(nextQuestionId);
    setMonitorCurrentPath(`${MONITOR_BASE_URL}/${nextQuestionId}`)
    const docs = await db.collection('answers').get()
    const docIds: string[] = []
    docs.forEach(doc => { docIds.push(doc.id)})
    docIds.map(async (docId) => { await db.collection('answers').doc(docId).delete()})
    
    socket.emit('go_to_question_page', {nextQuestionId, correctAnswer});
  };

  const goToWorstRanking = () => {
    setIsWorstRankingBtnDisabled(true)
    setTimeout(() => {
      setIsOpenWorstRankingBtnDisabled(false)
    }, 3000);
    const worstRankingPagePath = '/monitor/ranking'
    setMonitorCurrentPath(worstRankingPagePath)
    socket.emit('go_to_worst_ranking_page', worstRankingPagePath)
  }

  const goToChampionRanking = () => {
    setIsChampionRankingDisabled(true)
    setIsOpenChampionRankingBtnDisabled(false)
    const championRankingPagePath = '/monitor/champion'
    setMonitorCurrentPath(championRankingPagePath)
    socket.emit('go_to_champion_ranking_page', championRankingPagePath)
  }

  const readyGo = () => {
    playCountDown()
    setIsReadyGoBtnDisabled(true)
    socket.emit('ready_go');
  };

  const finalReadyGo = () => {
    playCountDown()
    setIsFinalReadyGoBtnDisabled(true)
    socket.emit('final_ready_go');
  }

  const showWorstRanking = () => {
    playWorstRanking()
    setIsOpenWorstRankingBtnDisabled(true)
    socket.emit('show_worst_ranking', questionId)
  }

  const showChampionRanking = () => {
    setIsOpenChampionRankingBtnDisabled(true)
    playChampionRanking()
    setIsReadyGoBtnDisabled(true)
    socket.emit('show_champion_ranking', correctAnswer)
  }

  const goToQuestionManage = () => {
    router.push('admin/manage')
  }

  useEffect(() => {
    socket.open()
    socket.on('answer_displayed', () => {
      if (!(parseInt(questionId) === lastQuestionId)) {
        setIsWorstRankingBtnDisabled(false)
      } else {
        setTimeout(() => {
          setIsChampionRankingDisabled(false)
        }, 3000);
      }
    })
    socket.on('ranking_display_completed', () => {
      setIsNextBtnDisabled(false)
    })

    db.collection('questions').where('questionId', '==', questionId).get().then((snapShot) => {
      snapShot.forEach((doc) => { setCorrectAnswer(doc.data().correctAnswer)})
    })

    console.log('questionId', questionId);
    console.log('lastQuestionId', lastQuestionId);
    
    if (parseInt(questionId) === lastQuestionId) {
      setIsReadyGoBtnDisabled(true)
      setIsFinalReadyGoBtnDisabled(false)
    }


    return () => {
      socket.close()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          disabled={isNextBtnDisabled}
          onClick={() => goToQuestion()}
        >
          NEXT
        </StyledButton>
        <StyledButton disabled={isReadyGoBtnDisabled} color="secondary" variant="contained" onClick={() => readyGo()}>
          READY-GO
        </StyledButton>
        <StyledButton disabled={isFinalReadyGoBtnDisabled} color="secondary" variant="contained" onClick={() => finalReadyGo()}>
          FINAL READY-GO
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          disabled={isWorstRankingBtnDisabled}
          onClick={() => goToWorstRanking()}
          >
          Worst Ranking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          disabled={isOpenWorstRankingBtnDisabled}
          onClick={() => showWorstRanking()}
          >
          Open Worst Ranking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          disabled={isChampionRankingDisabled}
          onClick={() => goToChampionRanking()}
          >
          Champion Ranking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          disabled={isOpenChampionRankingBtnDisabled}
          onClick={() => showChampionRanking()}
          >
          Open Champion Ranking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          disabled={isQuestionBtnDisabled}
          onClick={() => goToQuestionManage()}
        >
          Q Manage
        </StyledButton>
      </StyledBox>
    </>
  );
};

export default Index;
