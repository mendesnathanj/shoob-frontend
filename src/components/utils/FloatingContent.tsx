import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';

const ANIMATION = {
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0, scale: 0.85 },
  transition: { damping: 20, stiffness: 300, type: 'spring' },
};

type BaseProps = {
  animated?: boolean;
  open?: boolean;
} & AnimationEvent;

type FloatingContentProps = React.PropsWithChildren<BaseProps>;

const FloatingContent = forwardRef<HTMLDivElement, FloatingContentProps>(({
  animated = true,
  open = false,
  children,
  ...rest
}, ref) => {
  const animation = animated ? ANIMATION : {};

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="border"
          ref={ref}
          {...animation}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default FloatingContent;
