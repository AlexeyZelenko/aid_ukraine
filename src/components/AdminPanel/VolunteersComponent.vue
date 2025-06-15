<template>
  <div class="component-content">
    <div class="header-section">
      <h2>Управління волонтерами</h2>
      <div class="header-actions">
        <button 
          @click="refreshData" 
          :disabled="loading"
          class="btn btn-secondary mr-2"
        >
          <i v-if="!loading" class="pi pi-refresh mr-2"></i>
          <i v-else class="pi pi-spin pi-spinner mr-2"></i>
          {{ loading ? 'Оновлення...' : 'Оновити' }}
        </button>
        <button class="btn btn-primary" @click="showAddModal = true">
          <i class="pi pi-plus mr-2"></i>
          Додати волонтера
        </button>
      </div>
    </div>

    <!-- Статистика -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue-500">
          <i class="pi pi-users"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ totalVolunteers }}</div>
          <div class="stat-label">Всього волонтерів</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-green-500">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ verifiedVolunteers }}</div>
          <div class="stat-label">Верифіковано</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-yellow-500">
          <i class="pi pi-clock"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ pendingVolunteers }}</div>
          <div class="stat-label">Очікують верифікації</div>
        </div>
      </div>
              <div class="stat-card">
          <div class="stat-icon bg-orange-500">
            <i class="pi pi-star"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ averageRating }}</div>
            <div class="stat-label">Середній рейтинг</div>
          </div>
        </div>
    </div>

    <!-- Фільтри -->
    <div class="filters-section">
      <div class="filter-group">
        <label>Пошук:</label>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Пошук за іменем, організацією..."
          class="form-control"
        >
      </div>
      <div class="filter-group">
        <label>Тип:</label>
        <select v-model="selectedType" class="form-control">
          <option value="">Усі типи</option>
          <option value="volunteer">Індивідуальний волонтер</option>
          <option value="fund">Благодійний фонд</option>
          <option value="rehabilitation">Центр реабілітації</option>
          <option value="church">Церква</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Статус:</label>
        <select v-model="selectedStatus" class="form-control">
          <option value="">Усі статуси</option>
          <option value="verified">Верифіковано</option>
          <option value="pending">Очікує верифікації</option>
        </select>
      </div>
    </div>

    <!-- Список волонтерів -->
    <div class="volunteers-list" v-if="!loading">
      <div v-if="filteredVolunteers.length === 0" class="empty-state">
        <i class="pi pi-users"></i>
        <p>Волонтерів не знайдено</p>
      </div>
      <div 
        v-for="volunteer in filteredVolunteers" 
        :key="volunteer.id"
        class="volunteer-card"
      >
        <div class="volunteer-avatar">
          <i :class="getTypeIcon(volunteer.type)"></i>
        </div>
        <div class="volunteer-info">
          <div class="volunteer-header">
            <h4>{{ volunteer.name }}</h4>
            <div class="volunteer-badges">
              <span :class="['badge', getTypeBadgeClass(volunteer.type)]">
                {{ getTypeLabel(volunteer.type) }}
              </span>
              <span v-if="volunteer.verified" class="badge badge-success">
                <i class="pi pi-check mr-1"></i>Верифіковано
              </span>
              <span v-else class="badge badge-warning">
                <i class="pi pi-clock mr-1"></i>Очікує
              </span>
            </div>
          </div>
          <p><i class="pi pi-building mr-2"></i>{{ volunteer.organization }}</p>
          <p><i class="pi pi-map-marker mr-2"></i>{{ volunteer.location }}</p>
          <p><i class="pi pi-envelope mr-2"></i>{{ volunteer.email }}</p>
          <p><i class="pi pi-phone mr-2"></i>{{ volunteer.phone }}</p>
          <div v-if="volunteer.rating || volunteer.experience" class="volunteer-stats">
            <span v-if="volunteer.rating" class="stat-item">
              <i class="pi pi-star-fill mr-1" style="color: #fbbf24;"></i>
              {{ volunteer.rating }}/5
            </span>
            <span v-if="volunteer.experience" class="stat-item">
              <i class="pi pi-briefcase mr-1" style="color: #6b7280;"></i>
              {{ volunteer.experience }} р.
            </span>
          </div>
          <p class="volunteer-description">{{ volunteer.description }}</p>
          <div v-if="volunteer.specializations" class="specializations">
            <span 
              v-for="spec in volunteer.specializations.slice(0, 3)" 
              :key="spec"
              class="specialization-tag"
            >
              {{ spec }}
            </span>
            <span v-if="volunteer.specializations.length > 3" class="more-tags">
              +{{ volunteer.specializations.length - 3 }}
            </span>
          </div>
        </div>
        <div class="volunteer-actions">
          <button class="btn btn-outline-primary btn-sm" @click="editVolunteer(volunteer)">
            <i class="pi pi-pencil"></i>
          </button>
          <button 
            v-if="!volunteer.verified" 
            class="btn btn-success btn-sm" 
            @click="verifyVolunteer(volunteer.id)"
          >
            <i class="pi pi-check"></i>
          </button>
          <button class="btn btn-outline-danger btn-sm" @click="deleteVolunteer(volunteer.id)">
            <i class="pi pi-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Лоадінг -->
    <div v-else class="loading-state">
      <i class="pi pi-spin pi-spinner"></i>
      <p>Завантаження волонтерів...</p>
    </div>

    <!-- Модальне вікно додавання/редагування -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ showEditModal ? 'Редагувати волонтера' : 'Додати нового волонтера' }}</h3>
          <button class="close-btn" @click="closeModals">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="modal-body">
          <div class="form-grid">
            <div class="form-group">
              <label>Ім'я / Назва організації *</label>
              <input 
                type="text" 
                v-model="form.name" 
                required 
                class="form-control"
                placeholder="Введіть ім'я або назву організації"
              >
            </div>

            <div class="form-group">
              <label>Тип *</label>
              <select v-model="form.type" required class="form-control">
                <option value="">Оберіть тип</option>
                <option value="volunteer">Індивідуальний волонтер</option>
                <option value="fund">Благодійний фонд</option>
                <option value="rehabilitation">Центр реабілітації</option>
                <option value="church">Церква</option>
              </select>
            </div>

            <div class="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                v-model="form.email" 
                required 
                class="form-control"
                placeholder="example@email.com"
              >
            </div>

            <div class="form-group">
              <label>Телефон *</label>
              <input 
                type="tel" 
                v-model="form.phone" 
                required 
                class="form-control"
                placeholder="+38 (0XX) XXX-XX-XX"
              >
            </div>

            <div class="form-group">
              <label>Організація *</label>
              <input 
                type="text" 
                v-model="form.organization" 
                required 
                class="form-control"
                placeholder="Назва організації"
              >
            </div>

            <div class="form-group">
              <label>Місцерозташування *</label>
              <input 
                type="text" 
                v-model="form.location" 
                required 
                class="form-control"
                placeholder="Місто, область"
              >
            </div>

            <div class="form-group full-width">
              <label>Опис діяльності *</label>
              <textarea 
                v-model="form.description" 
                required 
                class="form-control"
                rows="4"
                placeholder="Детальний опис діяльності та напрямків роботи"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Веб-сайт</label>
              <input 
                type="url" 
                v-model="form.website" 
                class="form-control"
                placeholder="https://example.com"
              >
            </div>

            <div class="form-group">
              <label>Досвід (років)</label>
              <input 
                type="number" 
                v-model="form.experience" 
                class="form-control"
                min="0"
                max="50"
                placeholder="Кількість років досвіду"
              >
              <small class="form-hint">Кількість років досвіду в волонтерській діяльності</small>
            </div>

            <div class="form-group">
              <label>Рейтинг</label>
              <select v-model="form.rating" class="form-control">
                <option value="">Оберіть рейтинг</option>
                <option value="1">⭐ 1 зірка</option>
                <option value="2">⭐⭐ 2 зірки</option>
                <option value="3">⭐⭐⭐ 3 зірки</option>
                <option value="4">⭐⭐⭐⭐ 4 зірки</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 зірок</option>
              </select>
              <small class="form-hint">Оцінка якості роботи волонтера/організації</small>
            </div>

            <div class="form-group full-width">
              <label>Спеціалізації</label>
              <input 
                type="text" 
                v-model="form.specializationsText" 
                class="form-control"
                placeholder="Введіть спеціалізації через кому (напр.: медична допомога, психологічна підтримка)"
              >
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.verified">
                <span class="checkmark"></span>
                Верифіковано
              </label>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModals">
              Скасувати
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <i v-if="submitting" class="pi pi-spin pi-spinner mr-2"></i>
              {{ showEditModal ? 'Зберегти зміни' : 'Додати волонтера' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVolunteersStore } from '@/stores/volunteers'
import { useToast } from 'primevue/usetoast'

// Stores
const volunteersStore = useVolunteersStore()
const toast = useToast()

// Reactive data
const loading = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const submitting = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')

// Form data
const form = ref({
  name: '',
  email: '',
  phone: '',
  organization: '',
  type: '',
  description: '',
  location: '',
  website: '',
  experience: null,
  rating: null,
  specializationsText: '',
  verified: false
})

const editingId = ref(null)

// Computed
const volunteers = computed(() => volunteersStore.volunteers || [])
const totalVolunteers = computed(() => volunteers.value.length)
const verifiedVolunteers = computed(() => volunteers.value.filter(v => v.verified).length)
const pendingVolunteers = computed(() => volunteers.value.filter(v => !v.verified).length)
const averageRating = computed(() => {
  const volunteersWithRating = volunteers.value.filter(v => v.rating && v.rating > 0)
  if (volunteersWithRating.length === 0) return '—'
  const sum = volunteersWithRating.reduce((acc, v) => acc + v.rating, 0)
  return (sum / volunteersWithRating.length).toFixed(1)
})

const filteredVolunteers = computed(() => {
  return volunteers.value.filter(volunteer => {
    const matchesSearch = !searchQuery.value || 
      volunteer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      volunteer.organization.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesType = !selectedType.value || volunteer.type === selectedType.value
    const matchesStatus = !selectedStatus.value || 
      (selectedStatus.value === 'verified' && volunteer.verified) ||
      (selectedStatus.value === 'pending' && !volunteer.verified)

    return matchesSearch && matchesType && matchesStatus
  })
})

// Methods
const getTypeIcon = (type) => {
  const icons = {
    volunteer: 'pi pi-user',
    fund: 'pi pi-building',
    rehabilitation: 'pi pi-heart',
    church: 'pi pi-home'
  }
  return icons[type] || 'pi pi-user'
}

const getTypeLabel = (type) => {
  const labels = {
    volunteer: 'Волонтер',
    fund: 'Фонд',
    rehabilitation: 'Реабілітація',
    church: 'Церква'
  }
  return labels[type] || 'Невідомо'
}

const getTypeBadgeClass = (type) => {
  const classes = {
    volunteer: 'badge-primary',
    fund: 'badge-warning',
    rehabilitation: 'badge-info',
    church: 'badge-secondary'
  }
  return classes[type] || 'badge-primary'
}

const editVolunteer = (volunteer) => {
  form.value = {
    name: volunteer.name,
    email: volunteer.email,
    phone: volunteer.phone,
    organization: volunteer.organization,
    type: volunteer.type,
    description: volunteer.description,
    location: volunteer.location,
    website: volunteer.website || '',
    experience: volunteer.experience || null,
    rating: volunteer.rating || null,
    specializationsText: volunteer.specializations ? volunteer.specializations.join(', ') : '',
    verified: volunteer.verified
  }
  editingId.value = volunteer.id
  showEditModal.value = true
}

const verifyVolunteer = async (id) => {
  if (confirm('Верифікувати цього волонтера?')) {
    try {
      const result = await volunteersStore.verifyVolunteer(id)
      if (result.success) {
        toast.add({
          severity: 'success',
          summary: 'Успіх',
          detail: 'Волонтер успішно верифікований',
          life: 3000
        })
        // Оновлюємо дані після верифікації
        await volunteersStore.fetchVolunteers()
      } else {
        throw new Error('Помилка верифікації')
      }
    } catch (error) {
      console.error('Помилка верифікації волонтера:', error)
      toast.add({
        severity: 'error',
        summary: 'Помилка',
        detail: 'Не вдалося верифікувати волонтера',
        life: 3000
      })
    }
  }
}

const deleteVolunteer = async (id) => {
  if (confirm('Ви впевнені, що хочете видалити цього волонтера?')) {
    try {
      const result = await volunteersStore.deleteVolunteer(id)
      if (result.success) {
        toast.add({
          severity: 'success',
          summary: 'Успіх',
          detail: 'Волонтер успішно видалений',
          life: 3000
        })
        // Оновлюємо дані після видалення
        await volunteersStore.fetchVolunteers()
      } else {
        throw new Error('Помилка видалення')
      }
    } catch (error) {
      console.error('Помилка видалення волонтера:', error)
      toast.add({
        severity: 'error',
        summary: 'Помилка',
        detail: 'Не вдалося видалити волонтера',
        life: 3000
      })
    }
  }
}

const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    organization: '',
    type: '',
    description: '',
    location: '',
    website: '',
    experience: null,
    rating: null,
    specializationsText: '',
    verified: false
  }
  editingId.value = null
}

