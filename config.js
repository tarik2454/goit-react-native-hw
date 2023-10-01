// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAk9pyFBJeLNlv5ttB61mLVReSTt372Fuk',
  authDomain: 'my-react-native-project-7a827.firebaseapp.com',
  projectId: 'my-react-native-project-7a827',
  storageBucket: 'my-react-native-project-7a827.appspot.com',
  messagingSenderId: '376514940738',
  appId: '1:376514940738:web:8b46cfeaa00326435f02db',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
