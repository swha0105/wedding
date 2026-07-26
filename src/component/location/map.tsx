import { useEffect, useState, useRef } from "react"
import { useKakao, useNaver } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
} from "../../const"
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
      {NAVER_MAP_CLIENT_ID ? <NaverMap /> : <MapPlaceholder />}
      <Navigation />
    </>
  )
}

/**
 * 네이버 지도 키가 없을 때 보여주는 자리 표시 영역입니다.
 */
const MapPlaceholder = () => (
  <div className="map-placeholder">
    <div className="grid" />
    <div className="pin-group">
      <div className="pin" />
      <div className="caption">지도 준비 중입니다</div>
    </div>
  </div>
)

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
 * 길찾기 앱(네이버 지도, 카카오 내비, 티맵) 연결 버튼 모음입니다.
 */
const Navigation = () => {
  const kakao = useKakao()

  return (
    <div className="navigation">
      {/* 네이버 지도 연동 */}
      <button
        type="button"
        onClick={() => {
          switch (checkDevice()) {
            case "ios":
            case "android":
              window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
              break
            default:
              window.open(
                `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                "_blank",
              )
              break
          }
        }}
      >
        <img src={nmapIcon} alt="" />
        네이버지도
      </button>

      {/* 카카오 내비 연동 */}
      <button
        type="button"
        onClick={() => {
          switch (checkDevice()) {
            case "ios":
            case "android":
              if (kakao)
                kakao.Navi.start({
                  name: LOCATION,
                  x: WEDDING_HALL_POSITION[0],
                  y: WEDDING_HALL_POSITION[1],
                  coordType: "wgs84",
                })
              break
            default:
              window.open(
                `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                "_blank",
              )
              break
          }
        }}
      >
        <img src={knaviIcon} alt="" />
        카카오맵
      </button>

      {/* 티맵 연동 */}
      <button
        type="button"
        onClick={() => {
          switch (checkDevice()) {
            case "ios":
            case "android": {
              const params = new URLSearchParams({
                goalx: WEDDING_HALL_POSITION[0].toString(),
                goaly: WEDDING_HALL_POSITION[1].toString(),
                goalName: LOCATION,
              })
              window.open(`tmap://route?${params.toString()}`, "_self")
              break
            }
            default: {
              alert("모바일에서 확인하실 수 있습니다.")
              break
            }
          }
        }}
      >
        <img src={tmapIcon} alt="" />T map
      </button>
    </div>
  )
}
