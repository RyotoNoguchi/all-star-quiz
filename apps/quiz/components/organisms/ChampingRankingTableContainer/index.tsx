import StyledTableContainer from '../RankingTableContainer';
import RankingTitleBox from '../../molecules/RankingTitleBox';
import RankingTitle from '../../atoms/RankingTitle';
import { colors, textShadows } from '../../styles/colors';
import { Table } from '@material-ui/core';
import { AnswerInfo } from "../../types/client";
import MotionTableBody from '../../molecules/MotionTableBody';
import RankRow from '../../molecules/RankRow';
import AnswerPersonNameBox from '../../molecules/AnswerPersonNameBox';
import Rank from '../../atoms/Rank';
import AnswerPersonName from '../../atoms/AnswerPersonName';
import AnswerTimeBox from '../../molecules/AnswerTimeBox';
import AnswerTime from '../../atoms/AnswerTime';

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
interface Props {
  users: User[];
  isRankingRowsShow: boolean;
}

const isFirstRow = (idx: number) => {
  return idx === 0 ? true : false;
};

const ChampionRankingTableContainer: React.FC<Props> = ({
  users,
  isRankingRowsShow,
}) => {
  const tbodyVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        delayChildren: 2.5,
        staggerChildren: 0.35,
        staggerDirection: -1,
      },
    },
  };

  const rankingRowVariant = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
    }),
  };

  return (
    <>
      <StyledTableContainer>
        <RankingTitleBox>
          <RankingTitle
            color={colors.rankingTitleGold}
            textShadow={textShadows.rankingTitleGold}
          >
            早押しベスト10
          </RankingTitle>
        </RankingTitleBox>
        <Table arial-label="champion ranking table">
          {isRankingRowsShow && (
            <MotionTableBody variants={tbodyVariant}>
              {users.map((user: User, idx: number) => {
                return (
                  <RankRow
                    isChangeColorRow={isFirstRow(idx)}
                    variants={rankingRowVariant}
                    iterationCount={0}
                    custom={idx === 0 ? 4 : idx }
                    key={idx}
                  >
                    <AnswerPersonNameBox isChangeColorRow={isFirstRow(idx)} isChampion={true}>
                      <Rank isChangeColorRow={isFirstRow(idx)} isChampion={true}>{user.id}</Rank>
                      <AnswerPersonName isChangeColorRow={isFirstRow(idx)} isChampion={true}>
                        {user.name}
                      </AnswerPersonName>
                    </AnswerPersonNameBox>
                    <AnswerTimeBox isChangeColorRow={isFirstRow(idx)} isChampion={true}>
                      <AnswerTime isChangeColorRow={isFirstRow(idx)} isChampion={true}>
                        {user.id}
                      </AnswerTime>
                    </AnswerTimeBox>
                  </RankRow>
                );
              })}
            </MotionTableBody>
          )}
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default ChampionRankingTableContainer;
