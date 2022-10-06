import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import cn from 'classnames';

type LinkProps = {
  to: string;
  disabled?: boolean;
  external?: boolean;
  openInNewTab?: boolean;
  variant?: 'link' | 'plain';
} & RouterLinkProps;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((
  {
    children,
    className,
    disabled = false,
    external = false,
    openInNewTab = false,
    to,
    variant = 'link',
    ...props
  },
  ref
) => {
  const classes = cn(
    variant === 'link' && 'text-shoob-400 hover:underline underline-offset-2',
    className,
    disabled && 'pointer-events-none'
  );

  const newTabProps = openInNewTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};

  if (external) return <a className={classes} href={to} ref={ref} {...newTabProps} {...props}>{children}</a>;

  return (
    <RouterLink
      className={classes}
      to={to}
      ref={ref}
      {...newTabProps}
      {...props}
    >
      {children}
    </RouterLink>
  );
});

export default Link;
