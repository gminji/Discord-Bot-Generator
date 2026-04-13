# Discord Bot Generator

**[English](README.md) · [日本語](README.ja.md)**

회원가입 없이, 웹에서 바로 [discord.js v14](https://discord.js.org/) 봇 프로젝트를 ZIP으로 생성하는 위저드입니다.

**라이브:** https://gminji.github.io/Discord-Bot-Generator/

---

## 기능

원하는 모듈을 선택하고 설정한 뒤, 완성된 봇 프로젝트를 다운로드하세요:

| 모듈 | 명령어 / 기능 |
|---|---|
| **모더레이션** | 킥, 밴, 뮤트/타임아웃, 경고, 밴 해제, 메시지 삭제 |
| **유틸리티** | 핑, 서버 정보, 유저 정보, 아바타, 도움말, 역할 목록 |
| **재미** | 매직 8볼, 주사위 굴리기, 농담, 동전 던지기 |
| **경제** | 잔액, 일일 보상, 작업, 송금, 리더보드 (JSON 기반, DB 불필요) |
| **자동 모더레이션** | 욕설 필터, 스팸 감지, 링크 차단 |
| **환영** | 새 멤버 환영 및 이별 메시지 |
| **반응 역할** | 메시지 반응 → 역할 자동 부여 |
| **자동 응답** | 특정 키워드/구문에 자동 답장 |
| **투표** | 이모지 투표 생성 (최대 5개 선택지) |

**명령어 스타일:** 슬래시 명령어 (`/`) 또는 접두사 명령어 (예: `!`)

**지원 언어:** English · 日本語 · 한국어

---

## 사용 방법

1. 라이브 사이트 접속
2. **1단계 — 기능 선택:** 원하는 모듈과 세부 명령어 선택
3. **2단계 — 설정:** 봇 접두사, 채널 ID, 경제 시스템 값 등 설정
4. **3단계 — 다운로드:** 내용 확인 후 ZIP 다운로드

### 다운로드 후

```bash
# 1. ZIP 압축 해제
# 2. 환경 변수 파일 복사
cp .env.example .env
# .env 파일에 봇 토큰 입력

# 3. 의존성 설치
npm install

# 4. (슬래시 명령어만) 명령어 등록 (최초 1회)
node deploy-commands.js

# 5. 봇 실행
npm start
```

---

## 기술 스택

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) — 상태 관리
- [JSZip](https://stuk.github.io/jszip/) + [file-saver](https://github.com/eligrey/FileSaver.js/) — ZIP 생성

---

## 로컬 개발

```bash
npm install
npm run dev
```

```bash
npm run build    # 프로덕션 빌드
npm run preview  # 프로덕션 빌드 미리보기
npm run lint     # ESLint
```

---

## 라이선스

MIT
