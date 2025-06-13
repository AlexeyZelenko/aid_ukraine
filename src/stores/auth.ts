import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../config/firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)

  const init = () => {
    onAuthStateChanged(auth, (authUser) => {
      user.value = authUser
      loading.value = false
    })
  }

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      user.value = null
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  return {
    user,
    loading,
    init,
    login,
    register,
    signOut
  }
})