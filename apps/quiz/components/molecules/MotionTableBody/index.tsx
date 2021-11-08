import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';

const StyledMotionTbody = styled(motion.tbody)``;

type Props = {
  variants: Variants
  children: ReactNode
}

const MotionTableBody: React.VFC<Props> = ({ 
  variants,
  children
}) => {
  return (
    <>
      <StyledMotionTbody
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </StyledMotionTbody>
    </>
  );
};

export default MotionTableBody;
