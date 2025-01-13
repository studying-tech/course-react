import TodoItem from './TodoItem'
import { useTodoContext } from '../hooks/useTodoContext'

export default function TodoList() {
  const { todos } = useTodoContext()

  return (
    <ul className='space-y-2' role='list' aria-label='Todo リスト'>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  )
}
