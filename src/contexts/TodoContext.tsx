import { createContext } from 'react'
import type { Todo, TodoFilter, TodoSort } from '../types/todo'

interface TodoContextType {
  // タスクの一覧
  todos: Todo[]
  // タスクの追加
  addTodo: (text: string) => void
  // タスクの削除
  deleteTodo: (id: string) => void
  // 完了 / 未完了の切り替え
  toggleTodo: (id: string) => void
  // タスクの編集 (text は、変更後の内容)
  editTodo: (id: string, text: string) => void
  // フィルター
  filter: TodoFilter
  // フィルターの設定
  setFilter: (filter: TodoFilter) => void
  // ソート
  sort: TodoSort
  // ソートの設定
  setSort: (sort: TodoSort) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)
