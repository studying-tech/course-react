import { useState } from 'react'
import { Circle, CircleCheck, Pencil, Trash2, X, Check } from 'lucide-react'
import { Todo } from '../types/todo'
import { useTodoContext } from '../hooks/useTodoContext'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext()

  // これらは、このコンポーネント内で管理すれば良いので、グローバルでの管理はしない
  // 編集モードかどうか
  const [isEditing, setIsEditing] = useState<boolean>(false)
  // 編集中のテキスト
  const [editedText, setEditedText] = useState<string>(todo.text)

  /**
   * 編集を確定したときの関数
   */
  const handleEdit = () => {
    if (editedText.trim() === '') return
    if (editedText === todo.text) return
    editTodo(todo.id, editedText)
    setIsEditing(false)
  }

  /**
   * 日付をフォーマットする
   */
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className='hover:shadow-md flex items-center justify-between p-4 transition-shadow duration-300 bg-white rounded-lg shadow-sm'>
      <div className='flex items-center flex-1 gap-3'>
        {/* 完了/未完了の切り替えボタン */}
        <button
          onClick={() => toggleTodo(todo.id)}
          className='hover:text-orange-500 text-gray-500 transition-colors duration-300'
          aria-label={`${todo.text}を${todo.completed ? '未完了' : '完了'}にする`}
        >
          {todo.completed ? <CircleCheck className='w-6 h-6 text-orange-500' /> : <Circle className='w-6 h-6' />}
        </button>

        {isEditing ? (
          // 編集モードの表示
          <input
            type='text'
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className='focus:outline-none focus:ring-2 focus:ring-orange-500 flex-1 px-2 py-[9px] border rounded'
            autoFocus
          />
        ) : (
          // 編集モードでない場合の表示
          <div className='flex-1'>
            <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{todo.text}</span>
            <div className='mt-1 text-xs text-gray-400'>
              作成: {formatDate(todo.createdAt)}
              {todo.updatedAt > todo.createdAt && ` ・更新: ${formatDate(todo.updatedAt)}`}
            </div>
          </div>
        )}

        {/* 操作ボタン */}
        <div className='flex items-center gap-2'>
          {isEditing ? (
            // 編集モードの操作ボタン
            <>
              {/* 確定ボタン */}
              <button
                onClick={handleEdit}
                className='hover:text-orange-500 text-gray-400 transition-colors duration-300'
              >
                <Check className='w-5 h-5' />
              </button>
              {/* キャンセルボタン */}
              <button
                onClick={() => {
                  setIsEditing(false)
                  // 編集前のテキストに戻す (編集内容の破棄)
                  setEditedText(todo.text)
                }}
                className='hover:text-red-500 text-gray-400 transition-colors duration-300'
              >
                <X className='w-5 h-5' />
              </button>
            </>
          ) : (
            // 編集モードでない場合の操作ボタン
            <>
              {/* 編集ボタン */}
              <button
                onClick={() => setIsEditing(true)}
                className='hover:text-orange-500 text-gray-400 transition-colors duration-300'
              >
                <Pencil className='w-5 h-5' />
              </button>
              {/* 削除ボタン */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className='hover:text-red-500 text-gray-400 transition-colors duration-300'
              >
                <Trash2 className='w-5 h-5' />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
