import { RefObject, useCallback, useEffect } from 'react'

export const useClickOutside = (
  /**
   * クリックが要素外か判定する ref
   */
  ref: RefObject<HTMLElement>,
  /**
   * クリックが要素外のときのコールバック関数
   */
  // eslint-disable-next-line no-unused-vars
  handler: (event: MouseEvent) => void,
) => {
  const listener = useCallback(
    (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    },
    [handler, ref],
  )

  useEffect(() => {
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler, listener])
}
