export const useBoolean = (defaultValue = false) => {
  const value = ref(defaultValue)

  const setValue = (newValue: boolean) => {
    value.value = newValue
  }

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const toggle = () => setValue(!value.value)

  return {
    value: readonly(value),
    setValue,
    setTrue,
    setFalse,
    toggle
  }
}
