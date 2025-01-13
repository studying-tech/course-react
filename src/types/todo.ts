// 後から機能拡張を行う際に拡張する可能性があるので、 type ではなく interface を使用する
export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type TodoFilter = 'all' | 'active' | 'completed'
export type TodoSort = 'createdAt' | 'updatedAt'
