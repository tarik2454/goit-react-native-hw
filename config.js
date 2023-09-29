// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAlWMe-w-6_1kV-GmIbx3Y-O7StE6uyXv0',
  authDomain: 'base-for-react-nativ.firebaseapp.com',
  databaseURL:
    'https://base-for-react-nativ-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'base-for-react-nativ',
  storageBucket: 'base-for-react-nativ.appspot.com',
  messagingSenderId: '73094093366',
  appId: '1:73094093366:android:9899c88fecb01b6c931697',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
