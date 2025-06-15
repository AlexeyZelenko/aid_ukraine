import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../config/firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  getDoc 
} from 'firebase/firestore'

export interface Volunteer {
  id?: string
  name: string
  email: string
  phone: string
  organization: string
  type: 'volunteer' | 'fund' | 'rehabilitation' | 'church' | 'ngo'
  description: string
  location: string
  verified: boolean
  createdAt: Date
  updatedAt?: Date
  website?: string
  specializations?: string[]
  rating?: number
  experience?: number
}

export interface Project {
  id?: string
  organizationId: string
  title: string
  shortDescription: string
  fullDescription?: string
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  targetAmount?: number
  raisedAmount?: number
  startDate: Date
  endDate?: Date
  beneficiaries: number
  tags: string[]
  photos: string[]
  createdAt: Date
  updatedAt?: Date
}

export const useVolunteersStore = defineStore('volunteers', () => {
  const volunteers = ref<Volunteer[]>([])
  const organizations = ref<Volunteer[]>([])
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Волонтери
  const fetchVolunteers = async () => {
    loading.value = true
    error.value = null
    try {
      const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      volunteers.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Volunteer[]
    } catch (err) {
      console.error('Error fetching volunteers:', err)
      error.value = 'Помилка завантаження волонтерів'
    }
    loading.value = false
  }

  // Організації (фільтр волонтерів з типом не 'volunteer')
  const fetchOrganizations = async () => {
    loading.value = true
    error.value = null
    try {
      const q = query(
        collection(db, 'volunteers'), 
        where('type', '!=', 'volunteer'),
        orderBy('type'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      organizations.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Volunteer[]
    } catch (err) {
      console.error('Error fetching organizations:', err)
      error.value = 'Помилка завантаження організацій'
    }
    loading.value = false
  }

  // Додавання волонтера/організації
  const addVolunteer = async (volunteerData: Omit<Volunteer, 'id' | 'verified' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'volunteers'), {
        ...volunteerData,
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      // Оновлюємо локальний стан
      const newVolunteer: Volunteer = {
        id: docRef.id,
        ...volunteerData,
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      if (volunteerData.type === 'volunteer') {
        volunteers.value.unshift(newVolunteer)
      } else {
        organizations.value.unshift(newVolunteer)
      }
      
      return { success: true, id: docRef.id, data: newVolunteer }
    } catch (err) {
      console.error('Error adding volunteer:', err)
      return { success: false, error: err }
    }
  }

  // Оновлення волонтера/організації
  const updateVolunteer = async (id: string, updates: Partial<Volunteer>) => {
    try {
      const docRef = doc(db, 'volunteers', id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      })
      
      // Оновлюємо локальний стан
      const updateItem = (item: Volunteer) => {
        if (item.id === id) {
          return { ...item, ...updates, updatedAt: new Date() }
        }
        return item
      }
      
      volunteers.value = volunteers.value.map(updateItem)
      organizations.value = organizations.value.map(updateItem)
      
      return { success: true }
    } catch (err) {
      console.error('Error updating volunteer:', err)
      return { success: false, error: err }
    }
  }

  // Видалення волонтера/організації
  const deleteVolunteer = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'volunteers', id))
      
      // Видаляємо з локального стану
      volunteers.value = volunteers.value.filter(v => v.id !== id)
      organizations.value = organizations.value.filter(o => o.id !== id)
      
      return { success: true }
    } catch (err) {
      console.error('Error deleting volunteer:', err)
      return { success: false, error: err }
    }
  }

  // Верифікація волонтера/організації
  const verifyVolunteer = async (id: string) => {
    return updateVolunteer(id, { verified: true })
  }

  // Отримання волонтера по ID
  const getVolunteerById = async (id: string) => {
    try {
      const docRef = doc(db, 'volunteers', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate() || new Date(),
            updatedAt: docSnap.data().updatedAt?.toDate()
          } as Volunteer
        }
      } else {
        return { success: false, error: 'Волонтер не знайдений' }
      }
    } catch (err) {
      console.error('Error getting volunteer:', err)
      return { success: false, error: err }
    }
  }

  // Проєкти
  const fetchProjects = async (organizationId?: string) => {
    loading.value = true
    error.value = null
    try {
      let q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
      
      if (organizationId) {
        q = query(
          collection(db, 'projects'), 
          where('organizationId', '==', organizationId),
          orderBy('createdAt', 'desc')
        )
      }
      
      const querySnapshot = await getDocs(q)
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate?.toDate() || new Date(),
        endDate: doc.data().endDate?.toDate(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Project[]
      
      if (organizationId) {
        return { success: true, data: projectsData }
      } else {
        projects.value = projectsData
        return { success: true, data: projectsData }
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
      error.value = 'Помилка завантаження проєктів'
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Додавання проєкту
  const addProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      const newProject: Project = {
        id: docRef.id,
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      projects.value.unshift(newProject)
      
      return { success: true, id: docRef.id, data: newProject }
    } catch (err) {
      console.error('Error adding project:', err)
      return { success: false, error: err }
    }
  }

  // Оновлення проєкту
  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const docRef = doc(db, 'projects', id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      })
      
      projects.value = projects.value.map(project => {
        if (project.id === id) {
          return { ...project, ...updates, updatedAt: new Date() }
        }
        return project
      })
      
      return { success: true }
    } catch (err) {
      console.error('Error updating project:', err)
      return { success: false, error: err }
    }
  }

  // Видалення проєкту
  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id))
      projects.value = projects.value.filter(p => p.id !== id)
      return { success: true }
    } catch (err) {
      console.error('Error deleting project:', err)
      return { success: false, error: err }
    }
  }

  // Статистика
  const getStats = () => {
    const totalVolunteers = volunteers.value.length
    const totalOrganizations = organizations.value.length
    const verifiedVolunteers = volunteers.value.filter(v => v.verified).length
    const verifiedOrganizations = organizations.value.filter(o => o.verified).length
    const activeProjects = projects.value.filter(p => p.status === 'active').length
    const completedProjects = projects.value.filter(p => p.status === 'completed').length
    
    return {
      totalVolunteers,
      totalOrganizations,
      verifiedVolunteers,
      verifiedOrganizations,
      pendingVolunteers: totalVolunteers - verifiedVolunteers,
      pendingOrganizations: totalOrganizations - verifiedOrganizations,
      activeProjects,
      completedProjects,
      totalProjects: projects.value.length
    }
  }

  return {
    // State
    volunteers,
    organizations,
    projects,
    loading,
    error,
    
    // Volunteers & Organizations
    fetchVolunteers,
    fetchOrganizations,
    addVolunteer,
    updateVolunteer,
    deleteVolunteer,
    verifyVolunteer,
    getVolunteerById,
    
    // Projects
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    
    // Utils
    getStats
  }
})