<template>
  <div class="component-content">
    <div class="header-section">
      <h2>Управління проєктами</h2>
      <button class="btn btn-primary" @click="showAddModal = true">
        <i class="pi pi-plus mr-2"></i>
        Додати проєкт
      </button>
    </div>

    <!-- Статистика -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue-500">
          <i class="pi pi-chart-bar"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ totalProjects }}</div>
          <div class="stat-label">Всього проєктів</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-green-500">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ activeProjects }}</div>
          <div class="stat-label">Активних</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-purple-500">
          <i class="pi pi-trophy"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ completedProjects }}</div>
          <div class="stat-label">Завершених</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-yellow-500">
          <i class="pi pi-money-bill"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ formatMoney(totalRaised) }}</div>
          <div class="stat-label">Зібрано коштів</div>
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
          placeholder="Пошук за назвою проєкту..."
          class="form-control"
        >
      </div>
      <div class="filter-group">
        <label>Статус:</label>
        <select v-model="selectedStatus" class="form-control">
          <option value="">Усі статуси</option>
          <option value="active">Активні</option>
          <option value="completed">Завершені</option>
          <option value="paused">Призупинені</option>
          <option value="cancelled">Скасовані</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Організація:</label>
        <select v-model="selectedOrganization" class="form-control">
          <option value="">Усі організації</option>
          <option v-for="org in organizations" :key="org.id" :value="org.id">
            {{ org.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Список проєктів -->
    <div class="projects-list" v-if="!loading">
      <div v-if="filteredProjects.length === 0" class="empty-state">
        <i class="pi pi-chart-bar"></i>
        <p>Проєктів не знайдено</p>
      </div>
      <div 
        v-for="project in filteredProjects" 
        :key="project.id"
        class="project-card"
      >
        <div class="project-image">
          <img v-if="project.photos && project.photos.length > 0" 
               :src="project.photos[0]" 
               :alt="project.title"
               @error="handleImageError"
          >
          <div v-else class="placeholder-image">
            <i class="pi pi-image"></i>
          </div>
          <div class="project-status">
            <span :class="['badge', getStatusBadgeClass(project.status)]">
              {{ getStatusLabel(project.status) }}
            </span>
          </div>
        </div>
        
        <div class="project-info">
          <div class="project-header">
            <h4>{{ project.title }}</h4>
            <div class="project-meta">
              <span class="organization-name">
                <i class="pi pi-building mr-1"></i>
                {{ getOrganizationName(project.organizationId) }}
              </span>
            </div>
          </div>
          
          <p class="project-description">{{ project.shortDescription }}</p>
          
          <!-- Прогрес бар -->
          <div v-if="project.targetAmount" class="project-progress">
            <div class="progress-info">
              <span>Зібрано: {{ formatMoney(project.raisedAmount || 0) }} / {{ formatMoney(project.targetAmount) }}</span>
              <span class="progress-percentage">{{ getProgressPercentage(project) }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: `${getProgressPercentage(project)}%` }"
              ></div>
            </div>
          </div>
          
          <!-- Додаткова інформація -->
          <div class="project-details">
            <div class="detail-item">
              <i class="pi pi-calendar mr-1"></i>
              <span>{{ formatDate(project.startDate) }}</span>
            </div>
            <div class="detail-item">
              <i class="pi pi-users mr-1"></i>
              <span>{{ project.beneficiaries }}+ людей</span>
            </div>
            <div v-if="project.tags && project.tags.length > 0" class="project-tags">
              <span 
                v-for="tag in project.tags.slice(0, 3)" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
              <span v-if="project.tags.length > 3" class="more-tags">
                +{{ project.tags.length - 3 }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="project-actions">
          <button class="btn btn-outline-primary btn-sm" @click="editProject(project)" title="Редагувати">
            <i class="pi pi-pencil"></i>
          </button>
          <button class="btn btn-outline-info btn-sm" @click="viewProject(project)" title="Переглянути">
            <i class="pi pi-eye"></i>
          </button>
          <button class="btn btn-outline-danger btn-sm" @click="deleteProject(project.id)" title="Видалити">
            <i class="pi pi-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Лоадінг -->
    <div v-else class="loading-state">
      <i class="pi pi-spin pi-spinner"></i>
      <p>Завантаження проєктів...</p>
    </div>

    <!-- Модальне вікно додавання/редагування -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content large-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ showEditModal ? 'Редагувати проєкт' : 'Додати новий проєкт' }}</h3>
          <button class="close-btn" @click="closeModals">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="modal-body">
          <div class="form-grid">
            <div class="form-group">
              <label>Назва проєкту *</label>
              <input 
                type="text" 
                v-model="form.title" 
                required 
                class="form-control"
                placeholder="Введіть назву проєкту"
              >
            </div>

            <div class="form-group">
              <label>Організація *</label>
              <select v-model="form.organizationId" required class="form-control">
                <option value="">Оберіть організацію</option>
                <option v-for="org in organizations" :key="org.id" :value="org.id">
                  {{ org.name }}
                </option>
              </select>
            </div>

            <div class="form-group full-width">
              <label>Короткий опис *</label>
              <textarea 
                v-model="form.shortDescription" 
                required 
                class="form-control"
                rows="3"
                placeholder="Короткий опис проєкту (до 200 символів)"
                maxlength="200"
              ></textarea>
            </div>

            <div class="form-group full-width">
              <label>Повний опис</label>
              <textarea 
                v-model="form.fullDescription" 
                class="form-control"
                rows="5"
                placeholder="Детальний опис проєкту, цілей та очікуваних результатів"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Статус *</label>
              <select v-model="form.status" required class="form-control">
                <option value="">Оберіть статус</option>
                <option value="active">Активний</option>
                <option value="completed">Завершений</option>
                <option value="paused">Призупинений</option>
                <option value="cancelled">Скасований</option>
              </select>
            </div>

            <div class="form-group">
              <label>Кількість бенефіціарів *</label>
              <input 
                type="number" 
                v-model="form.beneficiaries" 
                required 
                class="form-control"
                min="1"
                placeholder="Кількість людей, яким допоможе проєкт"
              >
            </div>

            <div class="form-group">
              <label>Цільова сума (грн)</label>
              <input 
                type="number" 
                v-model="form.targetAmount" 
                class="form-control"
                min="0"
                step="100"
                placeholder="0"
              >
            </div>

            <div class="form-group">
              <label>Зібрана сума (грн)</label>
              <input 
                type="number" 
                v-model="form.raisedAmount" 
                class="form-control"
                min="0"
                step="100"
                placeholder="0"
              >
            </div>

            <div class="form-group">
              <label>Дата початку *</label>
              <input 
                type="date" 
                v-model="form.startDate" 
                required 
                class="form-control"
              >
            </div>

            <div class="form-group">
              <label>Дата завершення</label>
              <input 
                type="date" 
                v-model="form.endDate" 
                class="form-control"
              >
            </div>

            <div class="form-group full-width">
              <label>Теги</label>
              <input 
                type="text" 
                v-model="form.tagsText" 
                class="form-control"
                placeholder="Введіть теги через кому (напр.: допомога, медицина, діти)"
              >
            </div>

            <div class="form-group full-width">
              <label>URL фотографій</label>
              <textarea 
                v-model="form.photosText" 
                class="form-control"
                rows="3"
                placeholder="Введіть URL фотографій через новий рядок"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModals">
              Скасувати
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <i v-if="submitting" class="pi pi-spin pi-spinner mr-2"></i>
              {{ showEditModal ? 'Зберегти зміни' : 'Додати проєкт' }}
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
import { MOCK_VOLUNTEERS } from '@/constants/volunteers'

// Stores
const volunteersStore = useVolunteersStore()
const toast = useToast()

// Reactive data
const loading = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const submitting = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedOrganization = ref('')

// Mock проєкти
const mockProjects = ref([
  {
    id: '1',
    organizationId: '1',
    title: 'Допомога переселенцям з Донецької області',
    shortDescription: 'Збираємо кошти на першочергові потреби для родин переселенців: продукти харчування, медикаменти, засоби гігієни та тимчасове житло.',
    fullDescription: 'Детальний опис проєкту...',
    status: 'active',
    targetAmount: 500000,
    raisedAmount: 324000,
    startDate: new Date('2024-02-01'),
    beneficiaries: 150,
    tags: ['переселенці', 'гуманітарна допомога', 'продукти'],
    photos: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400'],
    createdAt: new Date('2024-02-01')
  },
  {
    id: '2',
    organizationId: '1',
    title: 'Шкільне приладдя для дітей',
    shortDescription: 'Забезпечуємо дітей з малозабезпечених родин необхідними шкільними приладдями, підручниками та канцелярським приладдям.',
    fullDescription: 'Детальний опис проєкту...',
    status: 'completed',
    targetAmount: 200000,
    raisedAmount: 200000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-01'),
    beneficiaries: 200,
    tags: ['діти', 'освіта', 'шкільне приладдя'],
    photos: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '3',
    organizationId: '2',
    title: 'Реабілітаційне обладнання для військових',
    shortDescription: 'Придбання сучасного реабілітаційного обладнання для відновлення військовослужбовців після поранень.',
    status: 'active',
    targetAmount: 800000,
    raisedAmount: 450000,
    startDate: new Date('2024-03-01'),
    beneficiaries: 100,
    tags: ['реабілітація', 'військові', 'обладнання'],
    photos: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'],
    createdAt: new Date('2024-03-01')
  }
])

// Form data
const form = ref({
  title: '',
  organizationId: '',
  shortDescription: '',
  fullDescription: '',
  status: '',
  targetAmount: null,
  raisedAmount: null,
  startDate: '',
  endDate: '',
  beneficiaries: null,
  tagsText: '',
  photosText: ''
})

const editingId = ref(null)

// Computed
const organizations = computed(() => {
  return MOCK_VOLUNTEERS.filter(v => v.type !== 'volunteer')
})

const totalProjects = computed(() => mockProjects.value.length)
const activeProjects = computed(() => mockProjects.value.filter(p => p.status === 'active').length)
const completedProjects = computed(() => mockProjects.value.filter(p => p.status === 'completed').length)
const totalRaised = computed(() => {
  return mockProjects.value.reduce((total, project) => total + (project.raisedAmount || 0), 0)
})

const filteredProjects = computed(() => {
  return mockProjects.value.filter(project => {
    const matchesSearch = !searchQuery.value || 
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = !selectedStatus.value || project.status === selectedStatus.value
    const matchesOrganization = !selectedOrganization.value || project.organizationId === selectedOrganization.value

    return matchesSearch && matchesStatus && matchesOrganization
  })
})

// Methods
const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'badge-success',
    completed: 'badge-info',
    paused: 'badge-warning',
    cancelled: 'badge-danger'
  }
  return classes[status] || 'badge-secondary'
}

