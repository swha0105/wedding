# 모바일 청첩장 — 계획 & 체크리스트

> 결정된 것 / 완료된 것 / 남은 작업을 한눈에.
> 최종 수정: 2026-06-27

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

---

## ✅ 완료된 작업

- [x] 템플릿 도입 + 프로젝트를 `~/dev/wedding`으로 이동
- [x] 신랑/신부 + 양가 부모님 성함·호칭 입력 (`src/const.ts`)
- [x] 예식 일시 (2026-11-14 오후 1시), 장소명 (네이버 1784) 입력
- [x] 인사말 본문 입력 (마무리 문장만 미정)
- [x] 정적 모드 ON (방명록/RSVP OFF), 배포 주소(`homepage`) 설정
- [x] 테마색 변경 (분홍 → **파스텔 그린**, 네이버 그린 계열)
- [x] 떨어지는 효과 변경 (벚꽃잎 → **네잎클로버**)
- [x] 대문 "Save the date…" 문구 삭제 + 간격 조정
- [x] 갤러리: 캐러셀 → **3×4 썸네일 그리드 + 클릭 확대(라이트박스)**

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
- [ ] 인사말 **마무리 문장** (원문이 "오셔서 많은…"에서 끊김) — `src/component/invitation/index.tsx`
- [ ] 오시는 길 안내 (지하철/버스/주차/셔틀) — `location` / `information` 컴포넌트

### D. 사진 — `src/images/` (현재 템플릿 author 사진)
- [ ] 대문 `cover.png` 1장
- [ ] 갤러리 `image1~12.png` 12장 (3×4 그리드)
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
