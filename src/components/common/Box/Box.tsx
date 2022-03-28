type BoxOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
};

type BoxProps<E extends React.ElementType> = BoxOwnProps<E> & Omit<React.ComponentProps<E>, keyof BoxOwnProps<E>>;

export default function Box<E extends React.ElementType ='div'>({ children, as }: BoxProps<E>) {
  const Component = as || 'div';
  return <Component>{children}</Component>;
}
