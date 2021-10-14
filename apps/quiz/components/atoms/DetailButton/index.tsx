import React, { useState } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import EditQuestion from '../../organisms/EditQuestion';
import { Question } from '../../types/question';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

const DetailButton: React.FC<{ params: GridRenderCellParams }> = ({
  params,
}) => {
  const [open, setOpen] = useState(false); // 確認ダイアログの表示/非表示
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

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
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
          >
            閉じる
          </Button>
        </DialogActions>
        <DialogContent style={{paddingTop: 0}}>
          <EditQuestion q={params.row as Question} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailButton;
