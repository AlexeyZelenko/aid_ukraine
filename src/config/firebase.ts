import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {  
  apiKey: "AIzaSyCoQg6CNH3SeAa4KSLbky5FKBwQp_Cw1i4",
  authDomain: "aid-ukraine-ea616.firebaseapp.com",
  databaseURL: "https://aid-ukraine-ea616-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aid-ukraine-ea616",
  storageBucket: "aid-ukraine-ea616.firebasestorage.app",
  messagingSenderId: "497772774438",
  appId: "1:497772774438:web:1785af97a37351e71fd2e7",
  measurementId: "G-VFW92CFC2N"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const rtdb = getDatabase(app)

export default app