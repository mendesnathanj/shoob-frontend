import cn from 'classnames';
import PageSpinner from '../common/PageSpinner';

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
  isLoading?: boolean;
  hasError?: boolean | unknown;
  maxWidth?: keyof typeof widths;
}

export default function Page({
  children,
  isLoading = false,
  hasError = false,
  maxWidth = 'lg'
}: PageProps) {
  if (isLoading) return <PageSpinner />;
  if (hasError) return <p>Something has gone wrong.</p>;

  return (
    <div className={cn(widths[maxWidth], 'mx-auto p-8')}>
      {children}
    </div>
  );
}
