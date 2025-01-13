import { useTodo } from '../hooks/useTodo'
import { TodoContext } from './TodoContext'

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const todoUtils = useTodo()

  return <TodoContext.Provider value={todoUtils}>{children}</TodoContext.Provider>
}
