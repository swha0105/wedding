import { Map } from "./map"
import { LazyDiv } from "../lazyDiv"
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

      {/* 오시는 길 */}
      {/* TODO: 실제 교통편·주차 안내 확정 후 문구 확인 */}
      <LazyDiv className="reveal transport">
        <div className="label">지하철</div>
        <div className="content">신분당선 정자역 4번 출구 도보 8분</div>

        <div className="label">주차</div>
        <div className="content">
          건물 지하 주차장 2시간 무료
          <br />
          (주차 등록 데스크 문의)
        </div>
      </LazyDiv>
    </section>
  )
}
