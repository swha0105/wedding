import "./App.scss"
import { Cover } from "./component/cover"
import { Invitation } from "./component/invitation"
import { Gallery } from "./component/gallery"
import { Location } from "./component/location"
import { Account } from "./component/information"
import { ShareButton } from "./component/shareButton"
import { Footer } from "./component/footer"

/**
 * 메인 애플리케이션 컴포넌트입니다.
 * 시안(모바일청첩장.dc.html)의 섹션 순서를 그대로 따릅니다.
 *
 * INTRO(대문 + D-DAY) → INVITATION(인사말 + 연락처)
 * → GALLERY → LOCATION → ACCOUNT → SHARE → footer
 *
 * @returns {JSX.Element} 애플리케이션 화면
 */
function App() {
  return (
    <div className="page">
      {/* 대문 사진 + D-DAY 카운트다운 */}
      <Cover />

      {/* 인사말 + 혼주 정보 + 연락하기 */}
      <Invitation />

      {/* 사진 갤러리 (겹침 콜라주 + 라이트박스) */}
      <Gallery />

      {/* 예식 안내 + 지도 + 오시는 길 */}
      <Location />

      {/* 마음 전하실 곳 (계좌번호) */}
      <Account />

      {/* 카카오톡 공유 / 링크 복사 */}
      <ShareButton />

      {/* 이름 · 날짜 */}
      <Footer />
    </div>
  )
}

export default App
