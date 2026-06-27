import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

// dayjs 설정: UTC 및 타임존 플러그인 확장, 한국어 로캘 설정
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

/**
 * 예식 일시 설정
 * Asia/Seoul 타임존 기준으로 설정합니다.
 */
export const WEDDING_DATE = dayjs.tz("2026-11-14 13:00", "Asia/Seoul")

/**
 * 예식 일시 포맷
 * 분이 0이면 분을 생략하고, 그 외에는 표시합니다.
 * 예: 2024년 8월 24일 토요일 오후 1시
 */
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

/**
 * 예식 당월 휴무일 (달력 표시용)
 * 예: 8월 15일 광복절
 */
export const HOLIDAYS = [] // 11월 공휴일 없음

/**
 * 예식 장소 명칭
 */
export const LOCATION = "네이버 1784"

/**
 * 예식 장소 상세 주소
 */
// TODO: 정확한 도로명 주소 확인 (네이버 1784 = 경기 성남시 분당구 정자일로 95, 28층)
export const LOCATION_ADDRESS = "경기 성남시 분당구 정자일로 95, 28층"

/**
 * 카카오톡 공유 시 사용할 위치 정보 주소
 * 필요에 따라 LOCATION과 다르게 설정할 수 있습니다.
 */
export const SHARE_ADDRESS = LOCATION

/**
 * 카카오톡 공유 시 표시될 위치 제목
 */
export const SHARE_ADDRESS_TITLE = LOCATION

/**
 * 지도 서비스(네이버, 카카오)에 사용할 좌표 [경도, 위도]
 */
// TODO: 네이버 1784 좌표로 교체 (현재 값은 템플릿 기본값=서울대)
export const WEDDING_HALL_POSITION = [126.9594982, 37.4657134]

/**
 * 네이버 지도 장소 ID (NMAP_PLACE_ID)
 * 네이버 지도에서 장소 검색 후 URL의 숫자 부분을 입력합니다.
 */
// TODO: 네이버 1784 장소 ID로 교체
export const NMAP_PLACE_ID = 13321741

/**
 * 카카오 지도 장소 ID (KMAP_PLACE_ID)
 * 카카오 지도에서 장소 상세보기 클릭 후 URL의 숫자 부분을 입력합니다.
 */
// TODO: 네이버 1784 장소 ID로 교체
export const KMAP_PLACE_ID = 8634826

// 신부 정보 설정
export const BRIDE_FULLNAME = "김민해"
export const BRIDE_FIRSTNAME = "민해"
export const BRIDE_TITLE = "차녀"
export const BRIDE_FATHER = "김대수"
export const BRIDE_MOTHER = "김문주"

/**
 * 신부측 연락처 및 계좌 정보
 * TODO: 전화번호 · 계좌번호 채우기
 */
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-0000-0000",
    account: "○○은행 0000000000000",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "○○은행 0000000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-0000-0000",
    account: "○○은행 0000000000000",
  },
]

// 신랑 정보 설정
export const GROOM_FULLNAME = "하승우"
export const GROOM_FIRSTNAME = "승우"
export const GROOM_TITLE = "차남"
export const GROOM_FATHER = "하진훈"
export const GROOM_MOTHER = "박경순"

/**
 * 신랑측 연락처 및 계좌 정보
 * TODO: 전화번호 · 계좌번호 채우기
 */
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-0000-0000",
    account: "○○은행 0000000000000",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-0000-0000",
    account: "○○은행 0000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-0000-0000",
    account: "○○은행 0000000000000",
  },
]
