# Up & Down Client

<p align="center">
  <img src="public/logo.webp" alt="Up & Down logo" width="180" />
</p>

실시간 찬반 토론 플랫폼 **“Up & Down”** 의 프론트엔드 코드베이스입니다.
React + Vite로 빌드되며, UI는 Tailwind CSS와 Shadcn 컴포넌트로 구현되었습니다.

---

## 목차

1. [주요 기능](#주요-기능)
2. [기술 스택](#기술-스택)
3. [시작하기](#시작하기)
4. [스크립트](#스크립트)
5. [폴더 구조](#폴더-구조)
6. [환경 변수](#환경-변수)
7. [커밋 컨벤션](#커밋-컨벤션)
8. [라이선스](#라이선스)

---

## 주요 기능

| 구분                     | 설명                                        |
| ------------------------ | ------------------------------------------- |
| 🔵 **찬성 / 🔴 반대** UI | 네온 글로우 색상 테마, 실시간 퍼센티지 바   |
| 💬 익명 댓글             | IP 단위 Rate-Limit, 좋아요 1회 제한         |
| 🕒 마감 타이머           | 논쟁 종료 시 UI 잠금 & 결과 고정            |
| ♾️ 인피니트 스크롤       | TanStack React Query + IntersectionObserver |
| ⚡ Skeleton 로딩         | 초기 데이터 페칭 시 Skeleton 컴포넌트 표시  |

---

## 기술 스택

| 범주                 | 라이브러리 / 버전      |
| -------------------- | ---------------------- |
| **Language**         | TypeScript 5.8         |
| **Build Tool**       | Vite 6                 |
| **Framework**        | React 19               |
| **Router**           | React Router 7         |
| **Data Fetching**    | TanStack React Query 5 |
| **Styling**          | Tailwind CSS 4         |
| **UI Kit**           | shadcn/ui              |
| **Animation**        | motion/react           |
| **State Management** | Zustand 5              |

---

> **Node 22** 및 **pnpm 10** 이상을 권장합니다.

---

## 스크립트

| 명령어         | 설명                                     |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Vite 개발 서버 (`http://localhost:3000`) |
| `pnpm build`   | 프로덕션 빌드(`dist/`)                   |
| `pnpm preview` | 빌드 결과 로컬 미리보기                  |
| `pnpm lint`    | ESLint + TypeScript strict check         |

---

## 폴더 구조

```
.
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── routes/
│   ├── pages/
│   ├── components/
│   │   ├── home/
│   │   ├── debate/
│   │   ├── layout/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── schemas/
│   ├── services/
│   └── types/
└── vite.config.ts
```

---

## 환경 변수

루트에 `.env.development` 파일을 생성하여 값을 설정합니다.

```env
# 개발 기준
NODE_ENV=development

VITE_CLIENT_URL=http://localhost:3000
VITE_SERVER_URL=http://localhost:4000
```

---

## 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

```
feat(debate): 토론 카드 컴포넌트 추가
fix(ui): 모바일에서 버튼 높이 오류 수정
chore(deps): react-query 5.75.0 → 5.76.2
```

---

## 라이선스

이 프로젝트는 [MIT 라이선스](./LICENCE)를 따릅니다.
© 2025 Up & Down Team
