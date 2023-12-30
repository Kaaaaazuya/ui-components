type ButtonProps = {
  label: string
  size: 'lg' | 'md' | 'sm'
  type: 'submit' | 'reset' | 'button'
  color: 'primary' | 'secondary' | 'weak'
  onClick: () => void
}

export const Button = ({
  label,
  size = 'md',
  type = 'button',
  color = 'primary',
  onClick,
}: ButtonProps) => {
  const sizeVariants: { [key: string]: string } = {
    lg: 'h-10 p-4 rounded-md ',
    md: 'h-8 p-3 rounded-md ',
    sm: 'h-6 p-2 rounded-md ',
  }

  const colorVariants: { [key: string]: string } = {
    primary: 'bg-sky-500/100',
    secondary: 'bg-sky-500/75',
    weak: 'bg-sky-500/50',
  }

  const fontVariants: { [key: string]: string } = {
    lg: 'text-lg',
    md: 'text-base',
    sm: 'text-sm ',
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`flex items-center ${sizeVariants[size]} ${colorVariants[color]} `}
      onClick={onClick}
    >
      <p className={`${fontVariants[size]}`}>{label}</p>
    </button>
  )
}
