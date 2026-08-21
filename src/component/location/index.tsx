import { Map } from "./map"
import { LazyDiv } from "../lazyDiv"
import { VENUE_IMAGE } from "../../images"
import {
  LOCATION,
  LOCATION_ADDRESS,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"

/**
 * 예식 안내(LOCATION) 섹션입니다.
 * 장소·일시, 지도, 길찾기 앱 버튼, 오시는 길 안내를 담습니다.
 *
 * @returns {JSX.Element} 예식 안내 섹션
 */
export const Location = () => {
  return (
    <section className="section alt location">
      <LazyDiv className="reveal eyebrow">LOCATION</LazyDiv>

      <LazyDiv className="reveal hall">{LOCATION}</LazyDiv>
      <LazyDiv className="reveal address">{LOCATION_ADDRESS}</LazyDiv>

      <LazyDiv className="reveal rule" />

      <LazyDiv className="reveal date">
        {WEDDING_DATE.format(WEDDING_DATE_FORMAT)}
      </LazyDiv>

      {/* 지도 + 길찾기 앱 버튼 */}
      <LazyDiv className="reveal map-area">
        <Map />
      </LazyDiv>

      {/* 예식장 건물 안내 사진 (지도 아래) */}
      <LazyDiv className="reveal venue-photo">
        <img src={VENUE_IMAGE} alt="예식장 네이버 1784 건물 안내" />
      </LazyDiv>

      {/* 오시는 길 */}
      <LazyDiv className="reveal transport">
        <div className="label">지하철</div>
        <div className="content">정자역 3번 출구 도보 10분</div>

        <div className="label">주차</div>
        <div className="content">
          네이버 1784 지하 2층 ~ 지하 5층 종일 무료
          <br />
          (충분한 주차공간이 마련되어 있습니다)
        </div>
      </LazyDiv>
    </section>
  )
}
