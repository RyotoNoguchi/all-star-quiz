import {AnswerPersonNameText} from './styled'

type Props = {
  isChampion?: boolean
  isChangeColorRow: boolean
}

const AnswerPersonName: React.FC<Props> = ({ 
  isChampion = false,
  isChangeColorRow,
  children
  }) => {
    return (
      <>
        <AnswerPersonNameText variant="body1" $isChangeColorRow={isChangeColorRow} $isChampion={isChampion}>
          {children}
        </AnswerPersonNameText>
      </>
    )
  };

export default AnswerPersonName;
