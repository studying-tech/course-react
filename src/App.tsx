import { ClipboardList } from 'lucide-react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFilters from './components/TodoFilters'
import { TodoProvider } from './contexts/TodoProvider'
import { ErrorBoundary } from './components/ErrorBoundary'

export default function App() {
  return (
    <div className='bg-orange-50 min-h-screen'>
      <div className='container max-w-2xl px-4 py-8 mx-auto'>
        <div className='rounded-xl p-6 space-y-6 bg-white shadow-lg'>
          <div className='flex items-center gap-3'>
            <ClipboardList className='w-8 h-8 text-orange-500' />
            <h1 className='text-2xl font-bold text-gray-800'>スタディングテック Todo リスト</h1>
          </div>
          <ErrorBoundary>
            <TodoProvider>
              <TodoInput />
              <TodoFilters />
              <TodoList />
            </TodoProvider>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
