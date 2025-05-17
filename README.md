# Up & Down Client

<p align="center">
  <img src="public/images/logo.webp" alt="Up & Down logo" width="180" />
</p>

실시간 찬반 토론 플랫폼 **“Up & Down”** 의 프론트엔드 코드 베이스입니다.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Available Scripts](#available-scripts)
5. [Project Structure](#project-structure)
6. [Environment Variables](#environment-variables)
7. [Commit Convention](#commit-convention)
8. [License](#license)

---

## Features <a id="features"></a>

| 구분                     | 설명                                             |
| ------------------------ | ------------------------------------------------ |
| 🔵 **찬성 / 🔴 반대** UI | 네온 글로우 로고 & 색상 테마, 실시간 퍼센티지 바 |
| 💬 익명 댓글             | IP 단위 Rate-Limit, 좋아요 1회 제한              |
| 🕒 마감 타이머           | 논쟁 종료 시 UI 잠금 & 결과 고정                 |

---

## Tech Stack <a id="tech-stack"></a>

| 범주           | 라이브러리                                   |
| -------------- | -------------------------------------------- |
| **Framework**  | React 19, Next 15 (App Router, Metadata API) |
| **UI / Style** | Tailwind CSS 4, Shadcn                       |

---

## Getting Started <a id="getting-started"></a>

```bash
# 1. 의존성 설치
pnpm i

# 2. 개발 서버 (http://localhost:3000)
pnpm dev

# 3. 프로덕션 빌드
pnpm build && pnpm start
```

> **Node ≥ 20**, **pnpm ≥ 8** 이상 권장

---

## Available Scripts <a id="available-scripts"></a>

| 명령어       | 설명                             |
| ------------ | -------------------------------- |
| `pnpm dev`   | Turbopack 기반 개발 서버 (HMR)   |
| `pnpm build` | 프로덕션 빌드 (`.next/`)         |
| `pnpm start` | 로컬 프로덕션 실행               |
| `pnpm lint`  | ESLint + TypeScript strict check |

---

## Project Structure <a id="project-structure"></a>

```
up-down-client/
├─ public/
│  ├─ icons/        # 파비콘·애플 터치 아이콘
│  └─ og/           # OG 기본 이미지
├─ src/
│  ├─ app/          # Next 15 앱 라우터
│  ├─ components/   # UI 컴포넌트 (shadcn 패턴)
│  ├─ libs/         # 유틸리티·API 래퍼
│  └─ styles/       # 글로벌 CSS
└─ tailwind.config.ts
```

---

## Environment Variables <a id="environment-variables"></a>

`.env.local`

```env
NEXT_PUBLIC_API_BASE=
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
```

---

## Commit Convention <a id="commit-convention"></a>

커밋 메시지는 **Conventional Commits** 형식을 따릅니다.

```
feat: 새 토론 카드 컴포넌트 추가
fix(ui): 모바일 뷰에서 버튼 크기 오류 수정
chore(deps): tailwind-merge 3.2.1 → 3.2.2
```

---

## License <a id="license"></a>

Distributed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.
© 2025 Up & Down Team
