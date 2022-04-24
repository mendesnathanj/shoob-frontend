import Component, { DropdownButtonProps, Item, Link } from './Component';
import { DropdownButtonContextProvider } from './DropdownButtonContext';

function DropdownButton({ content = 'Actions', children }: DropdownButtonProps) {
  return (
    <DropdownButtonContextProvider>
      <Component content={content}>
        {children}
      </Component>
    </DropdownButtonContextProvider>
  );
}

DropdownButton.Item = Item;
DropdownButton.Link = Link;

export default DropdownButton;
