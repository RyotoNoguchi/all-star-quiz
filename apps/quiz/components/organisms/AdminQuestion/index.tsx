import React from 'react';
import styled from 'styled-components';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import DetailButton from '../../atoms/DetailButton';
import DeleteButton from '../../atoms/DeleteButton';
import Paper from '@mui/material/Paper';

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
      console.log(params);
      console.log(params.id);
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
      return <DeleteButton rowId={params.id.toString()}>削除</DeleteButton>;
    },
  },
];

type Question =  {
  id: string
  question: string
  answer: string
}

const StyledPaper = styled(Paper)`
  border-radius: 12px;
  height: 680px;
  margin-top: 12px;
  /* background-image: linear-gradient(#4161eef9, #cfd4ec); */
  background-color: #fff;
`;

const AdminQuestion: React.FC<{questions : Question[]}> = ({questions}) => {
  return (
    <>
      <StyledPaper>
        <DataGrid style={{borderRadius: '12px'}}
          rows={questions}  
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </StyledPaper>
    </>
  );
};

export default React.memo(AdminQuestion);
