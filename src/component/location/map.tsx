import { useEffect, useState, useRef } from "react"
import { useNaver } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import { LOCATION, WEDDING_HALL_POSITION } from "../../const"
import { NAVER_MAP_CLIENT_ID } from "../../env"

/**
 * 사용자 기기 종류(iOS, Android 등)를 확인합니다.
 */
const checkDevice = () => {
  const userAgent = window.navigator.userAgent
  if (userAgent.match(/(iPhone|iPod|iPad)/)) {
    return "ios"
  } else if (userAgent.match(/(Android)/)) {
    return "android"
  } else {
    return "other"
  }
}

/**
 * 지도 영역과 길찾기 앱 버튼을 함께 렌더링합니다.
 * 네이버 지도 키가 없으면 지도 자리에 안내 플레이스홀더를 보여주고,
 * 길찾기 버튼은 키와 무관하게 항상 동작합니다.
 *
 * @returns {JSX.Element} 지도 컴포넌트
 */
export const Map = () => {
  return (
    <>
      {NAVER_MAP_CLIENT_ID ? <NaverMap /> : <EmbedMap />}
      <Navigation />
    </>
  )
}

/**
 * 네이버 지도 키가 없을 때 사용하는 구글 지도 임베드입니다.
 * 별도의 API 키·발급 없이 좌표만으로 실제 지도를 표시합니다.
 */
const EmbedMap = () => {
  const [lng, lat] = WEDDING_HALL_POSITION
  return (
    <div className="map-wrapper">
      <iframe
        title="예식장 위치"
        className="map-inner"
        src={`https://www.google.com/maps?q=${lat},${lng}&z=16&hl=ko&output=embed`}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

/**
 * 네이버 지도를 실제로 렌더링하는 내부 컴포넌트입니다.
 */
const NaverMap = () => {
  const naver = useNaver()
  const ref = useRef<HTMLDivElement>(null)

  // 모바일에서 스크롤 중 지도가 조작되는 것을 방지하기 위한 잠금 상태
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)

  const flashLockMessage = () => {
    setShowLockMessage(true)
    if (lockMessageTimeout.current !== null) {
      clearTimeout(lockMessageTimeout.current)
    }
    lockMessageTimeout.current = window.setTimeout(
      () => setShowLockMessage(false),
      3000,
    )
  }

  useEffect(() => {
    // 네이버 지도 SDK가 로드되면 지도를 초기화합니다.
    if (naver) {
      const map = new naver.maps.Map(ref.current, {
        center: new naver.maps.LatLng(
          WEDDING_HALL_POSITION[1],
          WEDDING_HALL_POSITION[0],
        ),
        zoom: 17,
      })

      // 마커 추가
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          WEDDING_HALL_POSITION[1],
          WEDDING_HALL_POSITION[0],
        ),
        map,
      })

      return () => {
        map.destroy()
      }
    }
  }, [naver])

  return (
    <div className="map-wrapper">
      {/* 잠금 상태일 때 오버레이 표시 */}
      {locked && (
        <div
          className="lock"
          onTouchStart={flashLockMessage}
          onMouseDown={flashLockMessage}
        >
          {showLockMessage && (
            <div className="lock-message">
              <LockIcon /> 자물쇠 버튼을 눌러
              <br />
              터치 잠금 해제 후 확대 및 이동해 주세요.
            </div>
          )}
        </div>
      )}

      {/* 잠금 해제 버튼 */}
      <button
        type="button"
        className={"lock-button" + (locked ? "" : " unlocked")}
        onClick={() => {
          if (lockMessageTimeout.current !== null) {
            clearTimeout(lockMessageTimeout.current)
          }
          setShowLockMessage(false)
          setLocked((locked) => !locked)
        }}
        aria-label={locked ? "지도 잠금 해제" : "지도 잠금"}
      >
        {locked ? <LockIcon /> : <UnlockIcon />}
      </button>

      {/* 지도가 렌더링될 실제 요소 */}
      <div className="map-inner" ref={ref}></div>
    </div>
  )
}

/**
 * 길찾기 앱(네이버 지도, 카카오 맵, 티맵) 연결 버튼 모음입니다.
 * 장소 ID 없이 좌표·장소명 기반 링크로 동작하므로, 좌표만 정확하면
 * 어떤 기기에서도 올바른 위치로 연결됩니다.
 */
const Navigation = () => {
  const [lng, lat] = WEDDING_HALL_POSITION

  return (
    <div className="navigation">
      {/* 네이버 지도 — 장소명 검색 (웹/모바일 앱 자동 연결) */}
      <button
        type="button"
        onClick={() =>
          window.open(
            `https://map.naver.com/p/search/${encodeURIComponent(LOCATION)}`,
            "_blank",
          )
        }
      >
        <img src={nmapIcon} alt="" />
        네이버지도
      </button>

      {/* 카카오맵 — 좌표+장소명 길찾기 링크 (웹/모바일 앱 자동 연결) */}
      <button
        type="button"
        onClick={() =>
          window.open(
            `https://map.kakao.com/link/to/${encodeURIComponent(LOCATION)},${lat},${lng}`,
            "_blank",
          )
        }
      >
        <img src={knaviIcon} alt="" />
        카카오맵
      </button>

      {/* 티맵 — 모바일 앱 좌표 길찾기, 데스크톱은 카카오맵 웹으로 대체 */}
      <button
        type="button"
        onClick={() => {
          switch (checkDevice()) {
            case "ios":
            case "android": {
              const params = new URLSearchParams({
                goalx: lng.toString(),
                goaly: lat.toString(),
                goalName: LOCATION,
              })
              window.open(`tmap://route?${params.toString()}`, "_self")
              break
            }
            default:
              window.open(
                `https://map.kakao.com/link/to/${encodeURIComponent(LOCATION)},${lat},${lng}`,
                "_blank",
              )
              break
          }
        }}
      >
        <img src={tmapIcon} alt="" />T map
      </button>
    </div>
  )
}
