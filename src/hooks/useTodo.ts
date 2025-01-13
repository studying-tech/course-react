import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Todo, TodoFilter, TodoSort } from '../types/todo'

export function useTodo() {
  // Todo の状態を管理
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])
  const [filter, setFilter] = useLocalStorage<TodoFilter>('filter', 'all')
  const [sort, setSort] = useLocalStorage<TodoSort>('sort', 'createdAt')

  /**
   * タスクの追加
   * @param text タスクの内容
   */
  const addTodo = useCallback(
    (text: string) => {
      const now = new Date()

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        // これらは、now を使用せず、 createdAt: new Date() と updatedAt: new Date() を使用すると、これらの時刻がほんの少しズレるので注意
        createdAt: now,
        updatedAt: now,
      }

      // newTodo を todos に追加
      setTodos([...todos, newTodo])
    },
    [todos, setTodos]
  )

  /**
   * タスクの削除
   * @param id 削除するタスクの ID
   */
  const deleteTodo = useCallback(
    (id: string) => {
      // 元々の todos をフィルタリングして、 id が一致しないものを返す
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    },
    [setTodos]
  )

  /**
   * 完了 / 未完了の切り替え
   * @param id 切り替えるタスクの ID
   */
  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo
        )
      )
    },
    [setTodos]
  )

  /**
   * タスクの編集
   * @param id 編集するタスクの ID
   * @param text 編集後のタスクの内容
   */
  const editTodo = useCallback(
    (id: string, text: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, text, updatedAt: new Date() } : todo))
      )
    },
    [setTodos]
  )

  /**
   * フィルターとソートを適用したタスクの一覧を返す
   * @returns フィルターとソートを適用したタスクの一覧
   */
  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos]

    // フィルターの適用 (全て | 未完了 | 完了済み)
    if (filter === 'active') {
      result = result.filter((todo) => !todo.completed)
    } else if (filter === 'completed') {
      result = result.filter((todo) => todo.completed)
    }

    // ソートの適用 (作成日時 | 更新日時)
    result.sort((a, b) => {
      const dateA = sort === 'createdAt' ? a.createdAt : a.updatedAt
      const dateB = sort === 'createdAt' ? b.createdAt : b.updatedAt

      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })

    return result
  }, [todos, filter, sort])

  return {
    todos: filteredAndSortedTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    filter,
    setFilter,
    sort,
    setSort,
  }
}
