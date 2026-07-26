import { BRIDE_FULLNAME, GROOM_FULLNAME, WEDDING_DATE } from "../../const"

/**
 * 초대장 맨 아래의 이름 · 날짜 표기입니다.
 *
 * @returns {JSX.Element} 푸터
 */
export const Footer = () => {
  return (
    <div className="page-footer">
      <div className="names">
        {GROOM_FULLNAME} · {BRIDE_FULLNAME}
      </div>
      <div className="date">{WEDDING_DATE.format("YYYY . MM . DD")}</div>
    </div>
  )
}
