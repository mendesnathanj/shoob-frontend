import routes from '../../routes';
import DropdownButton from '../../ui/DropdownButton';

export default function Home() {
  return (
    <div style={{ margin: 400 }}>
      <DropdownButton label="Actions">
        <DropdownButton.Item onClick={() => console.log('bloop')}>
          Item 1
        </DropdownButton.Item>
        <DropdownButton.Link external to={routes.customer.home()}>
          Item 2
        </DropdownButton.Link>
        <DropdownButton label="Beep">
          <DropdownButton.Item onClick={() => console.log('coopa')}>Subitem 1</DropdownButton.Item>
        </DropdownButton>
      </DropdownButton>
    </div>
  );
}
