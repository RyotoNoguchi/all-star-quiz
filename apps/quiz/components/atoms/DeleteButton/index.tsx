import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { GridRenderCellParams } from '@mui/x-data-grid';
import firebase from "firebase/clientApp";
const db = firebase.firestore()

const DeleteButton: React.FC<{ params: GridRenderCellParams }> = ({ 
    params,
  }) => {
  const [open, setOpen] = useState(false) // 確認ダイアログの表示/非表示
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  const deleteRow = async (id: string): Promise<void> => {
    const docs = await db.collection('questions').where('questionId', '==', id).get()
    const docIds: string[] = []
    docs.forEach(doc => {
      docIds.push(doc.id)
    })
    const documentId = docIds[0]
    await db.collection('questions').doc(documentId).delete()
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'確認'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">問題{params.row.id}を本当に削除しますか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary" autoFocus>
            やめる
          </Button>
          <Button onClick={() => deleteRow(params.row.id)} color="primary">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteButton;