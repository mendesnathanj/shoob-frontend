import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import cn from 'classnames';

type LinkProps = {
  to: string;
  disabled?: boolean;
  external?: boolean;
} & RouterLinkProps;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((
  {
    children,
    className,
    disabled = false,
    external = false,
    to,
    ...props
  },
  ref
) => {
  const classes = cn(className, disabled && 'pointer-events-none');
  if (external) return <a className={classes} href={to} ref={ref} {...props}>{children}</a>;

  return (
    <RouterLink className={classes} to={to} ref={ref} {...props}>
      {children}
    </RouterLink>
  );
});

export default Link;
