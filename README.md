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
├── app.config.js
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

## Firebase 연동 준비 (진행 중)
1. Firebase 콘솔에서 프로젝트 및 iOS/Android 앱을 등록하고 `GoogleService-Info.plist`, `google-services.json`을 내려받습니다. 두 파일은 저장소에 커밋하지 않고 로컬에만 보관합니다.
2. `.env` 파일을 생성하고 다음 항목을 채웁니다. (예시는 `.env.example` 참고)
   ```
   FIREBASE_API_KEY=...
   FIREBASE_AUTH_DOMAIN=...
   FIREBASE_PROJECT_ID=...
   FIREBASE_STORAGE_BUCKET=...
   FIREBASE_MESSAGING_SENDER_ID=...
   FIREBASE_APP_ID=...
   FIREBASE_MEASUREMENT_ID=... # 선택
   ```
3. `expo start` 전에 `expo install firebase` 또는 `npm install firebase`로 Firebase Web SDK를 설치합니다.
4. 앱 실행 시 `src/lib/firebase.ts`가 `app.config.js`의 `extra.firebase` 설정을 읽어 Firebase를 초기화합니다. 값이 비어 있으면 오류가 발생하므로 환경 변수를 반드시 채워주세요.

## 다음 단계
- Firebase Authentication/Firestore 연동 및 보안 규칙 적용
- 테스트 계정/목업 데이터 자동 주입 흐름 설계
- 감정 통계 시각화를 위한 그래프 라이브러리 고도화
