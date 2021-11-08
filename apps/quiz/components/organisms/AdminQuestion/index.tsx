import React from 'react';
import styled from 'styled-components';
import DetailButton from '../../atoms/DetailButton';
import DeleteButton from '../../atoms/DeleteButton';
import Paper, { PaperProps } from '@mui/material/Paper';
import { Question } from '../../types/question'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';

const buttonWidth = 80
const columns: GridColDef[] = [
  { field: 'id', headerName: 'No.', width: 100 },
  { field: 'question', headerName: '問題文', width: 492 },
  {
    field: 'answer',
    headerName: '正解',
    filterable: false,
    description: '各選択肢は詳細ボタンをクリックして確認できます',
    width: 110,
  },
  {
    field: 'detailBtn',
    headerName: '詳細',
    width: buttonWidth,
    sortable: false,
    filterable: false,
    renderCell: function detailButton(params: GridRenderCellParams) {
      return <DetailButton params={params}>詳細</DetailButton>;
    },
  },
  {
    field: 'deleteBtn',
    headerName: '削除',
    width: buttonWidth,
    sortable: false,
    filterable: false,
    renderCell: function deleteButton(params: GridRenderCellParams) {
      return <DeleteButton params={params}>削除</DeleteButton>;
    },
  },
];

const StyledPaper = styled(Paper)<PaperProps>`
  border-radius: 12px;
  height: 680px;
  margin-top: 12px;
  background-color: #fff;
`;

const AdminQuestion: React.FC<{questions : Question[]}> = ({questions}) => {
  return (
    <>
      <StyledPaper>
        <DataGrid style={{borderRadius: '12px'}}
          rows={questions}  
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </StyledPaper>
    </>
  );
};

export default React.memo(AdminQuestion);
