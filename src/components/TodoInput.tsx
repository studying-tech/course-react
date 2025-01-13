import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { useTodoContext } from '../hooks/useTodoContext'

export default function TodoInput() {
  const [text, setText] = useState('')
  const { addTodo } = useTodoContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText) return
    addTodo(trimmedText)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <label htmlFor='new-todo' className='sr-only'>
        新しいタスク
      </label>

      <input
        id='new-todo'
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='新しいタスクを入力...'
        className='focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent flex-1 px-4 py-2 border border-gray-300 rounded-lg'
        required
        aria-required='true'
      />

      <button
        type='submit'
        className='hover:bg-orange-600 flex items-center gap-2 px-4 py-2 text-white transition-colors duration-300 bg-orange-500 rounded-lg'
        aria-label='タスクを追加'
      >
        <PlusCircle className='w-5 h-5' aria-hidden='true' />
        追加
      </button>
    </form>
  )
}
