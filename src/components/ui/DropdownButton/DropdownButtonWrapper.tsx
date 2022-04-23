import DropdownButton, { DropdownButtonProps, Item, Link } from './DropdownButton';
import { DropdownButtonContextProvider } from './DropdownButtonContext';

function DropdownButtonWrapper({ content = 'Actions', children }: DropdownButtonProps) {
  return (
    <DropdownButtonContextProvider>
      <DropdownButton content={content}>
        {children}
      </DropdownButton>
    </DropdownButtonContextProvider>
  );
}

DropdownButtonWrapper.Item = Item;
DropdownButtonWrapper.Link = Link;

export default DropdownButtonWrapper;