const refreshData = async () => {
  loading.value = true
  try {
    await volunteersStore.fetchVolunteers()
    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Дані успішно оновлено!',
      life: 2000
    })
  } catch (error) {
    console.error('Помилка оновлення даних:', error)
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося оновити дані з Firebase.',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  submitting.value = true
  
  try {
    const volunteerData = {
      ...form.value,
      specializations: form.value.specializationsText
        ? form.value.specializationsText.split(',').map(s => s.trim()).filter(s => s)
        : []
    }
    
    delete volunteerData.specializationsText

    if (showEditModal.value && editingId.value) {
      // Логіка оновлення
      const result = await volunteersStore.updateVolunteer(editingId.value, volunteerData)
      
      if (result.success) {
        toast.add({
          severity: 'success',
          summary: 'Успіх',
          detail: 'Дані волонтера успішно оновлено',
          life: 3000
        })
        // Оновлюємо дані після редагування
        await volunteersStore.fetchVolunteers()
      } else {
        throw new Error('Помилка при оновленні')
      }
    } else {
      // Додавання нового волонтера
      const result = await volunteersStore.addVolunteer(volunteerData)
      
      if (result.success) {
        toast.add({
          severity: 'success',
          summary: 'Успіх',
          detail: 'Волонтер успішно доданий до бази даних',
          life: 3000
        })
        // Оновлюємо дані після додавання
        await volunteersStore.fetchVolunteers()
      } else {
        throw new Error('Помилка при додаванні: ' + result.error)
      }
    }
    
    closeModals()
  } catch (error) {
    console.error('Помилка в submitForm:', error)
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: `Сталася помилка: ${error.message}`,
      life: 5000
    })
  }
  
  submitting.value = false
}

