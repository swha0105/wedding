import { useState } from "react"
import ArrowLeft from "../../icons/angle-left-sm.svg?react"
import { LazyDiv } from "../lazyDiv"
import { Modal } from "../modal"
import { GALLERY_IMAGES } from "../../images"

/**
 * 갤러리 컴포넌트입니다.
 * 사진을 정렬된 사각형 그리드(2열)로 배치하고, 누르면 라이트박스에서
 * 크게 볼 수 있습니다. 라이트박스 안에서는 좌우 화살표로 이전/다음 사진을 넘깁니다.
 *
 * @returns {JSX.Element} 갤러리 섹션
 */
export const Gallery = () => {
  // 현재 확대해서 보고 있는 사진 인덱스 (null이면 라이트박스 닫힘)
  const [selected, setSelected] = useState<number | null>(null)

  // Modal 컴포넌트의 [open, setOpen] 인터페이스에 맞춰 변환
  const modalState: [boolean, (open: boolean) => void] = [
    selected !== null,
    (open: boolean) => {
      if (!open) setSelected(null)
    },
  ]

  const showPrev = () =>
    setSelected((cur) =>
      cur === null
        ? cur
        : (cur + GALLERY_IMAGES.length - 1) % GALLERY_IMAGES.length,
    )

  const showNext = () =>
    setSelected((cur) =>
      cur === null ? cur : (cur + 1) % GALLERY_IMAGES.length,
    )

  return (
    <>
      <section className="section gallery">
        <LazyDiv className="reveal eyebrow">GALLERY</LazyDiv>

        <div className="grid">
          {GALLERY_IMAGES.map((src, idx) => (
            <LazyDiv key={idx} className="reveal cell">
              <button
                type="button"
                className="tile"
                onClick={() => setSelected(idx)}
                aria-label={`사진 ${idx + 1} 크게 보기`}
              >
                <img
                  src={src}
                  alt={`gallery-${idx + 1}`}
                  draggable={false}
                />
                <span className="zoom-badge" aria-hidden="true">
                  ⤢
                </span>
              </button>
            </LazyDiv>
          ))}
        </div>
      </section>

      {/* 사진 확대 보기 (라이트박스) */}
      <Modal
        modalState={modalState}
        className="photo-viewer-modal"
        closeOnClickBackground={true}
        showCloseButton={false}
      >
        {selected !== null && (
          <div className="viewer">
            <button
              type="button"
              className="close"
              onClick={() => setSelected(null)}
              aria-label="닫기"
            >
              ×
            </button>

            <div className="viewer-image">
              <img
                src={GALLERY_IMAGES[selected]}
                alt={`gallery-${selected + 1}`}
                draggable={false}
              />
            </div>

            <div className="viewer-control">
              <button
                type="button"
                className="control left"
                onClick={showPrev}
                aria-label="이전 사진"
              >
                <ArrowLeft className="arrow" />
              </button>
              <div className="counter">
                {selected + 1} / {GALLERY_IMAGES.length}
              </div>
              <button
                type="button"
                className="control right"
                onClick={showNext}
                aria-label="다음 사진"
              >
                <ArrowLeft className="arrow right" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
