import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Grid,
  Card,
  Box,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import ReactDOM from 'react-dom';
import AlphabetCircle from '../../../components/atoms/AlphabetCirce';
import RowEl from '../../../components/atoms/RankingNameBox';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';

// 1. tr要素生成(列)●
// 2. td要素生成(名前と順位BOXが入る)●
// 3. span要素生成(順位[BOX)●
// 4. 「3.」にinnerHTML●
// 5. 「4.」を「2.」append●
// 6. p要素(解答者名)を生成●
// 7. 「6.」にinnerHTML●
// 8. 「7.」を「2.」にappend●
// 9. 「2.」を「1.」にappend●
// 10. td要素(解答時間BOX)を生成
// 11. p要素(解答時間)を生成
// 12. 「11.」にinnerHTML
// 13. 「12.」を「10.」にappend
// 14. 「10.」を「1.」にappend
// 15. 「1.」を<TableBody>にappend

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = response.data;
  console.log(data);

  return {
    props: {
      users: data,
    },
  };
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const Ranking = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log('取得名: ' + users[0].name);

  const numberItemShow = 10;
  const answerPersonTotalNumber = users.length;
  const numberScreenTop = answerPersonTotalNumber - numberItemShow;
  const displayAnswerPeople: User[] = [];
  for (let i = numberScreenTop; i < answerPersonTotalNumber; i++) {
    displayAnswerPeople.push(users[i]);
  }
  console.log(displayAnswerPeople);

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Table arial-label="raking table">
            <TableBody id="root">
              <TableRow>
                <TableCell variant="head" rowSpan={11}>
                  早押しワースト10
                </TableCell>
              </TableRow>
              {displayAnswerPeople.map((answerPerson: User, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell colSpan={10}>
                      <Typography variant="body1">
                        {answerPerson.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Ranking;

// わからないこと: React.createElement()で作成した要素をReactのreturn()の中でJSのappendChildみたいに追加するにはどうすればよいか？

// 試したこと: ReactDOM.render() → ブラウザのローディングが無限に続く
//         : return()の中に何もせず入れる → ブラウザのローディングが無限に続く

// 確認したこと: ↓だと問題なく描画される
// const Test = () => React.createElement('td', {}, "山田太郎");

// 考えられる原因 React.createElement()の第三引数にReactコンポーネントを入れると
