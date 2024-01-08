import { ListboxOption } from '@/app/types/ListBoxOption'
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useId,
  useState,
} from 'react'
import { Tag } from '../Tag/Tag'
import { useMultiCombobox } from '@/app/hooks/useMultiComboBox'

type Props = {
  allOptions: ListboxOption[]
}

export const MultiCombobox = ({ allOptions }: Props) => {
  const listboxId = useId()
  const labelId = useId()
  const inputId = useId()

  const [focus, setFocus] = useState(false)

  const {
    values,
    deleteValue,
    inputValue,
    options,
    visibleListbox,
    focusedOptionIndex,
    focusedOption,
    selectFocusedOption,
    handleChange,
    setVisibleListbox,
    setFocusedOptionIndex,
  } = useMultiCombobox({ allOptions })

  const onFocusInput = useCallback(() => {
    setVisibleListbox(true), setFocus(true)
  }, [setVisibleListbox])
  const onBlurInput = useCallback(() => {
    setVisibleListbox(false), setFocus(false)
  }, [setVisibleListbox])

  /**
   * input要素のキーボードイベントに応じて状態を管理
   */
  const onKeyDownInput: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setVisibleListbox(false)
        setFocusedOptionIndex(null)
      } else if (event.key === 'ArrowUp') {
        // ↑キーが押されたらフォーカスを前に移動
        setFocusedOptionIndex((prev: number | null) => {
          if (prev == null || prev === 0) {
            return options.length - 1
          }
          return prev - 1
        })
      } else if (event.key === 'ArrowDown') {
        // ↓キーが押されたらフォーカスを次に移動
        setFocusedOptionIndex((prev: number | null) => {
          if (prev == null || prev === options.length - 1) {
            return 0
          }
          return prev + 1
        })
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        if (values.length > 0 && inputValue === '') {
          deleteValue(values[values.length - 1].id)
          setVisibleListbox(true)
        }
      } else if (event.key === 'Enter') {
        if (focusedOption != null) {
          selectFocusedOption(focusedOption)
        }
      }
    },
    [
      deleteValue,
      focusedOption,
      inputValue,
      options.length,
      selectFocusedOption,
      setFocusedOptionIndex,
      setVisibleListbox,
      values,
    ],
  )

  const onMouseOverOption: MouseEventHandler<HTMLLIElement> = useCallback(
    (event) => {
      setFocusedOptionIndex(Number(event.currentTarget.dataset.index))
    },
    [setFocusedOptionIndex],
  )

  const onMouseDownOption: MouseEventHandler<HTMLLIElement> = useCallback(
    (event) => {
      event.preventDefault()
      const selectedOption = options[Number(event.currentTarget.dataset.index)]
      selectFocusedOption(selectedOption)
    },
    [options, selectFocusedOption],
  )

  return (
    <div>
      <div
        className={`flex gap-4 border p-2 ${
          focus ? 'border-blue-400' : 'border-gray-200'
        }`}
      >
        {values.map((value) => {
          const handleDelete = () => deleteValue(value.id)
          return <Tag label={value.label} onDelete={handleDelete} key={value.id} />
        })}
        <input
          type='text'
          autoComplete='off'
          role='combobox'
          id={inputId}
          value={inputValue}
          onChange={(e) => handleChange(e)}
          aria-labelledby={labelId}
          aria-controls={listboxId}
          aria-autocomplete='list'
          className={`w-full`}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          aria-expanded={visibleListbox}
          onKeyDown={onKeyDownInput}
          aria-activedescendant={focusedOption ? focusedOption.id : ''}
          //  TODO: a11y 観点でやめる
          style={{ outline: 0 }}
        />
      </div>

      {visibleListbox && options.length > 0 ? (
        <ul
          role='listbox'
          id={listboxId}
          aria-label='候補'
          aria-labelledby={`${listboxId} ${labelId}`}
          className={`absolute mt-1 w-full border border-black`}
        >
          {options.map((option, index) => {
            const isSelected = values.includes(option)
            return (
              <li
                id={`lb-op-${option}`}
                data-index={index}
                role='option'
                key={option.id}
                className={`flex gap-2 px-1 py-2 hover:bg-yellow-300 aria-selected:bg-yellow-300`}
                aria-selected={index === focusedOptionIndex}
                onMouseOver={onMouseOverOption}
                onMouseDown={onMouseDownOption}
              >
                {option.label}
                {isSelected && <p>✔︎</p>}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
