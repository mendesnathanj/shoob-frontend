import Button, { Variants } from '../components/ui/Button';

export default function Customer() {
  const variants = ['Base', 'Primary', 'Success', 'Danger', 'Warning'];

  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-4">
      <Button variant="base">Dropdown</Button>
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
