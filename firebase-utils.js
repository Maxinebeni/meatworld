import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);

export function getAuthInstance() {
  return authInstance;
}