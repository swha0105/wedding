import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { ToastContext } from "./context"

/** 토스트가 화면에 머무는 시간 (ms) */
const TOAST_DURATION = 2000

/**
 * 토스트 메시지를 관리하는 Provider 컴포넌트입니다.
 * 하위 어디에서든 useToast()로 메시지를 띄울 수 있습니다.
 *
 * @param {PropsWithChildren} props - 하위 컴포넌트
 * @returns {JSX.Element} ToastProvider 컴포넌트
 */
export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string | null>(null)
  const timeout = useRef<number | null>(null)

  const showToast = useCallback((message: string) => {
    setMessage(message)
    if (timeout.current !== null) {
      clearTimeout(timeout.current)
    }
    timeout.current = window.setTimeout(() => setMessage(null), TOAST_DURATION)
  }, [])

  // 언마운트 시 타이머 정리
  useEffect(
    () => () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current)
      }
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="toast" role="status">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}
