# 모바일 청첩장 — 계획 & 체크리스트

> 결정된 것 / 완료된 것 / 남은 작업을 한눈에.
> 최종 수정: 2026-07-26

---

## ✅ 결정된 사항

| 항목 | 결정 |
|------|------|
| 베이스 템플릿 | **[juhonamnam/wedding-invitation](https://github.com/juhonamnam/wedding-invitation)** (MIT) |
| 스택 | React + **Vite** + TypeScript + SCSS |
| 배포 | **GitHub Pages** (Actions 자동 빌드) |
| 호스팅 구조 | **Project 사이트** (루트는 나중에 블로그용으로 비워둠) |
| 주소(예정) | `https://swha0105.github.io/wedding` |
| 레포 이름 | `wedding` (신규 생성 예정 — 아직 푸시 전) |
| 방명록 / RSVP | **안 함 (A)** → 정적 모드 `VITE_STATIC_ONLY=true` |
| 프로젝트 위치 | `~/dev/wedding` (구글드라이브 밖으로 이동 완료) |
| 옛 `swha0105.github.io` 레포 | 사이트 내려감(404). 삭제 예정 (블로그용으로 비워둠) |
| 디자인 | **웜 아이보리/베이지 에디토리얼** — 시안 `~/dev/모바일 청첩장 디자인/모바일청첩장.dc.html` |
| 갤러리 구성 | **2a안 — 겹침 콜라주** (`갤러리시안비교.dc.html`) |
| 폰트 | **Pretendard** (jsDelivr CDN, dynamic subset) |

---

## ✅ 완료된 작업

- [x] 템플릿 도입 + 프로젝트를 `~/dev/wedding`으로 이동
- [x] 신랑/신부 + 양가 부모님 성함·호칭 입력 (`src/const.ts`)
- [x] 예식 일시 (2026-11-14 오후 1시), 장소명 (네이버 1784) 입력
- [x] 인사말 본문 입력 (마무리 문장만 미정)
- [x] 정적 모드 ON (방명록/RSVP OFF), 배포 주소(`homepage`) 설정
- [x] 대문 "Save the date…" 문구 삭제 + 간격 조정

### 디자인 전면 교체 (2026-07-26)

- [x] 테마 토큰 교체 (파스텔 그린 → **웜 아이보리/베이지**), 폰트 → Pretendard
- [x] 카드 레이아웃 → **430px 단일 컬럼 섹션 구조** (`.page` / `.section`)
- [x] 대문: 카드형 → **풀블리드 히어로 + 하단 그라데이션 페이드**
- [x] **D-DAY 카운트다운** 신규 (`src/component/dday`), 월 달력 제거
- [x] 인사말: 시안 문구 반영 + 연락처를 **모달 → 펼침형 아코디언**으로 변경
- [x] 갤러리: 3×4 그리드 → **겹침 콜라주(2a안)**, 라이트박스는 유지
- [x] 계좌: 모달 → **펼침형 아코디언 + 복사 토스트** (`src/component/toast` 신규)
- [x] 공유: 카카오톡 공유 + **링크 복사** 추가
- [x] 푸터(이름 · 날짜) 신규, 네잎클로버 낙하 효과 제거
- [x] 지도: 네이버 키 없을 때 **플레이스홀더**로 대체, 길찾기 버튼은 항상 노출

> 미사용이 된 컴포넌트(`calendar`, `bgEffect`, `button`, `guestbook`, `information/attendance`)는
> 되돌릴 수 있게 파일만 남겨두고 `App.tsx` / `App.scss`에서 연결만 끊었습니다.
> 방명록/RSVP를 다시 켤 경우 해당 스타일을 새 팔레트로 다시 손봐야 합니다.

---

## ❌ 남은 작업 (채워야 할 정보)

### A. 연락처 · 계좌  — `src/const.ts` (현재 더미값 `010-0000-0000`, `○○은행`)
- [ ] 신랑 / 신랑 아버지 / 신랑 어머니 — 전화번호 3, 계좌 3
- [ ] 신부 / 신부 아버지 / 신부 어머니 — 전화번호 3, 계좌 3
- (혼주 계좌 안 받으면 해당 줄 삭제 가능)

### B. 장소 상세 (지도 정확도) — `src/const.ts`
- [ ] 정확한 도로명 주소 (현재 "정자일로 95"는 추정 — 확인 필요)
- [ ] 네이버 1784 좌표 `[경도, 위도]` (현재 서울대 좌표)
- [ ] 네이버 지도 장소 ID / 카카오 지도 장소 ID

### C. 텍스트
- [x] 인사말 본문 — 시안 문구로 확정 (`src/component/invitation/index.tsx`)
- [ ] 오시는 길 안내 — 시안의 "정자역 4번 출구 도보 8분 / 지하 주차 2시간 무료"를 넣어뒀으나 **사실 확인 필요** (`src/component/location/index.tsx`)
- [ ] 층·홀 이름 (시안엔 "28층 스카이홀", `const.ts`엔 미반영)

### D. 사진 — `src/images/` (현재 템플릿 author 사진)
- [ ] 대문 `cover.png` 1장 (세로 2:3 비율 권장)
- [ ] 갤러리 `image1~12.png` 12장
  - 콜라주는 **2 → 3 → 2장 그룹이 반복**되는 구조. 각 그룹의 첫 장이 크게 들어가므로 대표 컷을 1·3·6·8·10번에 배치
- [ ] 공유 썸네일 `public/preview_image.png`

### E. (선택) 외부 키 — 켤 때만 — `.env`
- [ ] 카카오 공유 키 `VITE_KAKAO_SDK_JS_KEY` — 카톡 공유 버튼 쓸 때
- [ ] 네이버 지도 키 `VITE_NAVER_MAP_CLIENT_ID` — 인터랙티브 지도 쓸 때

---

## 🚀 배포 (준비되면)

1. Node 설치 (`brew install node`) → `npm install && npm run dev`로 로컬 확인
2. GitHub에 `wedding` 레포 생성 → `git init` 후 푸시
3. 레포 Settings → Pages → Source: **GitHub Actions**
4. Settings → Secrets and variables → **Variables**에 `VITE_STATIC_ONLY = true` 추가
5. 푸시 → 자동 빌드·배포 → `https://swha0105.github.io/wedding`
6. (정리) 옛 `swha0105.github.io` 레포 삭제

> 레퍼런스 레포 목록은 [REFERENCES.md](./REFERENCES.md) 참고.
