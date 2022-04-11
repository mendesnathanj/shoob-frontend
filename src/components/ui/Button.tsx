import cn from 'classnames';

const baseClasses = `inline-flex items-center justify-center leading-[3.8rem]
whitespace-nowrap tracking-wide font-bold pt-1 appearance-none
min-w-[128px] px-4 rounded-md shadow-sm transition-all duration-200 disabled:cursor-not-allowed
disabled:transition-none disaabled:opacity-75 disabled:bg-gray-300 disabled:text-inherit
`;

export type Variants = 'base' | 'danger' | 'primary' | 'success' | 'warning';

const variantClasses = {
  base: 'bg-gray-300 hover:bg-gray-400 hover:text-gray-100',
  danger: 'bg-red-500 hover:bg-red-600 shadow-red-500 text-white',
  primary: 'bg-shoob-500 hover:bg-shoob-600 shadow-shoob-500 text-white',
  success: 'bg-green-600 hover:bg-green-700 shadow-green-600 text-white',
  warning: 'bg-amber-400 hover:bg-yellow-500 shadow-amber-400 text-black',
};

type fullWidthProp = boolean | { xs?: boolean, sm?: boolean, md?: boolean, lg?: boolean };

const fullWidthClasses = (fullWidth: fullWidthProp) => {
  if (!fullWidth) return '';

  const base = 'min-w-full';
  if (fullWidth === true) return base;
  if (fullWidth.xs) return `${base} sm:min-w-[128px]`;
  if (fullWidth.sm) return `${base} md:min-w-[128px]`;
  if (fullWidth.md) return `${base} lg:min-w-[128px]`;
  if (fullWidth.lg) return `${base} xl:min-w-[128px]`;

  return '';
};

type BaseProps = {
  fullWidth?: fullWidthProp;
  startIcon?: JSX.Element;
  submit?: boolean;
  variant?: Variants;
};

type ButtonProps = BaseProps & React.HTMLProps<HTMLButtonElement>;

export default function Button({
  children, fullWidth = false, startIcon, submit = false, variant = 'base', ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(baseClasses, fullWidthClasses(fullWidth), variantClasses[variant])}
      {...rest}
      type={submit ? 'submit' : 'button'}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
    </button>
  );
}
