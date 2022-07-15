import cn from 'classnames';
import { forwardRef } from 'react';
import Spinner from './Spinner';

type IconProps = |
  { startIcon?: JSX.Element, endIcon?: never } |
  { startIcon?: never, endIcon?: JSX.Element };

type FullWidth = boolean | { xs?: boolean, sm?: boolean, md?: boolean, lg?: boolean }

type BaseProps = {
  fullWidth?: FullWidth;
  loading?: boolean;
  outlined?: boolean;
  submit?: boolean;
  variant?: 'base' | 'danger' | 'primary' | 'success' | 'warning';
} & IconProps;

export type ButtonProps = BaseProps & React.HTMLProps<HTMLButtonElement>;

const baseClasses = `inline-flex items-center justify-center py-0.5 px-2 whitespace-nowrap tracking-wide
appearance-none min-w-[100px] min-h-[36px] rounded shadow-sm transition-all duration-200
disabled:cursor-not-allowed disabled:transition-none disabled:opacity-75 disabled:text-inherit shadow
`;

const variantClasses = {
  base: 'bg-gray-300 hover:bg-gray-400 hover:text-gray-100 fill-gray-600 disabled:bg-gray-200',
  danger: 'bg-red-500 hover:bg-red-600 text-white fill-red-700 disabled:text-white disabled:bg-red-400',
  primary: 'bg-shoob-500 hover:bg-shoob-600 text-white fill-shoob-700 disabled:text-white disabled:bg-shoob-300',
  success: 'bg-green-600 hover:bg-green-700 text-white fill-green-700 disabled:text-white disabled:bg-green-500',
  warning: 'bg-amber-400 hover:bg-yellow-500 text-black fill-amber-700 disabled:bg-amber-300',
};

const baseOutline = 'bg-white shadow-none border border-solid hover:text-white disabled:bg-transparent';

const outlineClasses = {
  base: cn(
    baseOutline,
    'border-gray-400 text-gray-600 hover:bg-gray-400 disabled:text-gray-400 disabled:border-gray-200'
  ),
  danger: cn(
    baseOutline,
    'border-red-500 hover:bg-red-500 text-red-500 disabled:text-red-400'
  ),
  primary: cn(
    baseOutline,
    'border-shoob-500 hover:bg-shoob-400 text-shoob-500 disabled:text-shoob-400'
  ),
  success: cn(
    baseOutline,
    'border-green-600 hover:bg-green-600 text-green-600 disabled:text-green-500'
  ),
  warning: cn(
    baseOutline,
    'border-amber-400 hover:bg-amber-400 text-amber-500 hover:text-black disabled:text-amber-500'
  ),
};

const fullWidthClasses = (fullWidth: FullWidth) => {
  if (!fullWidth) return '';

  const base = 'min-w-full';
  if (fullWidth === true) return base;
  if (fullWidth.xs) return `${base} sm:min-w-[128px]`;
  if (fullWidth.sm) return `${base} md:min-w-[128px]`;
  if (fullWidth.md) return `${base} lg:min-w-[128px]`;
  if (fullWidth.lg) return `${base} xl:min-w-[128px]`;

  return '';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  disabled = false,
  endIcon,
  fullWidth = false,
  loading = false,
  outlined = false,
  startIcon,
  submit = false,
  variant = 'base',
  ...rest
}, ref) => (
  <button
    ref={ref}
    className={cn(
      baseClasses,
      fullWidthClasses(fullWidth),
      variantClasses[variant],
      outlined && outlineClasses[variant],
      className,
    )}
    {...rest}
    type={submit ? 'submit' : 'button'}
    disabled={disabled || loading}
  >
    {startIcon && <span className="mr-2">{startIcon}</span>}
    {loading ? <Spinner color="inherit" size="sm" /> : children}
    {endIcon && <span className="ml-2">{endIcon}</span>}
  </button>
));

export default Button;
