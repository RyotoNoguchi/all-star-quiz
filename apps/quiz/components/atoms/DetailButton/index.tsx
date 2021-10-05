import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {

  GridRenderCellParams,
} from '@mui/x-data-grid';

type Props = {
  params: GridRenderCellParams
}

const DetailButton: React.FC<Props> = ({
    params
  }) => {
  const [open, setOpen] = useState(false) // 確認ダイアログの表示/非表示

  const handleOpen = () => { 
    setOpen(true)
    console.log(params.row.question);
    console.log('問題ID', params.row.id);
  }

  const handleClose = () => { setOpen(false) }

  const editQuestion = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // (ここで削除処理)
    console.log('ターゲット', e.currentTarget.value);
    
    console.log(`問題${id}の情報を変更しました`);
    
    setOpen(false);
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
          <Button onClick={(e) => editQuestion(params.row.id.toString(), e)} variant="contained" color="primary">
            編集する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailButton;
