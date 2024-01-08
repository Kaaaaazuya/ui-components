import { ListboxOption } from '@/app/types/ListBoxOption'
import { useCombobox } from '@/app/useComboBox'
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useId,
  useState,
} from 'react'
import { Tag } from '../Tag/Tag'

type Props = {
  allOptions: ListboxOption[]
}

export const GroupedCombobox = ({ allOptions }: Props) => {
  const listboxId = useId()
  const labelId = useId()
  const inputId = useId()

  const [focus, setFocus] = useState(false)

  const {
    value,
    deleteValue,
    inputValue,
    options,
    visibleListbox,
    focusedOption,
    selectFocusedOption,
    handleChange,
    setVisibleListbox,
    setFocusedOptionIndex,
  } = useCombobox({ allOptions })

  // オプションをグループに分類する関数
  const groupOptions = (options: ListboxOption[]) => {
    return options.reduce(
      (groups, option) => {
        const group = option.group || 'その他'
        if (!groups[group]) {
          groups[group] = []
        }
        groups[group].push(option)
        return groups
      },
      {} as Record<string, ListboxOption[]>,
    )
  }
  // グループ分けされたオプション
  const groupedOptions = groupOptions(options)

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
        if (value && inputValue === '') {
          deleteValue()
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
      value,
    ],
  )

  const onMouseOverOption: MouseEventHandler<HTMLLIElement> = useCallback(
    (event) => {
      const optionId = event.currentTarget.getAttribute('data-option-id')
      if (optionId) {
        const index = options.findIndex((opt) => opt.id === optionId)
        setFocusedOptionIndex(index)
      }
    },
    [options, setFocusedOptionIndex],
  )

  const onMouseDownOption: MouseEventHandler<HTMLLIElement> = useCallback(
    (event) => {
      event.preventDefault()
      const optionId = event.currentTarget.getAttribute('data-option-id')
      if (optionId) {
        const selectedOption = options.find((opt) => opt.id === optionId)
        if (selectedOption) {
          selectFocusedOption(selectedOption)
        }
      }
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
        {value && <Tag label={value.label} onDelete={deleteValue} />}
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

      {!value && visibleListbox && options.length > 0 ? (
        <ul
          role='listbox'
          id={listboxId}
          aria-label='候補'
          aria-labelledby={`${listboxId} ${labelId}`}
          className={`absolute mt-1 w-full border border-black`}
        >
          {Object.entries(groupedOptions).map(([groupLabel, groupOptions]) => (
            <li key={groupLabel}>
              {groupLabel !== '' && <div className={`font-bold`}>{groupLabel}</div>}
              <ul>
                {groupOptions.map((option) => (
                  <li
                    id={`lb-op-${option.id}`}
                    data-option-id={option.id} // Using option.id for identification
                    role='option'
                    key={option.id}
                    className={`px-1 py-2 hover:bg-yellow-300 aria-selected:bg-yellow-300`}
                    aria-selected={option.id === focusedOption?.id}
                    onMouseOver={onMouseOverOption}
                    onMouseDown={onMouseDownOption}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
