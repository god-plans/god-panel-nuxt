export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
) => {
  // State
  const storedValue = ref<T>(defaultValue)

  // Initialize from localStorage
  const initialize = () => {
    if (process.client) {
      try {
        const item = localStorage.getItem(key)
        if (item !== null) {
          storedValue.value = JSON.parse(item)
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error)
      }
    }
  }

  // Set value
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue.value) : value
      storedValue.value = valueToStore

      if (process.client) {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Remove value
  const removeValue = () => {
    try {
      storedValue.value = defaultValue
      if (process.client) {
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }

  // Initialize on mount
  onMounted(() => {
    initialize()
  })

  return {
    value: storedValue,
    setValue,
    removeValue
  }
}
