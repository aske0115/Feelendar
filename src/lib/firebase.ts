import Constants from 'expo-constants';
import { FirebaseOptions, initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config =
  (Constants.expoConfig?.extra?.firebase as FirebaseOptions | undefined) ??
  (Constants.manifest?.extra?.firebase as FirebaseOptions | undefined);

if (!config || !config.apiKey) {
  throw new Error('Firebase 설정을 찾을 수 없습니다. 환경 변수를 확인해주세요.');
}

const app = getApps().length ? getApp() : initializeApp(config);

export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);
