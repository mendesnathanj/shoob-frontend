import cn from 'classnames';

/* eslint-disable sort-keys */
const widths = {
  sm: 'max-w-scren-sm', // 640px
  md: 'max-w-screen-md', // 768px
  lg: 'max-w-screen-lg', // 1024px
  xl: 'max-w-screen-xl', // 1280px
  '2xl': 'max-w-screen-2xl', // 1536px
};

type PageProps = {
  children: React.ReactNode;
  maxWidth?: keyof typeof widths;
}

export default function Page({ children, maxWidth = 'lg' }: PageProps) {
  return (
    <div className={cn(widths[maxWidth], 'mx-auto p-8')}>
      {children}
    </div>
  );
}