const getStatusLabel = (status) => {
  const labels = {
    active: 'Активний',
    completed: 'Завершено',
    paused: 'Призупинено',
    cancelled: 'Скасовано'
  }
  return labels[status] || 'Невідомо'
}

const getOrganizationName = (organizationId) => {
  const org = organizations.value.find(o => o.id === organizationId)
  return org?.name || 'Невідома організація'
}

const getProgressPercentage = (project) => {
  if (!project.targetAmount || project.targetAmount === 0) return 0
  return Math.min(Math.round((project.raisedAmount || 0) / project.targetAmount * 100), 100)
}

const formatMoney = (amount) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.parentElement.querySelector('.placeholder-image').style.display = 'flex'
}

const editProject = (project) => {
  form.value = {
    title: project.title,
    organizationId: project.organizationId,
    shortDescription: project.shortDescription,
    fullDescription: project.fullDescription || '',
    status: project.status,
    targetAmount: project.targetAmount,
    raisedAmount: project.raisedAmount,
    startDate: project.startDate.toISOString().split('T')[0],
    endDate: project.endDate ? project.endDate.toISOString().split('T')[0] : '',
    beneficiaries: project.beneficiaries,
    tagsText: project.tags ? project.tags.join(', ') : '',
    photosText: project.photos ? project.photos.join('\n') : ''
  }
  editingId.value = project.id
  showEditModal.value = true
}

