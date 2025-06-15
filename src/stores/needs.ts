import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../config/firebase'
import { collection, addDoc, getDocs, query, orderBy, where, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'

export interface Need {
  id?: string
  title: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  location: string
  contactPerson: string
  contactPhone: string
  contactTelegram: string
  quantity?: number
  status: 'open' | 'in-progress' | 'fulfilled'
  createdBy: string
  createdAt: Date
  updatedAt?: Date
  verified?: boolean
  // Нові поля для організації/волонтера
  createdByType: 'organization' | 'volunteer'
  organizationId?: string
  organizationName?: string
  volunteerId?: string
  volunteerName?: string
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
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Need[]
    } catch (error) {
      console.error('Error fetching needs:', error)
    }
    loading.value = false
  }

  const addNeed = async (need: Omit<Need, 'id' | 'status' | 'createdAt'>) => {
    try {
      // Очищаємо undefined значення перед збереженням
      const cleanedNeed = Object.fromEntries(
        Object.entries(need).filter(([_, value]) => value !== undefined)
      )
      
      const docRef = await addDoc(collection(db, 'needs'), {
        ...cleanedNeed,
        status: 'open',
        verified: false,
        createdAt: new Date()
      })
      return { success: true, id: docRef.id }
    } catch (error) {
      console.error('Error adding need:', error)
      return { success: false, error }
    }
  }

  const updateNeed = async (id: string, data: Partial<Need>) => {
    try {
      // Очищаємо undefined значення перед збереженням
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      )
      
      const needRef = doc(db, 'needs', id)
      await updateDoc(needRef, {
        ...cleanedData,
        updatedAt: new Date()
      })
      return { success: true }
    } catch (error) {
      console.error('Error updating need:', error)
      return { success: false, error }
    }
  }

  const deleteNeed = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'needs', id))
      return { success: true }
    } catch (error) {
      console.error('Error deleting need:', error)
      return { success: false, error }
    }
  }

  const verifyNeed = async (id: string, verified: boolean) => {
    try {
      const needRef = doc(db, 'needs', id)
      await updateDoc(needRef, {
        verified,
        updatedAt: new Date()
      })
      return { success: true }
    } catch (error) {
      console.error('Error verifying need:', error)
      return { success: false, error }
    }
  }

  const getNeedById = async (id: string) => {
    try {
      const needDoc = await getDoc(doc(db, 'needs', id))
      if (needDoc.exists()) {
        const data = needDoc.data()
        return {
          id: needDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate()
        } as Need
      }
      return null
    } catch (error) {
      console.error('Error getting need:', error)
      return null
    }
  }

  const getStats = () => {
    const totalNeeds = needs.value.length
    const openNeeds = needs.value.filter(need => need.status === 'open').length
    const inProgressNeeds = needs.value.filter(need => need.status === 'in-progress').length
    const fulfilledNeeds = needs.value.filter(need => need.status === 'fulfilled').length
    const urgentNeeds = needs.value.filter(need => need.priority === 'urgent').length
    const verifiedNeeds = needs.value.filter(need => need.verified).length

    return {
      totalNeeds,
      openNeeds,
      inProgressNeeds,
      fulfilledNeeds,
      urgentNeeds,
      verifiedNeeds
    }
  }

  return {
    needs,
    loading,
    fetchNeeds,
    addNeed,
    updateNeed,
    deleteNeed,
    verifyNeed,
    getNeedById,
    getStats
  }
})