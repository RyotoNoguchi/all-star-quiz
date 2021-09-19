import StyledTableContainer from "../RankingTableContainer";
import RankingTitleBox from "../../molecules/RankingTitleBox";
import RankingTitle from "../../atoms/RankingTitle";
import { colors, textShadows } from "../../styles/colors";

const ChampionRankingTableContainer: React.FC = ({
  children
}) => {
  return (
    <>
      <StyledTableContainer>
        <RankingTitleBox>
          <RankingTitle color={colors.rankingTitleGold} textShadow={textShadows.rankingTitleGold}>
            早押しベスト10
          </RankingTitle>
        </RankingTitleBox>
      </StyledTableContainer>
    </>
  )
}

export default ChampionRankingTableContainer