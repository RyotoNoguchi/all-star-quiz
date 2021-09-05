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

const handleClick = () => {
  const socket = io('http://localhost:3333');
  console.log('クリックされました');
  const path = '/monitor/cue'
  socket.emit('go_to_cue_page', path);
};

const goToQuestionPage = () => {
  const socket = io('http://localhost:3333');
  console.log('クリックされました');
  const path = '/monitor/question/1';
  socket.emit('go_to_question_page', path);
};

const Index = () => {
  return (
    <>
      <Typography variant="h1">管理者画面です</Typography>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleClick()}
        >
          Cue
        </Button>
        <StyledButton color="primary" variant="contained" onClick={() => goToQuestionPage()}>
          TEST
        </StyledButton>
      </div>
    </>
  );
};

export default Index;
