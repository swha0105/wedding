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
export const LOCATION = "네이버 1784 28층 스카이홀"

/**
 * 예식 장소 상세 주소
 */
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
 * 네이버 1784 (경기 성남시 분당구 정자일로 95) 좌표
 */
export const WEDDING_HALL_POSITION = [127.1053139, 37.3594556]

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
    phone: "010-8802-5083",
    account: "신한은행 110486867163",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-2705-5083",
    account: "국민은행 202211017152",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-4845-5083",
    account: "국민은행 66790204022931",
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
    phone: "010-4494-8050",
    account: "토스뱅크 100002361739",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-3420-8050",
    account: "토스뱅크 100192058798",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-9520-8050",
    account: "대구은행 068080398884",
  },
]
