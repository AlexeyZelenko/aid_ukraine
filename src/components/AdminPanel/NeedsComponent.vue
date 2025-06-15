<template>
  <div class="component-content">
    <div class="header-section">
      <h2>Управління потребами</h2>
      <button class="btn btn-primary" @click="showAddModal = true">
        <i class="pi pi-plus mr-2"></i>
        Додати потребу
      </button>
    </div>

    <!-- Статистика -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue-500">
          <i class="pi pi-heart"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalNeeds }}</div>
          <div class="stat-label">Всього потреб</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-red-500">
          <i class="pi pi-exclamation-triangle"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.urgentNeeds }}</div>
          <div class="stat-label">Терміново</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-yellow-500">
          <i class="pi pi-clock"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.inProgressNeeds }}</div>
          <div class="stat-label">В процесі</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-green-500">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.fulfilledNeeds }}</div>
          <div class="stat-label">Виконано</div>
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
          placeholder="Пошук за назвою або описом..."
          class="form-control"
        >
      </div>
      <div class="filter-group">
        <label>Категорія:</label>
        <select v-model="selectedCategory" class="form-control">
          <option value="">Усі категорії</option>
          <option v-for="category in categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label>Статус:</label>
        <select v-model="selectedStatus" class="form-control">
          <option value="">Усі статуси</option>
          <option value="open">Відкрито</option>
          <option value="in-progress">В процесі</option>
          <option value="fulfilled">Виконано</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Пріоритет:</label>
        <select v-model="selectedPriority" class="form-control">
          <option value="">Усі пріоритети</option>
          <option value="urgent">Терміново</option>
          <option value="high">Високий</option>
          <option value="medium">Середній</option>
          <option value="low">Низький</option>
        </select>
      </div>
    </div>

    <!-- Список потреб -->
    <div class="needs-list" v-if="!loading">
      <div v-if="filteredNeeds.length === 0" class="empty-state">
        <i class="pi pi-heart"></i>
        <p>Потреб не знайдено</p>
      </div>
      <div 
        v-for="need in filteredNeeds" 
        :key="need.id"
        class="need-card"
      >
        <div class="need-header">
          <div class="need-title-section">
            <h4>{{ need.title }}</h4>
            <div class="need-badges">
              <span :class="['badge', getPriorityBadgeClass(need.priority)]">
                {{ getPriorityLabel(need.priority) }}
              </span>
              <span :class="['badge', getStatusBadgeClass(need.status)]">
                {{ getStatusLabel(need.status) }}
              </span>
              <span v-if="need.verified" class="badge badge-success">
                <i class="pi pi-check mr-1"></i>
                Верифіковано
              </span>
            </div>
          </div>
          <div class="need-actions">
            <button class="btn btn-outline-primary btn-sm" @click="editNeed(need)" title="Редагувати">
              <i class="pi pi-pencil"></i>
            </button>
            <button 
              class="btn btn-sm" 
              :class="need.verified ? 'btn-outline-warning' : 'btn-outline-success'" 
              @click="toggleVerification(need.id!, !need.verified)" 
              :title="need.verified ? 'Скасувати верифікацію' : 'Верифікувати'"
            >
              <i :class="need.verified ? 'pi pi-times' : 'pi pi-check'"></i>
            </button>
            <button class="btn btn-outline-info btn-sm" @click="viewNeed(need)" title="Переглянути">
              <i class="pi pi-eye"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteNeedItem(need.id!)" title="Видалити">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
        
        <div class="need-info">
          <div class="need-category">
            <i :class="getCategoryIcon(need.category)" class="mr-2"></i>
            {{ getCategoryLabel(need.category) }}
          </div>
          <div class="need-location">
            <i class="pi pi-map-marker mr-2"></i>
            {{ need.location }}
          </div>
          <div class="need-contact">
            <i class="pi pi-user mr-2"></i>
            {{ need.contactPerson }} - {{ need.contactPhone }}
          </div>
        </div>
        
        <p class="need-description">{{ need.description }}</p>
        
        <div class="need-footer">
          <div class="need-quantity" v-if="need.quantity">
            <i class="pi pi-hashtag mr-1"></i>
            Кількість: {{ need.quantity }}
          </div>
          <div class="need-date">
            <i class="pi pi-calendar mr-1"></i>
            {{ formatDate(need.createdAt) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Лоадінг -->
    <div v-else class="loading-state">
      <i class="pi pi-spin pi-spinner"></i>
      <p>Завантаження потреб...</p>
    </div>

    <!-- Модальне вікно додавання/редагування -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content large-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ showEditModal ? 'Редагувати потребу' : 'Додати нову потребу' }}</h3>
          <button class="close-btn" @click="closeModals">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="modal-body">
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Назва потреби *</label>
              <input 
                type="text" 
                v-model="form.title" 
                required 
                class="form-control"
                placeholder="Коротко опишіть потребу"
              >
            </div>

            <div class="form-group">
              <label>Категорія *</label>
              <select v-model="form.category" required class="form-control">
                <option value="">Оберіть категорію</option>
                <option v-for="category in categories" :key="category.value" :value="category.value">
                  {{ category.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Пріоритет *</label>
              <select v-model="form.priority" required class="form-control">
                <option value="low">Низький</option>
                <option value="medium">Середній</option>
                <option value="high">Високий</option>
                <option value="urgent">Терміново</option>
              </select>
            </div>

            <div class="form-group full-width">
              <label>Опис *</label>
              <textarea 
                v-model="form.description" 
                required 
                class="form-control"
                rows="4"
                placeholder="Детальний опис потреби"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Місцезнаходження *</label>
              <input 
                type="text" 
                v-model="form.location" 
                required 
                class="form-control"
                placeholder="Місто, область"
              >
            </div>

            <div class="form-group">
              <label>Кількість</label>
              <input 
                type="number" 
                v-model.number="form.quantity" 
                class="form-control"
                min="1"
                placeholder="Кількість одиниць"
              >
            </div>

            <div class="form-group">
              <label>Контактна особа *</label>
              <input 
                type="text" 
                v-model="form.contactPerson" 
                required 
                class="form-control"
                placeholder="Ім'я та прізвище"
              >
            </div>

            <div class="form-group">
              <label>Телефон *</label>
              <input 
                type="tel" 
                v-model="form.contactPhone" 
                required 
                class="form-control"
                placeholder="+38 (0XX) XXX-XX-XX"
              >
            </div>

            <div class="form-group full-width">
              <label>Telegram *</label>
              <input 
                type="text" 
                v-model="form.contactTelegram" 
                required 
                class="form-control"
                placeholder="@username або username"
              >
            </div>

            <div v-if="showEditModal" class="form-group">
              <label>Статус</label>
              <select v-model="form.status" class="form-control">
                <option value="open">Відкрито</option>
                <option value="in-progress">В процесі</option>
                <option value="fulfilled">Виконано</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModals">
              Скасувати
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <i v-if="submitting" class="pi pi-spin pi-spinner mr-2"></i>
              {{ showEditModal ? 'Зберегти зміни' : 'Додати потребу' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Модальне вікно перегляду -->
    <div v-if="showViewModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ viewingNeed?.title }}</h3>
          <button class="close-btn" @click="closeModals">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <div class="modal-body" v-if="viewingNeed">
          <div class="view-section">
            <h4>Деталі потреби</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <strong>Категорія:</strong>
                <span>{{ getCategoryLabel(viewingNeed.category) }}</span>
              </div>
              <div class="detail-item">
                <strong>Пріоритет:</strong>
                <span :class="['badge', getPriorityBadgeClass(viewingNeed.priority)]">
                  {{ getPriorityLabel(viewingNeed.priority) }}
                </span>
              </div>
              <div class="detail-item">
                <strong>Статус:</strong>
                <span :class="['badge', getStatusBadgeClass(viewingNeed.status)]">
                  {{ getStatusLabel(viewingNeed.status) }}
                </span>
              </div>
              <div class="detail-item">
                <strong>Місцезнаходження:</strong>
                <span>{{ viewingNeed.location }}</span>
              </div>
              <div class="detail-item" v-if="viewingNeed.quantity">
                <strong>Кількість:</strong>
                <span>{{ viewingNeed.quantity }}</span>
              </div>
              <div class="detail-item">
                <strong>Верифіковано:</strong>
                <span :class="viewingNeed.verified ? 'text-green-600' : 'text-red-600'">
                  {{ viewingNeed.verified ? 'Так' : 'Ні' }}
                </span>
              </div>
            </div>
          </div>

          <div class="view-section">
            <h4>Опис</h4>
            <p>{{ viewingNeed.description }}</p>
          </div>

          <div class="view-section">
            <h4>Контактна інформація</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <strong>Контактна особа:</strong>
                <span>{{ viewingNeed.contactPerson }}</span>
              </div>
              <div class="detail-item">
                <strong>Телефон:</strong>
                <span>{{ viewingNeed.contactPhone }}</span>
              </div>
              <div class="detail-item">
                <strong>Telegram:</strong>
                <span>{{ viewingNeed.contactTelegram }}</span>
              </div>
            </div>
          </div>

          <div class="view-section">
            <h4>Додаткова інформація</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <strong>Створено:</strong>
                <span>{{ formatDate(viewingNeed.createdAt) }}</span>
              </div>
              <div class="detail-item" v-if="viewingNeed.updatedAt">
                <strong>Оновлено:</strong>
                <span>{{ formatDate(viewingNeed.updatedAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNeedsStore, type Need } from '@/stores/needs'
import { useToast } from 'primevue/usetoast'

// Stores
const needsStore = useNeedsStore()
const toast = useToast()

// Debug: перевірка методів store
console.log('NeedsStore methods:', Object.keys(needsStore))
console.log('getStats method:', needsStore.getStats)
console.log('typeof getStats:', typeof needsStore.getStats)

// Reactive data
const loading = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const submitting = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedPriority = ref('')
const viewingNeed = ref<Need | null>(null)

// Категорії
const categories = [
  { value: 'medical', label: 'Медична допомога' },
  { value: 'housing', label: 'Житло' },
  { value: 'food', label: 'Продукти харчування' },
  { value: 'clothing', label: 'Одяг' },
  { value: 'transportation', label: 'Транспорт' },
  { value: 'legal', label: 'Юридична допомога' },
  { value: 'psychological', label: 'Психологічна допомога' },
  { value: 'education', label: 'Освіта' },
  { value: 'other', label: 'Інше' }
]

// Form data
const form = ref({
  title: '',
  description: '',
  category: '',
  priority: 'medium' as Need['priority'],
  location: '',
  contactPerson: '',
  contactPhone: '',
  contactTelegram: '',
  quantity: undefined as number | undefined,
  status: 'open' as Need['status']
})

const editingId = ref<string | null>(null)

// Computed
const stats = computed(() => {
  try {
    if (typeof needsStore.getStats === 'function') {
      return needsStore.getStats()
    } else {
      // Fallback: обчислюємо статистику прямо тут
      console.warn('getStats method not available on needsStore, using fallback')
      const needs = needsStore.needs || []
      return {
        totalNeeds: needs.length,
        openNeeds: needs.filter(need => need.status === 'open').length,
        inProgressNeeds: needs.filter(need => need.status === 'in-progress').length,
        fulfilledNeeds: needs.filter(need => need.status === 'fulfilled').length,
        urgentNeeds: needs.filter(need => need.priority === 'urgent').length,
        verifiedNeeds: needs.filter(need => need.verified).length
      }
    }
  } catch (error) {
    console.error('Error getting stats:', error)
    return {
      totalNeeds: 0,
      openNeeds: 0,
      inProgressNeeds: 0,
      fulfilledNeeds: 0,
      urgentNeeds: 0,
      verifiedNeeds: 0
    }
  }
})

const filteredNeeds = computed(() => {
  return needsStore.needs.filter(need => {
    const matchesSearch = !searchQuery.value || 
      need.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      need.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      need.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      need.contactPerson.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = !selectedCategory.value || need.category === selectedCategory.value
    const matchesStatus = !selectedStatus.value || need.status === selectedStatus.value
    const matchesPriority = !selectedPriority.value || need.priority === selectedPriority.value

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })
})

// Methods
const getPriorityBadgeClass = (priority: string) => {
  const classes = {
    urgent: 'badge-danger',
    high: 'badge-warning',
    medium: 'badge-info',
    low: 'badge-success'
  }
  return classes[priority as keyof typeof classes] || 'badge-secondary'
}

const getPriorityLabel = (priority: string) => {
  const labels = {
    urgent: 'Терміново',
    high: 'Високий',
    medium: 'Середній',
    low: 'Низький'
  }
  return labels[priority as keyof typeof labels] || priority
}

const getStatusBadgeClass = (status: string) => {
  const classes = {
    open: 'badge-info',
    'in-progress': 'badge-warning',
    fulfilled: 'badge-success'
  }
  return classes[status as keyof typeof classes] || 'badge-secondary'
}

const getStatusLabel = (status: string) => {
  const labels = {
    open: 'Відкрито',
    'in-progress': 'В процесі',
    fulfilled: 'Виконано'
  }
  return labels[status as keyof typeof labels] || status
}

const getCategoryLabel = (category: string) => {
  const categoryObj = categories.find(c => c.value === category)
  return categoryObj?.label || category
}

const getCategoryIcon = (category: string) => {
  const icons = {
    medical: 'pi pi-plus',
    housing: 'pi pi-home',
    food: 'pi pi-shopping-cart',
    clothing: 'pi pi-user',
    transportation: 'pi pi-car',
    legal: 'pi pi-briefcase',
    psychological: 'pi pi-heart',
    education: 'pi pi-book',
    other: 'pi pi-question-circle'
  }
  return icons[category as keyof typeof icons] || 'pi pi-circle'
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

const editNeed = (need: Need) => {
  form.value = {
    title: need.title,
    description: need.description,
    category: need.category,
    priority: need.priority,
    location: need.location,
    contactPerson: need.contactPerson,
    contactPhone: need.contactPhone,
    contactTelegram: need.contactTelegram,
    quantity: need.quantity,
    status: need.status
  }
  editingId.value = need.id!
  showEditModal.value = true
}

const viewNeed = (need: Need) => {
  viewingNeed.value = need
  showViewModal.value = true
}

const deleteNeedItem = async (id: string) => {
  if (confirm('Ви впевнені, що хочете видалити цю потребу?')) {
    const result = await needsStore.deleteNeed(id)
    if (result.success) {
      await needsStore.fetchNeeds()
      toast.add({
        severity: 'success',
        summary: 'Успіх',
        detail: 'Потребу успішно видалено',
        life: 3000
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Помилка',
        detail: 'Помилка при видаленні потреби',
        life: 3000
      })
    }
  }
}

const toggleVerification = async (id: string, verified: boolean) => {
  const result = await needsStore.verifyNeed(id, verified)
  if (result.success) {
    await needsStore.fetchNeeds()
    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: verified ? 'Потребу верифіковано' : 'Верифікацію скасовано',
      life: 3000
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Помилка при зміні статусу верифікації',
      life: 3000
    })
  }
}

const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  viewingNeed.value = null
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    location: '',
    contactPerson: '',
    contactPhone: '',
    contactTelegram: '',
    quantity: undefined,
    status: 'open'
  }
  editingId.value = null
}

const submitForm = async () => {
  submitting.value = true
  
  try {
    const needData = {
      ...form.value,
      createdBy: 'admin' // В реальному додатку тут буде ID адміністратора
    }

    if (showEditModal.value && editingId.value) {
      // Оновлення існуючої потреби
      const result = await needsStore.updateNeed(editingId.value, needData)
      
      if (result.success) {
        await needsStore.fetchNeeds()
        toast.add({
          severity: 'success',
          summary: 'Успіх',
          detail: 'Потребу успішно оновлено',
          life: 3000
        })
      } else {
        throw new Error('Помилка оновлення')
      }
    } else {
      // Додавання нової потреби
      const result = await needsStore.addNeed(needData)
      
      if (result.success) {
        await needsStore.fetchNeeds()
        toast.add({
          severity: 'success',
          summary: 'Успіх',
          detail: 'Потребу успішно додано',
          life: 3000
        })
      } else {
        throw new Error('Помилка додавання')
      }
    }
    
    closeModals()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Сталася помилка. Спробуйте пізніше.',
      life: 3000
    })
  }
  
  submitting.value = false
}

onMounted(async () => {
  loading.value = true
  await needsStore.fetchNeeds()
  loading.value = false
})
</script>

<style scoped>
/* Компонент контент */
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

/* Статистика */
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
.bg-red-500 { background-color: #ef4444; }
.bg-yellow-500 { background-color: #f59e0b; }

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #212529;
}

.stat-label {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Фільтри */
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

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
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

/* Список потреб */
.needs-list {
  display: grid;
  gap: 1rem;
}

.need-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
}

.need-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.need-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.need-title-section h4 {
  margin: 0 0 0.5rem 0;
  color: #212529;
  font-size: 1.1rem;
}

.need-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.need-actions {
  display: flex;
  gap: 0.5rem;
}

.need-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6c757d;
}

.need-description {
  color: #495057;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.need-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #6c757d;
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}

/* Badges */
.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success { background: #d1fae5; color: #065f46; }
.badge-info { background: #ddd6fe; color: #7c3aed; }
.badge-warning { background: #fef3c7; color: #d97706; }
.badge-danger { background: #fee2e2; color: #dc2626; }
.badge-secondary { background: #f3f4f6; color: #6b7280; }

/* Empty/Loading states */
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.large-modal {
  max-width: 800px;
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

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
}

/* View modal specific styles */
.view-section {
  margin-bottom: 2rem;
}

.view-section h4 {
  margin-bottom: 1rem;
  color: #111827;
  font-size: 1.1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item strong {
  color: #374151;
  font-size: 0.9rem;
}

.detail-item span {
  color: #6b7280;
}

.text-green-600 { color: #16a34a; }
.text-red-600 { color: #dc2626; }

/* Button styles */
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

.btn-secondary:hover {
  background: #4b5563;
}

.btn-outline-primary {
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.btn-outline-primary:hover {
  background: #3b82f6;
  color: white;
}

.btn-outline-success {
  background: transparent;
  color: #10b981;
  border: 1px solid #10b981;
}

.btn-outline-success:hover {
  background: #10b981;
  color: white;
}

.btn-outline-warning {
  background: transparent;
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.btn-outline-warning:hover {
  background: #f59e0b;
  color: white;
}

.btn-outline-info {
  background: transparent;
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
}

.btn-outline-info:hover {
  background: #8b5cf6;
  color: white;
}

.btn-outline-danger {
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.btn-outline-danger:hover {
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