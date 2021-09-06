// url="/admin" ??ファイル名が"index"だと"/admin/index"でURL叩くと無限ローディングになる
import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  /* height: 48px; */
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;
import { io } from 'socket.io-client';
import { useState } from 'react';

const Index = () => {
  const socket = io('http://localhost:3333');
  const MONITOR_BASE_URL = '/monitor';

  const goToCuePage = () => {
    console.log('クリックされました');
    const path = `${MONITOR_BASE_URL}/cue`;
    setMonitorCurrentPath(path)
    socket.emit('go_to_cue_page', path);
  };

  const goToQuestion = (isQuestionIndex: boolean) => {
    let path = ''
    if (isQuestionIndex) { // 出題画面のIndexに戻りたいとき
      setQuestionId('')
      path = `${MONITOR_BASE_URL}/question`
    } else { // 次の問題に行きたいとき
      let nextQuestionId = '' 
      {questionId === '' ? nextQuestionId = '1' : nextQuestionId = (parseInt(questionId) + 1).toString()}
      setQuestionId(nextQuestionId)
      path = `${MONITOR_BASE_URL}/question/${nextQuestionId}`;
    }
    setMonitorCurrentPath(path)
    socket.emit('go_to_question_page', path);
  }

  const [questionId, setQuestionId] = useState('');
  const [monitorCurrentPath, setMonitorCurrentPath] = useState('');
  return (
    <>
      <Typography variant="h1">管理者画面です</Typography>
      <Typography variant="h6">現在のモニターのパス: {monitorCurrentPath === '' ? '/' : monitorCurrentPath}</Typography>
      <Typography variant="h6">現在の問題番号: {questionId === '' ? 0 : questionId}</Typography>
      {/* TODO HStackを導入して横のmargin開ける */}
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => goToCuePage()}
        >
          Cue
        </Button>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToQuestion(true)}
        >
          GO TO Q-INDEX
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => goToQuestion(false)}
        >
          GO TO NEXT-Q
        </StyledButton>
      </div>
    </>
  );
};

export default Index;
