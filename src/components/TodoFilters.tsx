import { Clock, History } from 'lucide-react'
import { useTodoContext } from '../hooks/useTodoContext'
import { TodoFilter, TodoSort } from '../types/todo'

export default function TodoFilters() {
  const { filter, setFilter, sort, setSort } = useTodoContext()

  const filters: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'すべて' },
    { value: 'active', label: '未完了' },
    { value: 'completed', label: '完了' },
  ]

  const sorts: { value: TodoSort; label: string; icon: React.ReactNode }[] = [
    { value: 'createdAt', label: '作成日時', icon: <Clock className='w-4 h-4' /> },
    { value: 'updatedAt', label: '更新日時', icon: <History className='w-4 h-4' /> },
  ]

  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex gap-2'>
        {filters.map(({ value, label }) => (
          <button
            key={value}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === value ? 'text-white bg-orange-500' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='flex gap-2'>
        {sorts.map(({ value, label, icon }) => (
          <button
            key={value}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full ${
              sort === value ? 'text-white bg-orange-500' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSort(value)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
