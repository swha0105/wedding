import { useState } from "react"
import { BRIDE_INFO, GROOM_INFO } from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useToast } from "../toast"

/**
 * "카카오뱅크 3333-01-2345678" 형태의 문자열을 은행명과 계좌번호로 나눕니다.
 * 공백이 없으면 전체를 계좌번호로 취급합니다.
 */
const splitAccount = (account: string) => {
  const separatorIdx = account.indexOf(" ")
  if (separatorIdx === -1) return { bank: "", number: account }
  return {
    bank: account.slice(0, separatorIdx),
    number: account.slice(separatorIdx + 1).trim(),
  }
}

/**
 * 계좌 목록 한 묶음(신랑측 / 신부측)을 렌더링합니다.
 */
const AccountGroup = ({
  title,
  people,
}: {
  title: string
  people: { relation: string; name: string; account?: string }[]
}) => {
  const showToast = useToast()

  const copy = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number)
      showToast("계좌번호가 복사되었습니다.")
    } catch {
      showToast("복사에 실패했습니다.")
    }
  }

  return (
    <>
      <div className="group-label">{title}</div>
      {people
        .filter(({ account }) => !!account)
        .map(({ relation, name, account }) => {
          const { bank, number } = splitAccount(account as string)
          return (
            <div className="account-row" key={relation}>
              <div>
                <div className="holder">
                  {bank && <>{bank} · </>}
                  {relation} {name}
                </div>
                <div className="number">{number}</div>
              </div>
              <button
                type="button"
                className="copy"
                onClick={() => copy(number)}
              >
                복사
              </button>
            </div>
          )
        })}
    </>
  )
}

/**
 * 마음 전하실 곳(ACCOUNT) 섹션입니다.
 * 신랑측·신부측 계좌번호를 펼침형으로 보여주고 복사 기능을 제공합니다.
 *
 * @returns {JSX.Element} 계좌 안내 섹션
 */
export const Account = () => {
  const [open, setOpen] = useState(false)

  return (
    <section className="section account">
      <LazyDiv className="reveal eyebrow">ACCOUNT</LazyDiv>

      <LazyDiv className="reveal">
        <p className="description">
          참석이 어려우신 분께서도
          <br />
          마음을 전하실 수 있도록 안내드립니다.
        </p>
      </LazyDiv>

      <LazyDiv className="reveal">
        <button
          type="button"
          className={`accordion-toggle${open ? " open" : ""}`}
          aria-expanded={open}
          onClick={() => setOpen((open) => !open)}
        >
          마음 전하실 곳<span className="chevron">▼</span>
        </button>

        {open && (
          <div className="accordion-panel account-list">
            <AccountGroup title="신랑측" people={GROOM_INFO} />
            <AccountGroup title="신부측" people={BRIDE_INFO} />
          </div>
        )}
      </LazyDiv>
    </section>
  )
}
