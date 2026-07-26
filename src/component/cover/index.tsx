import { COVER_IMAGE } from "../../images"
import { DDay } from "../dday"
import { LazyDiv } from "../lazyDiv"

/**
 * 초대장의 대문(INTRO) 섹션입니다.
 * 화면 폭을 꽉 채우는 메인 사진과 하단 그라데이션 페이드,
 * 그리고 D-DAY 카운트다운으로 구성됩니다.
 *
 * @returns {JSX.Element} 대문 섹션
 */
export const Cover = () => {
  return (
    <section className="section intro">
      <LazyDiv className="reveal">
        <div className="hero">
          <img className="hero-image" src={COVER_IMAGE} alt="" />
          {/* 사진 하단이 배경색으로 자연스럽게 녹아들도록 하는 그라데이션 */}
          <div className="hero-fade" />
        </div>
      </LazyDiv>

      <DDay />
    </section>
  )
}
