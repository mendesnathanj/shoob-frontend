import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type LinkProps = {
  to: string;
  disabled?: boolean;
  external?: boolean;
} & RouterLinkProps;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((
  {
    children,
    disabled,
    external = false,
    to,
    ...props
  },
  ref
) => {
  if (external) return <a href={to} ref={ref} {...props}>{children}</a>;

  return (
    <RouterLink to={to} ref={ref} {...props}>
      {children}
    </RouterLink>
  );
});

export default Link;
