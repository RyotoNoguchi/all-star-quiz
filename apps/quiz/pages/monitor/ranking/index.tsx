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
// import DOMPurify from 'dompurify';
import DOMPurify from 'dompurify';
import ReactDOM from 'react-dom';
import AlphabetCircle from '../../../components/atoms/AlphabetCirce';

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

const FetchedAnswerPersonName = ({ answerPersonName }) => (
  <td
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answerPersonName) }}
  ></td>
);

const FetchedRanking = ({ rank }) => (
  <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rank) }}></span>
);

const Rank = styled(FetchedRanking)``;
const AnswerPersonName = styled(FetchedAnswerPersonName)``;

const NameBoxEl = React.createElement(
  'td',
  {},
  <Rank rank={1} />,
  <AnswerPersonName answerPersonName="山田太郎" />
);

const RowEl = () => React.createElement('tr', {}, NameBoxEl);
const RowEl2 = () => React.createElement('tr', {}, <FetchedAnswerPersonName answerPersonName={"山田太郎"}/>);
// const RowEl3 = () => React.createElement('div', {}, <AlphabetCircle color="blue" choice="A"/>)

// const Test = () => React.createElement('td', {}, "山田太郎");

// ReactDOM.render(
//   <RowEl/>,
//   document.getElementById('root')
// )

const Ranking = () => {
  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Table arial-label="raking table">
            <TableBody id="root">
              <TableRow>
                <TableCell variant="head" rowSpan={10}>
                  早押しワースト10
                </TableCell>
                {/* <Test /> */}
              </TableRow>
              {/* <RowEl/> */}
              {/* <RowEl2/> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <RowEl3/> */}
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
