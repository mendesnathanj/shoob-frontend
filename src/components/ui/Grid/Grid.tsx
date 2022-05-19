type BaseProps = {

};

type GridProps = React.PropsWithChildren<BaseProps>;

export default function Grid({ children }: GridProps) {
  return (
    <div>
      {children}
    </div>
  );
}
