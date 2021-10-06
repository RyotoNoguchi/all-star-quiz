import React, { useState } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import EditQuestion from '../../organisms/EditQuestion';
import { Question } from "../../types/question";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const DetailButton: React.FC<{params: GridRenderCellParams}> = ({ params }) => {
  const [open, setOpen] = useState(false); // 確認ダイアログの表示/非表示
  console.log('params', params);
  const handleOpen = () => {
    setOpen(true);
    console.log(params.row.choices);
    // console.log('問題ID', params.row.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editQuestion = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('ターゲット', e.currentTarget.value);
    console.log(`問題${id}の情報を変更しました`);
    // setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        詳細
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="dialog-title">問題{params.row.id}の詳細</DialogTitle>
        <DialogContent>
          {/* TODO Formikでplaceholderに現在の問題情報を入れたフォームを初期表示はdisabledで表示。[編集]ボタン押下で編集可&[確定]ボタン表示 */}
          <EditQuestion q={params.row as Question} />
          <DialogContentText id="alert-dialog-description">
            問題{params.row.id}の詳細です
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
            autoFocus
          >
            閉じる
          </Button>
          <Button
            onClick={(e) => editQuestion(params.row.id.toString(), e)}
            variant="contained"
            color="primary"
          >
            編集する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailButton;
