# 모바일 청첩장 셀프호스팅 레퍼런스 모음

> 깃헙/셀프호스팅으로 모바일 청첩장을 직접 만들기 위한 공개 오픈소스 레퍼런스 정리
> 작성일: 2026-06-27

---

## 🇰🇷 한국형 모바일 청첩장 (가장 추천 — 바로 따라하기 좋음)

한국 청첩장 형식(인사말 · 갤러리 · 오시는 길 · 계좌번호 · 방명록 · 카카오 공유 등)에 맞는 레포들.

| 레포                                                                                                  | 스택                | 특징                                            |
| --------------------------------------------------------------------------------------------------- | ----------------- | --------------------------------------------- |
| [juhonamnam/wedding-invitation](https://github.com/juhonamnam/wedding-invitation)                   | React             | **config + 사진만 교체**하면 되도록 설계, 설명이 친절. 입문용 1순위 |
| [anotheranotherhoon/wedding-invitation](https://github.com/anotheranotherhoon/wedding-invitation)   | Next.js           | 최신 스택, 깔끔한 구조                                 |
| [heejin-hwang/mobile-wedding-invitation](https://github.com/heejin-hwang/mobile-wedding-invitation) | React + TS + Vite | 봄 느낌의 화사한 디자인                                 |
| [knm8643/wedding-public](https://github.com/knm8643/wedding-public)                                 | -                 | 디자인/개발자 누구나 자유롭게 쓰고 기여하라고 공개                  |
| [Esantomi/wedding](https://github.com/Esantomi/wedding)                                             | -                 | 이미지 제외 전 코드 자유 사용 허용                          |
| [AndersonChoi/wedding-card](https://github.com/AndersonChoi/wedding-card)                           | -                 | 실제 결혼식 사용 청첩장                                 |
| [S-jooyoung/WEDDING_INVITATION](https://github.com/S-jooyoung/WEDDING_INVITATION)                   | -                 | 심플한 기본형                                       |
| [SNURFER/wedding-invi](https://github.com/SNURFER/wedding-invi)                                     | -                 | 개발 후기와 함께 공개                                  |

---

## 🌍 해외 인기 레포 (디자인·기능 참고용, 스타순)

한국식 양식은 아니지만 **RSVP · 카운트다운 · 애니메이션** 등 기능과 디자인 완성도가 높음.

| 레포 | ⭐ | 스택 |
|------|-----|------|
| [rampatra/wedding-website](https://github.com/rampatra/wedding-website) | 1.8k | HTML + Bootstrap + Google Sheets (RSVP를 구글시트로 관리) |
| [sakeenah 템플릿 (Topics 참고)](https://github.com/topics/wedding-invitation) | 185 | **React + Vite + Tailwind + Framer Motion** (디자인 최상급) |
| [LeeKyuHyuk/wedding-invitation](https://github.com/LeeKyuHyuk/wedding-invitation) | 165 | React + TypeScript |
| [MattiasHenders/wedding-template](https://github.com/MattiasHenders/wedding-template) | - | React, RSVP·선물·지도 기능, MIT 라이선스 |
| [ifindev/wedding-invitation-site](https://github.com/ifindev/wedding-invitation-site) | - | React, Figma 디자인 + Atomic Design |

---

## 📚 더 둘러보기 (GitHub Topics)

- <https://github.com/topics/wedding-invitation>
- <https://github.com/topics/wedding-website>
- <https://github.com/topics/digital-invitation>
- <https://github.com/topics/wedding-template>

---

## ✍️ 직접 만든 개발자 후기 (선택·삽질 포인트 미리 파악)

- [모바일 청첩장 오픈소스 프로젝트 소개 (Dev Repository)](https://dev-repository.com/?p=1349)
- [FE 개발자의 모바일청첩장 (velog)](https://velog.io/@heyday_xz/FE-개발자의-모바일청첩장)
- [핸드메이드 모바일 청첩장 제작 후기 (velog)](https://velog.io/@cadenzah/wedding-invitation-review)
- [모바일 청첩장을 직접 만들어본 후기 (Flynndev)](https://blog.flynnpark.dev/18)
- [결혼식 청첩장 Github blog로 만들기 (데브원영)](https://blog.voidmainvoid.net/217)
- [17화 모바일 청첩장을 직접 개발해봤다 (brunch)](https://brunch.co.kr/@junha04/151)
- [immutable.wedding 개발후기 (SOSOLOG)](https://so-so.dev/essay/immutable-wedding-epilogue/)
- [Flutter Web으로 만드는 모바일 청첩장 (DevJin-Blog)](https://devjin-blog.com/wedding-invitation-flutter-1/)

---

## 💡 추천 진행 방향

- **빠르게 끝내고 싶다** → `juhonamnam/wedding-invitation` 포크 → config·사진 교체 → **GitHub Pages / Vercel 무료 배포**
- **디자인을 직접 다듬고 싶다** → `sakeenah` 템플릿(Tailwind + Framer Motion) 기반으로 한국식 섹션(계좌·카카오공유) 추가

### 한국 하객 대상이면 꼭 챙길 것
- [ ] 카카오톡 공유 메타태그 (Open Graph / 카카오 링크 SDK)
- [ ] 계좌번호 복사 버튼
- [ ] 네이버 / 카카오 지도 임베드
- [ ] 갤러리 (사진 슬라이드 / 라이트박스)
- [ ] D-Day 카운트다운
- [ ] 방명록 / RSVP (참석 여부)
- [ ] 배경 음악 (선택)

---

## 🛠 배포 옵션 (무료)

| 방식 | 적합 스택 | 비고 |
|------|-----------|------|
| GitHub Pages | 정적 HTML / Vite 빌드 | 가장 간단, 커스텀 도메인 가능 |
| Vercel | Next.js / React | 빌드·배포 자동화, 추천 |
| Netlify | 정적 + 서버리스 함수 | RSVP 폼 처리에 유리 |
| Cloudflare Pages | 정적 + Functions | 빠른 CDN |
