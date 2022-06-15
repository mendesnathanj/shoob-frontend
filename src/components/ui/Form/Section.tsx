import React, { useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

type BaseProps = {
  className?: string;
  contentClass?: string;
  collapsible?: boolean;
  headerClass?: string;
  onClosing?: () => any;
  onOpening?: () => any;
  title: string | React.ReactElement;
};

const triggerClass = 'flex justify-between text-xl pr-4 border-b-gray-300 border-b py-1 mb-4';

type SectionProps = React.PropsWithChildren<BaseProps>;

type TriggerProps = {
  collapsible: boolean;
  isOpen: boolean;
  onClick: () => void;
  text: string | React.ReactElement;
};

function Trigger({ collapsible, isOpen, onClick, text }: TriggerProps) {
  const iconStyle = isOpen ? {} : { transform: 'rotate(90deg)' };

  return (
    <>
      {text}
      {collapsible && (
        <button className="w-10 h-10" type="button" onClick={onClick}>
          <FontAwesomeIcon className="transition-all text-gray-600" style={iconStyle} icon={faCaretDown} />
        </button>
      )}
    </>
  );
}

export default function Section({
  children,
  className = '',
  contentClass = '',
  collapsible = false,
  headerClass = '',
  onClosing,
  onOpening,
  title
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={className}
    >
      <div
        className={cn(triggerClass, headerClass)}
      >
        <Trigger
          collapsible={collapsible}
          isOpen={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);

            if (isOpen && onClosing) {
              onClosing();
            }
            else if (!isOpen && onOpening) {
              onOpening();
            }
          }}
          text={title}
        />
      </div>
      <motion.div
        initial="collapsed"
        animate={isOpen ? 'open' : 'collapsed'}
        exit="collapsed"
        variants={{
          collapsed: { height: 0, opacity: 0 },
          open: { height: 'auto', opacity: 1 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        className={cn(
          contentClass,
          {
            'pointer-events-none': !isOpen,
          }
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
