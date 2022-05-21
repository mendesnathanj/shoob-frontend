import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Collapsible, { CollapsibleProps } from 'react-collapsible';

type ignoredProps =
  'easing' |
  'trigger' |
  'triggerDisabled' |
  'open' |
  'openedClassName' |
  'triggerClassName' |
  'triggerOpenedClassName' |
  'transitionTime';
type BaseProps = {
  containerClassName?: string;
  title: string | React.ReactElement;
  collapsible?: boolean;
} & Omit<CollapsibleProps, ignoredProps>;

const triggerClass = 'flex justify-between text-xl pr-4 border-b-gray-300 border-b py-1 mb-4';

type SectionProps = React.PropsWithChildren<BaseProps>;

type TriggerProps = {
  collapsible: boolean;
  isOpen: boolean;
  text: string;
};

function Trigger({ collapsible, isOpen, text }: TriggerProps) {
  const iconStyle = isOpen ? {} : { transform: 'rotate(90deg)' };

  return (
    <>
      {text}
      {collapsible && (
        <button className="w-6 h-6" type="button">
          <FontAwesomeIcon className="transition-all text-gray-600" style={iconStyle} icon={faCaretDown} />
        </button>
      )}
    </>
  );
}

export default function Section({
  children,
  className,
  containerClassName = '',
  collapsible = false,
  onClosing,
  onOpening,
  title,
  ...rest
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      className={className}
      openedClassName={className}
      onClosing={() => {
        if (onClosing) onClosing();
        setIsOpen(false);
      }}
      onOpening={() => {
        if (onOpening) onOpening();
        setIsOpen(true);
      }}
      open
      transitionTime={300}
      trigger={<Trigger collapsible={collapsible} isOpen={isOpen} text={title} />}
      triggerClassName={`${triggerClass} ${!collapsible ? 'cursor-auto' : 'cursor-pointer'}`}
      triggerOpenedClassName={`${triggerClass} ${!collapsible ? 'cursor-auto' : 'cursor-pointer'}`}
      triggerDisabled={!collapsible}
      {...rest}
      contentOuterClassName={isOpen ? '!overflow-visible' : ''}
    >
      {children}
    </Collapsible>
  );
}
