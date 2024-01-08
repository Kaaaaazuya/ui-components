import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import { ListboxOption } from '../types/ListBoxOption'

type Props = {
  allOptions: ListboxOption[]
}

export const useCombobox = ({ allOptions }: Props) => {
  const [value, setValue] = useState<ListboxOption | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<ListboxOption[]>(allOptions)
  const [visibleListbox, setVisibleListbox] = useState<boolean>(false)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null)
  const [focusedOption, setFocusedOption] = useState<ListboxOption | null>(null)

  const deleteValue = useCallback(() => {
    setValue(null)
    setInputValue('')
  }, [])

  const selectFocusedOption = useCallback((option: ListboxOption) => {
    setValue(option)
    setInputValue('')
    setVisibleListbox(false)
    setFocusedOptionIndex(null)
  }, [])

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
    value,
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
