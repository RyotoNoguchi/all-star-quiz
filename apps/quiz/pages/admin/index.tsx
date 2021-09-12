// url="/admin" ??ファイル名が"index"だと"/admin/index"でURL叩くと無限ローディングになる
import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;
import { io } from 'socket.io-client';
import { useState } from 'react';

const Index = () => {
  const socket = io('http://localhost:3333');
  const MONITOR_BASE_URL = '/monitor/question';
  const [questionId, setQuestionId] = useState('1');
  const [monitorCurrentPath, setMonitorCurrentPath] = useState(`${MONITOR_BASE_URL}/${questionId}`);
  const [isReadyGoBtnDisabled, setIsReadyGoBtnDisabled] = useState(false)
  // const goToCuePage = () => {
  //   console.log('クリックされました');
  //   const path = `${MONITOR_BASE_URL}/cue`;
  //   setMonitorCurrentPath(path)
  //   socket.emit('go_to_cue_page', path);
  // };

  const goToQuestion = () => {
    // 初期ページが"/monitor/question/1
    setIsReadyGoBtnDisabled(false)
    const nextQuestionId = (parseInt(questionId) + 1).toString()
    setQuestionId(nextQuestionId);
    setMonitorCurrentPath(`${MONITOR_BASE_URL}/${nextQuestionId}`)
    socket.emit('go_to_question_page', nextQuestionId);

  };

  const displayCuePage = () => {
    setIsReadyGoBtnDisabled(false)
    socket.emit('display_cue_page');    
  }

  const displayTopPage = () => {
    socket.emit('display_top_page')
  }

  const readyGo = () => {
    setIsReadyGoBtnDisabled(true)
    socket.emit('ready_go');
  };


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
      </div>
    </>
  );
};

export default Index;
