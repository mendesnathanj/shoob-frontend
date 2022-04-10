const baseClasses = `inline-flex items-center justify-center leading-[4rem]
whitespace-nowrap tracking-wider uppercase font-bold bg-gray-300 hover:bg-gray-500
min-w-[128px] px-4 rounded-md shadow-sm transition-all duration-200 hover:text-white`;

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
  submit?: boolean;
  fullWidth?: fullWidthProp;
};

type ButtonProps = BaseProps & React.HTMLProps<HTMLButtonElement>;

export default function Button({ children, fullWidth = false, submit = false, ...rest }: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${fullWidthClasses(fullWidth)}`}
      {...rest}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