onMounted(async () => {
  // Завантажуємо волонтерів з Firebase
  loading.value = true
  try {
    await volunteersStore.fetchVolunteers()
    console.log('Волонтери завантажені з Firebase:', volunteersStore.volunteers.length)
  } catch (error) {
    console.error('Помилка завантаження волонтерів з Firebase:', error)
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося завантажити дані з Firebase.',
      life: 5000
    })
  } finally {
    loading.value = false
  }
});
</script>

<style scoped>
.component-content {
  padding: 0;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-section h2 {
  margin: 0;
  color: #212529;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.bg-blue-500 { background-color: #3b82f6; }
.bg-green-500 { background-color: #10b981; }
.bg-yellow-500 { background-color: #f59e0b; }
.bg-orange-500 { background-color: #f97316; }

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #212529;
}

.stat-label {
  color: #6c757d;
  font-size: 0.9rem;
}

.filters-section {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.volunteers-list {
  display: grid;
  gap: 1rem;
}

.volunteer-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: all 0.2s;
}

.volunteer-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.volunteer-avatar {
  width: 60px;
  height: 60px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.volunteer-info {
  flex: 1;
}

.volunteer-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.volunteer-header h4 {
  margin: 0;
  color: #111827;
  font-size: 1.1rem;
}

.volunteer-badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-primary { background: #dbeafe; color: #1d4ed8; }
.badge-warning { background: #fef3c7; color: #d97706; }
.badge-info { background: #ddd6fe; color: #7c3aed; }
.badge-secondary { background: #f3f4f6; color: #6b7280; }
.badge-success { background: #d1fae5; color: #065f46; }

.volunteer-info p {
  margin: 0.25rem 0;
  color: #6b7280;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.volunteer-info p i {
  width: 16px;
}

.volunteer-description {
  margin: 0.75rem 0 !important;
  color: #374151 !important;
  line-height: 1.5;
}

.specializations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.volunteer-stats {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  font-size: 0.875rem;
}

.stat-item {
  display: flex;
  align-items: center;
  color: #374151;
  font-weight: 500;
}

.specialization-tag {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.more-tags {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.volunteer-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.empty-state, .loading-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.empty-state i, .loading-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
}

.close-btn:hover {
  background: #f3f4f6;
}

.modal-body {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-control {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-control:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
  font-style: italic;
}

.checkbox-label {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkmark {
  font-weight: normal;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

.btn-outline-primary {
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.btn-outline-primary:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
}

.btn-outline-danger {
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.btn-outline-danger:hover:not(:disabled) {
  background: #ef4444;
  color: white;
}

.btn-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mr-1 { margin-right: 0.25rem; }
.mr-2 { margin-right: 0.5rem; }
</style>