// url="/admin" ??ファイル名が"index"だと"/admin/index"でURL叩くと無限ローディングになる
import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { useState } from 'react';
import useSound from 'use-sound';

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

const Index = () => {
  const socket = io('http://localhost:3333');
  const MONITOR_BASE_URL = '/monitor/question';
  const [questionId, setQuestionId] = useState('1');
  const [monitorCurrentPath, setMonitorCurrentPath] = useState(`${MONITOR_BASE_URL}/${questionId}`);
  const [isReadyGoBtnDisabled, setIsReadyGoBtnDisabled] = useState(false)
  const [playActive] = useSound('https://firebasestorage.googleapis.com/v0/b/allstar-thanks-giving.appspot.com/o/sound%2Fquiz_cue.mp3?alt=media&token=d671624b-80e4-40c4-ae5d-ce147a1515f2',  { volume: 0.5 })
  const [playCountDown] = useSound('https://firebasestorage.googleapis.com/v0/b/allstar-thanks-giving.appspot.com/o/sound%2Fcountdown.mp3?alt=media&token=1f25a4b9-30b1-4eba-bacd-3dcd86b31f37',  { volume: 0.5 })
  const [playWorstRanking] = useSound('https://firebasestorage.googleapis.com/v0/b/allstar-thanks-giving.appspot.com/o/sound%2Franking.mp3?alt=media&token=44655fd8-347d-4b8d-9e45-15b598b3554f',  { volume: 0.5 })
  const [playChampionRanking] = useSound('https://firebasestorage.googleapis.com/v0/b/allstar-thanks-giving.appspot.com/o/sound%2Fchampion.mp3?alt=media&token=8353cda2-ccc7-4efb-b142-68268437c9c7')

  const goToQuestion = () => {
    // 初期ページが"/monitor/question/1
    playActive()
    setIsReadyGoBtnDisabled(false)
    const nextQuestionId = (parseInt(questionId) + 1).toString()
    setQuestionId(nextQuestionId);
    setMonitorCurrentPath(`${MONITOR_BASE_URL}/${nextQuestionId}`)
    socket.emit('go_to_question_page', nextQuestionId);

  };

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
    socket.emit('show_worst_ranking')
  }

  const showChampionRanking = () => {
    playChampionRanking()
    setIsReadyGoBtnDisabled(true)
    socket.emit('show_champion_ranking')
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
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => showWorstRanking()}
        >
          WorstRanking
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => showChampionRanking()}
        >
          ChampionRanking
        </StyledButton>
      </div>
    </>
  );
};

export default Index;
