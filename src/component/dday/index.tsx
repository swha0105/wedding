import { useEffect, useMemo, useState } from "react"
import {
  BRIDE_FIRSTNAME,
  dayjs,
  GROOM_FIRSTNAME,
  WEDDING_DATE,
} from "../../const"
import { LazyDiv } from "../lazyDiv"

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * 예식까지 남은 시간을 일/시/분/초로 보여주는 D-DAY 카운터입니다.
 *
 * @returns {JSX.Element} D-DAY 섹션
 */
export const DDay = () => {
  // 예식 시각까지 남은 밀리초 (지났으면 음수)
  const [tsDiff, setTsDiff] = useState(() => WEDDING_DATE.diff())

  useEffect(() => {
    const interval = setInterval(() => setTsDiff(WEDDING_DATE.diff()), SECOND)
    return () => clearInterval(interval)
  }, [])

  // 남은 시간을 일/시/분/초로 분해합니다. (예식이 지났으면 모두 0)
  const { days, hours, mins, secs } = useMemo(() => {
    const remain = Math.max(tsDiff, 0)
    return {
      days: Math.floor(remain / DAY),
      hours: Math.floor((remain % DAY) / HOUR),
      mins: Math.floor((remain % HOUR) / MINUTE),
      secs: Math.floor((remain % MINUTE) / SECOND),
    }
  }, [tsDiff])

  /**
   * 카운터 아래에 붙는 안내 문구를 만듭니다.
   * 예식 전에는 카운터의 DAYS와 같은 값을 쓰고,
   * 예식 시각이 지난 뒤에는 날짜(자정) 기준으로 "오늘입니다" / "N일 지났습니다"를 표시합니다.
   */
  const countdownMsg = useMemo(() => {
    // 예식 전에는 위 카운터의 DAYS 값과 어긋나지 않도록 같은 값을 사용합니다.
    if (tsDiff > 0) return `${days}일 남았습니다.`

    // 예식이 지난 뒤에는 날짜(자정) 기준으로 안내합니다.
    const dayDiff = dayjs()
      .startOf("day")
      .diff(WEDDING_DATE.startOf("day"), "day")
    if (dayDiff === 0) return "오늘입니다."
    return `${dayDiff}일 지났습니다.`
  }, [tsDiff, days])

  return (
    <LazyDiv className="reveal dday">
      <div className="dday-label">D-DAY</div>

      <div className="dday-counter">
        <div className="unit">
          <div className="value">{days}</div>
          <div className="caption">DAYS</div>
        </div>
        <div className="divider" />
        <div className="unit">
          <div className="value">{hours}</div>
          <div className="caption">HOURS</div>
        </div>
        <div className="divider" />
        <div className="unit">
          <div className="value">{mins}</div>
          <div className="caption">MIN</div>
        </div>
        <div className="divider" />
        <div className="unit">
          <div className="value">{secs}</div>
          <div className="caption">SEC</div>
        </div>
      </div>

      <div className="dday-message">
        {GROOM_FIRSTNAME} <span className="dot">·</span> {BRIDE_FIRSTNAME}의
        결혼식이
        <br />
        {countdownMsg}
      </div>
    </LazyDiv>
  )
}
