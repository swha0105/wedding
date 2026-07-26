import { createContext } from "react"

/**
 * 화면 하단에 잠깐 나타나는 안내 메시지(토스트)를 띄우기 위한 Context입니다.
 */
export const ToastContext = createContext({
  /** 토스트 메시지를 표시합니다. */
  showToast: (() => {}) as (message: string) => void,
})
