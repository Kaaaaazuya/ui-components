import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import { ListboxOption } from '../types/ListBoxOption'

type Props = {
  allOptions: ListboxOption[]
}

export const useMultiCombobox = ({ allOptions }: Props) => {
  const [values, setValues] = useState<ListboxOption[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<ListboxOption[]>(allOptions)
  const [visibleListbox, setVisibleListbox] = useState<boolean>(false)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null)
  const [focusedOption, setFocusedOption] = useState<ListboxOption | null>(null)

  const deleteValue = useCallback(
    (id: string) => {
      setValues(
        values.filter((value) => {
          return value.id !== id
        }),
      )
      setInputValue('')
    },
    [values],
  )

  const selectFocusedOption = useCallback(
    (option: ListboxOption) => {
      if (values.includes(option)) {
        setValues(
          values.filter((value) => {
            return value.id !== option.id
          }),
        )
      } else {
        setValues([...values, option])
      }
      setInputValue('')
      setFocusedOptionIndex(null)
    },
    [values],
  )

  useEffect(() => {
    if (inputValue === '') {
      setOptions(allOptions)
    } else {
      setOptions(
        allOptions.filter((option) =>
          option.label.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      )
    }
    setFocusedOptionIndex(null)
  }, [inputValue, allOptions])

  useEffect(() => {
    if (focusedOptionIndex != null) {
      setFocusedOption(options[focusedOptionIndex])
    } else {
      setFocusedOption(null)
    }
  }, [focusedOptionIndex, options])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return {
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
  }
}
