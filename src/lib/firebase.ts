import Constants from 'expo-constants';
import { FirebaseOptions, initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getAuth } from 'firebase/auth';

const config =
  (Constants.expoConfig?.extra?.firebase as FirebaseOptions | undefined) ??
  (Constants.manifest?.extra?.firebase as FirebaseOptions | undefined);

if (!config || !config.apiKey) {
  throw new Error('Firebase 설정을 찾을 수 없습니다. 환경 변수를 확인해주세요.');
}

const apps = getApps();
const app = apps.length ? getApp() : initializeApp(config);

let asyncStorage: any = null;
let getReactNativePersistenceFn: ((storage: any) => any) | null = null;
try {
  asyncStorage = require('@react-native-async-storage/async-storage').default;
  getReactNativePersistenceFn = require('firebase/auth/react-native').getReactNativePersistence;
} catch (error) {
  console.warn(
    '[Feelendar] AsyncStorage 모듈을 찾을 수 없어 Firebase Auth 세션이 메모리에만 저장됩니다. ' +
      '세션 유지를 위해 "@react-native-async-storage/async-storage"를 설치해주세요.'
  );
}

let authInstance;
if (apps.length === 0) {
  if (asyncStorage && getReactNativePersistenceFn) {
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistenceFn(asyncStorage)
    });
  } else {
    authInstance = initializeAuth(app);
  }
} else {
  authInstance = getAuth(app);
}

export const firebaseApp = app;
export const auth = authInstance;
export const db = getFirestore(app);
