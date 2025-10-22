# Feelendar

React Native(Expo) 기반의 감정 기록 및 공감 커뮤니티 앱입니다. Firebase 연동 전 단계로, 회원가입/로그인 UI와 홈·기록·커뮤니티·통계 화면이 동작하도록 구현되어 있습니다.

## 주요 기능
- 이메일/비밀번호 회원가입 · 로그인 폼 (로컬 상태로 즉시 로그인 처리)
- 오늘의 기분 기록 및 공개 범위 선택
- 최신 기분 카드, 커뮤니티 요약, 주간 통계 등을 제공하는 홈 화면
- 비슷한 감정을 가진 사용자 피드에서 공감/응원/팁 반응 남기기
- 기분 히스토리와 주간 감정 트렌드 확인
- 녹색 계열의 현대적인 UI 디자인 적용

## 개발 환경
- Expo SDK 50
- React Native 0.73 + TypeScript
- React Navigation

## 실행 방법
1. 의존성 설치
   ```bash
   npm install
   ```
2. Expo 개발 서버 실행
   ```bash
   npm run start
   ```
3. 안내에 따라 iOS/Android 시뮬레이터 또는 Expo Go 앱에서 프로젝트를 확인합니다.

## 구조
```
├── App.tsx
├── app.json
├── docs/
├── src
│   ├── components
│   ├── context
│   ├── hooks
│   ├── navigation
│   ├── screens
│   ├── theme
│   └── types
└── tsconfig.json
```

## 디자인 자산
- 저장소에는 Expo 기본 아이콘/스플래시 이미지를 포함하지 않았으며, 필요 시 `app.json`에서 원하는 경로로 교체해 사용할 수 있습니다.

## 다음 단계
- Firebase Authentication/Firestore 연동 및 보안 규칙 적용
- 사용자별 데이터 분리와 실제 커뮤니티 데이터 동기화
- 감정 통계 시각화를 위한 그래프 라이브러리 고도화
