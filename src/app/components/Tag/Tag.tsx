type Props = {
  label: string
  // eslint-disable-next-line react/require-default-props
  onDelete?: () => void
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void
}

export const Tag = ({ label, onDelete, onClick = () => {} }: Props) => {
  return (
    <div className={`flex max-w-fit gap-2 border-r-8 bg-gray-200 p-2`}>
      <button
        type='button'
        onClick={onClick}
        aria-label={`Tag ${label}`}
        className={`w-fit`}
      >
        {label}
      </button>
      {onDelete && (
        <button
          onClick={onDelete}
          type='button'
          aria-label={`Delete ${label}`}
          className={`h-2 w-2`}
        >
          x
        </button>
      )}
    </div>
  )
}
