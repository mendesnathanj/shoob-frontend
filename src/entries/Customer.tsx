import Button from '../components/ui/Button';
import DropdownButton from '../components/ui/DropdownButton';

export default function Customer() {
  const variants = ['Base', 'Primary', 'Success', 'Danger', 'Warning'];

  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-4">
      <DropdownButton content="Actions">
        <DropdownButton.Item onClick={() => console.log('Woohoo!')}>
          Click me!
        </DropdownButton.Item>
        <DropdownButton.Link to="/admin/">
          Click this
        </DropdownButton.Link>
      </DropdownButton>
      <div className="flex gap-4">
        {variants.map((variant) => (
          <Button key={variant} variant={variant.toLowerCase() as Variants}>{variant}</Button>
        ))}
      </div>
      <div className="flex gap-4">
        {variants.map((variant) => (
          <Button key={variant} loading variant={variant.toLowerCase() as Variants}>{variant}</Button>
        ))}
      </div>
      <div className="flex gap-4">
        {variants.map((variant) => (
          <Button key={variant} disabled variant={variant.toLowerCase() as Variants}>{variant}</Button>
        ))}
      </div>
      <div className="flex gap-4 flex-wrap">
        {variants.map((variant) => (
          <Button key={variant} outlined variant={variant.toLowerCase() as Variants}>{variant}</Button>
        ))}
      </div>
      <div className="flex gap-4">
        {variants.map((variant) => (
          <Button key={variant} disabled outlined variant={variant.toLowerCase() as Variants}>{variant}</Button>
        ))}
      </div>
      <div className="flex gap-4">
        {variants.map((variant) => (
          <Button key={variant} loading outlined variant={variant.toLowerCase() as Variants}>{variant}</Button>
        ))}
      </div>
    </div>
  );
}
