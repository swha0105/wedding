import { useState } from "react"
import ArrowLeft from "../../icons/angle-left-sm.svg?react"
import { LazyDiv } from "../lazyDiv"
import { Modal } from "../modal"
import { GALLERY_IMAGES } from "../../images"

/**
 * 겹침 콜라주 한 그룹의 배치 정보입니다.
 * 시안(갤러리시안비교.dc.html 2a안)의 430px 기준 px 좌표를
 * 콘텐츠 폭(382px) 대비 %로 환산해 어떤 화면 폭에서도 같은 비율로 보이게 합니다.
 */
type Tile = {
  left: number
  top: number
  width: number
  height: number
  z: number
}
type Group = { ratio: string; tiles: Tile[] }

const GROUPS: Group[] = [
  // 큰 사진 왼쪽 · 작은 사진 오른쪽 아래
  {
    ratio: "382 / 306",
    tiles: [
      { left: 0, top: 0, width: 65.97, height: 98.04, z: 1 },
      { left: 63.87, top: 49.02, width: 36.13, height: 50.98, z: 2 },
    ],
  },
  // 큰 사진 오른쪽 · 작은 사진 왼쪽 두 장
  {
    ratio: "382 / 310",
    tiles: [
      { left: 32.98, top: 0, width: 67.02, height: 96.77, z: 1 },
      { left: 0, top: 9.68, width: 36.13, height: 42.58, z: 2 },
      { left: 0, top: 57.42, width: 36.13, height: 42.58, z: 2 },
    ],
  },
  // 큰 사진 왼쪽 아래 · 작은 사진 오른쪽 위
  {
    ratio: "382 / 340",
    tiles: [
      { left: 0, top: 11.76, width: 68.59, height: 88.24, z: 1 },
      { left: 63.87, top: 0, width: 36.13, height: 44.12, z: 2 },
    ],
  },
]

/**
 * 사진 목록을 그룹 템플릿 순서대로(2장 → 3장 → 2장 → 반복) 나눕니다.
 * 마지막 그룹은 남은 사진 수만큼만 채워집니다.
 */
const chunkByGroups = (count: number) => {
  const chunks: { group: Group; offset: number; size: number }[] = []
  let offset = 0
  let i = 0

  while (offset < count) {
    const group = GROUPS[i % GROUPS.length]
    const size = Math.min(group.tiles.length, count - offset)
    chunks.push({ group, offset, size })
    offset += size
    i += 1
  }

  return chunks
}

/**
 * 갤러리 컴포넌트입니다.
 * 사진을 겹침 콜라주로 배치하고, 누르면 라이트박스에서 크게 볼 수 있습니다.
 * 라이트박스 안에서는 좌우 화살표로 이전/다음 사진을 넘길 수 있습니다.
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

        <div className="collage">
          {chunkByGroups(GALLERY_IMAGES.length).map(
            ({ group, offset, size }, groupIdx) => (
              <LazyDiv
                key={groupIdx}
                className="reveal photo-group"
                style={{ aspectRatio: group.ratio }}
              >
                {group.tiles.slice(0, size).map((tile, tileIdx) => {
                  const idx = offset + tileIdx
                  return (
                    <button
                      key={idx}
                      type="button"
                      className="tile"
                      style={{
                        left: `${tile.left}%`,
                        top: `${tile.top}%`,
                        width: `${tile.width}%`,
                        height: `${tile.height}%`,
                        zIndex: tile.z,
                      }}
                      onClick={() => setSelected(idx)}
                      aria-label={`사진 ${idx + 1} 크게 보기`}
                    >
                      <img
                        src={GALLERY_IMAGES[idx]}
                        alt={`gallery-${idx + 1}`}
                        draggable={false}
                      />
                      <span className="zoom-badge" aria-hidden="true">
                        ⤢
                      </span>
                    </button>
                  )
                })}
              </LazyDiv>
            ),
          )}
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
