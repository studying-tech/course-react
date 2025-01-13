import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(e: Error) {
    return { hasError: true, error: e }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='p-4 text-center'>
            <h2 className='mb-2 text-xl font-bold text-orange-600'>エラーが発生しました</h2>
            <p className='text-gray-600'>申し訳ありません、エラーが発生しました</p>
          </div>
        )
      )
    }

    return this.props.children
  }
}
