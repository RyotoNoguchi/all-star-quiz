import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

const StyledMotionTbody = styled(motion.tbody)``;

interface Props {
  variants: Variants
}
const MotionTableBody: React.FC<Props> = ({ 
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
