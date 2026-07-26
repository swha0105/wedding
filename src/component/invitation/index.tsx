import { useState } from "react"
import {
  BRIDE_FATHER,
  BRIDE_FULLNAME,
  BRIDE_INFO,
  BRIDE_MOTHER,
  BRIDE_TITLE,
  GROOM_FATHER,
  GROOM_FULLNAME,
  GROOM_INFO,
  GROOM_MOTHER,
  GROOM_TITLE,
} from "../../const"
import { LazyDiv } from "../lazyDiv"

/**
 * "신랑 아버지" → "아버지" 처럼 앞의 신랑/신부 접두사를 떼어냅니다.
 * ("신랑", "신부" 자체는 그대로 둡니다.)
 */
const shortRelation = (relation: string) =>
  relation.replace(/^(신랑|신부)\s+/, "")

/**
 * 연락처 목록 한 묶음(신랑측 / 신부측)을 렌더링합니다.
 */
const ContactGroup = ({
  title,
  people,
}: {
  title: string
  people: { relation: string; name: string; phone?: string }[]
}) => (
  <>
    <div className="group-label">{title}</div>
    {people
      .filter(({ phone }) => !!phone)
      .map(({ relation, name, phone }) => (
        <div className="contact-row" key={relation}>
          <div className="who">
            <span className="relation">{shortRelation(relation)}</span>
            {name}
          </div>
          <div className="actions">
            <a href={`tel:${phone}`}>전화</a>
            <a href={`sms:${phone}`}>문자</a>
          </div>
        </div>
      ))}
  </>
)

/**
 * 인사말(INVITATION) 섹션입니다.
 * 초대 문구, 혼주·신랑신부 정보, 그리고 펼침형 연락처를 제공합니다.
 *
 * @returns {JSX.Element} 인사말 섹션
 */
export const Invitation = () => {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section className="section alt invitation">
      <LazyDiv className="reveal eyebrow">INVITATION</LazyDiv>
      <LazyDiv className="reveal rule" />

      <LazyDiv className="reveal">
        <p className="message">
          성격도, 취미도, 환경도, 그리고 종교마저 달랐지만
          <br />
          사랑이란 이름으로 함께하게 되었습니다.
          <br />
          <br />
          달라서 더 지루할 틈 없는 저희 두 사람,
          <br />
          이제는 부부이자 가장 친한 친구로 예쁘게 살아보겠습니다.
          <br />
          귀한 걸음으로 오셔서 함께 축복해 주세요.
        </p>
      </LazyDiv>

      <LazyDiv className="reveal parents">
        <div>
          {GROOM_FATHER} · {GROOM_MOTHER}{" "}
          <span className="relation">의 {GROOM_TITLE}</span> {GROOM_FULLNAME}
        </div>
        <div>
          {BRIDE_FATHER} · {BRIDE_MOTHER}{" "}
          <span className="relation">의 {BRIDE_TITLE}</span> {BRIDE_FULLNAME}
        </div>
      </LazyDiv>

      {/* 연락하기 — 펼침형 */}
      <LazyDiv className="reveal contact">
        <button
          type="button"
          className={`accordion-toggle${contactOpen ? " open" : ""}`}
          aria-expanded={contactOpen}
          onClick={() => setContactOpen((open) => !open)}
        >
          연락하기
          <span className="chevron">▼</span>
        </button>

        {contactOpen && (
          <div className="accordion-panel contact-list">
            <ContactGroup title="신랑측" people={GROOM_INFO} />
            <ContactGroup title="신부측" people={BRIDE_INFO} />
          </div>
        )}
      </LazyDiv>
    </section>
  )
}
