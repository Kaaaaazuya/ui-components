import { useClickOutside } from '@/app/hooks/useClickOutside'
import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type props = {
  /**
   * Modal 内部に表示する要素
   */
  children: ReactNode
  /**
   * Modal を閉じる関数
   */
  handleClose: () => void
  /**
   * ヘッダーに表示するタイトル(任意)
   */
  title?: string
}

export const Modal = ({ children, handleClose, title }: props) => {
  const contentRef = useRef<HTMLDivElement>(null)

  // コンテンツ外部をクリックしたときにモーダルを閉じる
  useClickOutside(contentRef, handleClose)

  // esc でモーダルを閉じる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escapeキーが押された場合、モーダルを閉じる
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    // キーダウンイベントリスナーを追加
    document.addEventListener('keydown', handleKeyDown)

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose])

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/40'>
      <div
        className='mx-auto max-w-sm rounded-md border bg-white p-5 shadow-lg'
        ref={contentRef}
        role='dialog'
        aria-modal='true'
      >
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold' aria-labelledby='dialog-title'>
            {title}
          </h2>
          <button onClick={handleClose} className='text-xl font-semibold' type='button'>
            X
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}
