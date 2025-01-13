import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // ローカルストレージから値を取得、なかった場合、エラーが発生した場合は initialValue を返す
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (e) {
      console.error(e)

      return initialValue
    }
  })

  // 値が変更されるたびに、ローカルストレージを更新
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (e) {
      console.error(e)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}