const viewProject = (project) => {
  toast.add({
    severity: 'info',
    summary: 'Інформація',
    detail: `Перегляд проєкту: ${project.title}`,
    life: 3000
  })
}

const deleteProject = async (id) => {
  if (confirm('Ви впевнені, що хочете видалити цей проєкт?')) {
    // В реальному додатку тут буде виклик API
    mockProjects.value = mockProjects.value.filter(p => p.id !== id)
    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Проєкт успішно видалений',
      life: 3000
    })
  }
}

const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    organizationId: '',
    shortDescription: '',
    fullDescription: '',
    status: '',
    targetAmount: null,
    raisedAmount: null,
    startDate: '',
    endDate: '',
    beneficiaries: null,
    tagsText: '',
    photosText: ''
  }
  editingId.value = null
}

const submitForm = async () => {
  submitting.value = true
  
  try {
    const projectData = {
      ...form.value,
      tags: form.value.tagsText
        ? form.value.tagsText.split(',').map(s => s.trim()).filter(s => s)
        : [],
      photos: form.value.photosText
        ? form.value.photosText.split('\n').map(s => s.trim()).filter(s => s)
        : [],
      startDate: new Date(form.value.startDate),
      endDate: form.value.endDate ? new Date(form.value.endDate) : null
    }
    
    delete projectData.tagsText
    delete projectData.photosText

    if (showEditModal.value) {
      // Оновлення існуючого проєкту
      const index = mockProjects.value.findIndex(p => p.id === editingId.value)
      if (index !== -1) {
        mockProjects.value[index] = { ...mockProjects.value[index], ...projectData }
      }
      
      toast.add({
        severity: 'success',
        summary: 'Успіх',
        detail: 'Проєкт успішно оновлено',
        life: 3000
      })
    } else {
      // Додавання нового проєкту
      const newProject = {
        id: Date.now().toString(),
        ...projectData,
        createdAt: new Date()
      }
      mockProjects.value.unshift(newProject)
      
      toast.add({
        severity: 'success',
        summary: 'Успіх',
        detail: 'Проєкт успішно додано',
        life: 3000
      })
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

onMounted(() => {
  // В реальному додатку тут буде завантаження проєктів з Firebase
})
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
.bg-purple-500 { background-color: #8b5cf6; }
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

.projects-list {
  display: grid;
  gap: 1.5rem;
}

.project-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  transition: all 0.2s;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.project-image {
  width: 200px;
  height: 150px;
  position: relative;
  flex-shrink: 0;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background: #f3f4f6;
  display: none;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 2rem;
}

.project-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.project-info {
  flex: 1;
  padding: 1.5rem;
}

.project-header {
  margin-bottom: 1rem;
}

.project-header h4 {
  margin: 0 0 0.5rem 0;
  color: #111827;
  font-size: 1.2rem;
  line-height: 1.3;
}

.organization-name {
  color: #6b7280;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.project-description {
  color: #374151;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
}

.progress-percentage {
  font-weight: 600;
  color: #059669;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.3s ease;
}

.project-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.detail-item {
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
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

.project-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  border-left: 1px solid #e5e7eb;
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

.large-modal {
  max-width: 900px;
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