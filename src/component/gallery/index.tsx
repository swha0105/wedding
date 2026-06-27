import { useState } from "react"
import ArrowLeft from "../../icons/angle-left-sm.svg?react"
import { LazyDiv } from "../lazyDiv"
import { Modal } from "../modal"
import { GALLERY_IMAGES } from "../../images"

/**
 * 갤러리 컴포넌트입니다.
 * 썸네일을 3열 그리드(앨범 형태)로 보여주고,
 * 썸네일을 클릭하면 모달(라이트박스)에서 크게 볼 수 있습니다.
 * 모달 안에서는 좌우 화살표로 이전/다음 사진을 넘길 수 있습니다.
 *
 * @returns {JSX.Element} 갤러리 섹션
 */
export const Gallery = () => {
  // 현재 확대해서 보고 있는 사진 인덱스 (null이면 모달 닫힘)
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
      <LazyDiv className="card gallery">
        <h2 className="english">Gallery</h2>

        {/* 3열 썸네일 그리드 (12장 → 3 x 4) */}
        <div className="photo-grid">
          {GALLERY_IMAGES.map((image, idx) => (
            <button
              key={idx}
              className="thumb"
              onClick={() => setSelected(idx)}
              aria-label={`사진 ${idx + 1} 크게 보기`}
            >
              <img src={image} alt={`gallery-${idx + 1}`} draggable={false} />
            </button>
          ))}
        </div>
      </LazyDiv>

      {/* 사진 확대 보기 (라이트박스) */}
      <Modal
        modalState={modalState}
        className="photo-viewer-modal"
        closeOnClickBackground={true}
      >
        {selected !== null && (
          <div className="viewer">
            <div className="viewer-image">
              <img
                src={GALLERY_IMAGES[selected]}
                alt={`gallery-${selected + 1}`}
                draggable={false}
              />
            </div>
            <div className="viewer-control">
              <button
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
