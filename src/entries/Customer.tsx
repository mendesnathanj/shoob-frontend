import Button, { Variants } from '../components/ui/Button';

export default function Customer() {
  const variants = ['Base', 'Primary', 'Success', 'Danger', 'Warning'];

  return (
    <div className="flex justify-center items-center min-h-screen gap-4">
      {variants.map((variant) => <Button key={variant} variant={variant.toLowerCase() as Variants}>{variant}</Button>)}
    </div>
  );
}
