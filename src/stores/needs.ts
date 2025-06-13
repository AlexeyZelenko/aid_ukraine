import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../config/firebase'
import { collection, addDoc, getDocs, query, orderBy, where } from 'firebase/firestore'

export interface Need {
  id?: string
  title: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  location: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
  quantity?: number
  status: 'open' | 'in-progress' | 'fulfilled'
  createdBy: string
  createdAt: Date
}

export const useNeedsStore = defineStore('needs', () => {
  const needs = ref<Need[]>([])
  const loading = ref(false)

  const fetchNeeds = async (category?: string) => {
    loading.value = true
    try {
      let q = query(collection(db, 'needs'), orderBy('createdAt', 'desc'))
      if (category) {
        q = query(collection(db, 'needs'), where('category', '==', category), orderBy('createdAt', 'desc'))
      }
      const querySnapshot = await getDocs(q)
      needs.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Need[]
    } catch (error) {
      console.error('Error fetching needs:', error)
    }
    loading.value = false
  }

  const addNeed = async (need: Omit<Need, 'id' | 'status' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'needs'), {
        ...need,
        status: 'open',
        createdAt: new Date()
      })
      return { success: true, id: docRef.id }
    } catch (error) {
      console.error('Error adding need:', error)
      return { success: false, error }
    }
  }

  return {
    needs,
    loading,
    fetchNeeds,
    addNeed
  }
})