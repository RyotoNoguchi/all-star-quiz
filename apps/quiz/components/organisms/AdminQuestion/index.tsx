import React from 'react';
import styled from 'styled-components';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import DetailButton from '../../atoms/DetailButton'
import DeleteButton from '../../atoms/DeleteButton'
import Paper from '@mui/material/Paper'


const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 30},
  {field: 'question', headerName: '問題文', width: 150},
  {field: 'answer', headerName: '正解', description: '各選択肢は詳細ボタンをクリックして確認できます', width: 30},
  {field: 'detailBtn', headerName: '詳細', width: 30, sortable: false, renderCell: function detailButton(params: GridRenderCellParams) {
    return <DetailButton rowId={params.id.toString()}>詳細</DetailButton> 
  }},
  {field: 'deleteBtn', headerName: '削除', width: 30, sortable: false, renderCell: function deleteButton(params: GridRenderCellParams) {
    return <DeleteButton rowId={params.id.toString()}>削除</DeleteButton> 
  }},
]

const row = [
  {id: 1, question: 'アソビューのCEOは次の内誰でしょうか？', answer: 'A', }
]

const StyledPaper = styled(Paper)`
  border-radius: 8px;
  height: 655px;
`
const AdminQuestion: React.FC = () => {
  return (
    <>
      <StyledPaper>
        ter
      </StyledPaper>
    </>
  );
};

export default React.memo(AdminQuestion);
