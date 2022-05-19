type BaseProps = {
  inline?: boolean;
};

type SectionProps = React.PropsWithChildren<BaseProps>;

export default function Section({ children, inline = false }: SectionProps) {
  const gridType = inline ? 'inline-grid' : 'grid';

  return (
    <div className="flex">
      {children}
    </div>
  );
}
