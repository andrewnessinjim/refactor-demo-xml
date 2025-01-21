import { MotionProps } from "motion/react";

export const slideUpAnimation: MotionProps = {
  initial: {
    opacity: 0,
    translateY: 10,
  },
  animate: {
    opacity: 1,
    translateY: 0,
  },
};
