import { ReactNode } from 'react';
import { AnswerTimeText } from './styled';

type Props = {
  isChangeColorRow: boolean;
  isChampion?: boolean;
  children: ReactNode;
};

const AnswerTime: React.VFC<Props> = ({
  isChangeColorRow,
  isChampion = false,
  children,
}) => {
  return (
    <>
      <AnswerTimeText
        $isChangeColorRow={isChangeColorRow}
        $isChampion={isChampion}
      >
        {children}
      </AnswerTimeText>
    </>
  );
};

export default AnswerTime;
