import { useContext } from "react"
import { ToastContext } from "./context"

/**
 * 토스트 메시지를 띄우는 함수를 반환하는 Hook입니다.
 *
 * @returns {(message: string) => void} 토스트 표시 함수
 */
export const useToast = () => useContext(ToastContext).showToast
