import { useMemo } from 'react';
import { colors } from '../../styles/colors';
import { ChoiceAvatar } from './styled';

type Props = {
  color: 'red' | 'blue' | 'green' | 'yellow';
  choice: 'A' | 'B' | 'C' | 'D';
};

const AlphabetCircle: React.FC<Props> = ({
  color: colorProp = 'red',
  choice,
}) => {
  const circleColor = useMemo(
    () =>
      ({
        red: colors.circleRed,
        blue: colors.circleBlue,
        yellow: colors.circleYellow,
        green: colors.circleGreen,
      }[colorProp]),
    [colorProp]
  );

  return (
    <>
      <ChoiceAvatar $color={circleColor} alt={choice}>
        {choice}
      </ChoiceAvatar>
    </>
  );
};

export default AlphabetCircle;
