import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"
import { useToast } from "../toast"

const baseUrl = import.meta.env.BASE_URL

/**
 * 현재 청첩장의 공유용 절대 주소를 만듭니다.
 */
const getShareUrl = () =>
  window.location.protocol + "//" + window.location.host + baseUrl

/**
 * 공유하기(SHARE) 섹션입니다.
 * 카카오톡 공유와 링크 복사를 제공합니다.
 *
 * @returns {JSX.Element} 공유 섹션
 */
export const ShareButton = () => {
  const kakao = useKakao()
  const showToast = useToast()

  const share = () => {
    const shareUrl = getShareUrl()

    // 카카오 SDK(키)가 있으면 카카오톡 위치 공유 템플릿으로 전송
    if (kakao) {
      kakao.Share.sendDefault({
        objectType: "location",
        address: SHARE_ADDRESS,
        addressTitle: SHARE_ADDRESS_TITLE,
        content: {
          title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
          description:
            WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
          imageUrl: shareUrl + "/preview_image.png",
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
        buttons: [
          {
            title: "초대장 보기",
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
          },
        ],
      })
      return
    }

    // 키가 없으면 기기 기본 공유 시트 사용 (모바일에서 카카오톡 등 선택 가능),
    // 미지원 환경(주로 데스크톱)에서는 링크 복사로 대체합니다.
    if (navigator.share) {
      navigator
        .share({
          title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
          text: WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
          url: shareUrl,
        })
        .catch(() => {})
    } else {
      copyLink()
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl())
      showToast("링크가 복사되었습니다.")
    } catch {
      showToast("복사에 실패했습니다.")
    }
  }

  return (
    <section className="section alt share">
      <LazyDiv className="reveal eyebrow">SHARE</LazyDiv>

      <LazyDiv className="reveal share-buttons">
        <button type="button" onClick={share}>
          {kakao ? "카카오톡 공유" : "공유하기"}
        </button>
        <button type="button" onClick={copyLink}>
          링크 복사
        </button>
      </LazyDiv>
    </section>
  )
}
