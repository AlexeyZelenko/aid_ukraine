import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../config/firebase'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'

export interface Volunteer {
  id?: string
  name: string
  email: string
  phone: string
  organization: string
  type: 'volunteer' | 'fund' | 'rehabilitation'
  description: string
  location: string
  verified: boolean
  createdAt: Date
}

export const useVolunteersStore = defineStore('volunteers', () => {
  const volunteers = ref<Volunteer[]>([])
  const loading = ref(false)

  const fetchVolunteers = async () => {
    loading.value = true
    try {
      const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      volunteers.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Volunteer[]
    } catch (error) {
      console.error('Error fetching volunteers:', error)
    }
    loading.value = false
  }

  const addVolunteer = async (volunteer: Omit<Volunteer, 'id' | 'verified' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'volunteers'), {
        ...volunteer,
        verified: false,
        createdAt: new Date()
      })
      return { success: true, id: docRef.id }
    } catch (error) {
      console.error('Error adding volunteer:', error)
      return { success: false, error }
    }
  }

  return {
    volunteers,
    loading,
    fetchVolunteers,
    addVolunteer
  }
})