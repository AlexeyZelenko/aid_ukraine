<template>
  <div class="component-content">
    <div class="header-section">
      <h2>Управління організаціями</h2>
      <button class="btn btn-primary" @click="showAddModal = true">
        <i class="pi pi-plus mr-2"></i>
        Додати організацію
      </button>
    </div>

    <!-- Статистика -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue-500">
          <i class="pi pi-building"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ totalOrganizations }}</div>
          <div class="stat-label">Всього організацій</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-green-500">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ verifiedOrganizations }}</div>
          <div class="stat-label">Верифіковано</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-yellow-500">
          <i class="pi pi-clock"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ pendingOrganizations }}</div>
          <div class="stat-label">Очікують верифікації</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-purple-500">
          <i class="pi pi-chart-bar"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ activeProjects }}</div>
          <div class="stat-label">Активних проєктів</div>
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
          placeholder="Пошук за назвою, типом..."
          class="form-control"
        >
      </div>
      <div class="filter-group">
        <label>Тип організації:</label>
        <select v-model="selectedType" class="form-control">
          <option value="">Усі типи</option>
          <option value="fund">Благодійний фонд</option>
          <option value="rehabilitation">Центр реабілітації</option>
          <option value="church">Церква</option>
          <option value="ngo">Громадська організація</option>
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

    <!-- Список організацій -->
    <div class="organizations-list" v-if="!loading">
      <div v-if="filteredOrganizations.length === 0" class="empty-state">
        <i class="pi pi-building"></i>
        <p>Організацій не знайдено</p>
      </div>
      <div 
        v-for="organization in filteredOrganizations" 
        :key="organization.id"
        class="organization-card"
      >
        <div class="organization-avatar">
          <i :class="getTypeIcon(organization.type)"></i>
        </div>
        <div class="organization-info">
          <div class="organization-header">
            <h4>{{ organization.name }}</h4>
            <div class="organization-badges">
              <span :class="['badge', getTypeBadgeClass(organization.type)]">
                {{ getTypeLabel(organization.type) }}
              </span>
              <span v-if="organization.verified" class="badge badge-success">
                <i class="pi pi-check mr-1"></i>Верифіковано
              </span>
              <span v-else class="badge badge-warning">
                <i class="pi pi-clock mr-1"></i>Очікує
              </span>
            </div>
          </div>
          <p><i class="pi pi-map-marker mr-2"></i>{{ organization.location }}</p>
          <p><i class="pi pi-envelope mr-2"></i>{{ organization.email }}</p>
          <p><i class="pi pi-phone mr-2"></i>{{ organization.phone }}</p>
          <p v-if="organization.website" class="organization-website">
            <i class="pi pi-globe mr-2"></i>
            <a :href="organization.website" target="_blank" rel="noopener noreferrer">
              {{ organization.website }}
            </a>
          </p>
          <p class="organization-description">{{ organization.description }}</p>
          <div v-if="organization.rating" class="organization-rating">
            <span class="rating-stars">
              <i v-for="star in 5" :key="star" 
                 :class="star <= organization.rating ? 'pi pi-star-fill' : 'pi pi-star'"
                 class="star"></i>
            </span>
            <span class="rating-text">{{ organization.rating }}/5</span>
          </div>
          <div v-if="organization.specializations" class="specializations">
            <span 
              v-for="spec in organization.specializations.slice(0, 3)" 
              :key="spec"
              class="specialization-tag"
            >
              {{ spec }}
            </span>
            <span v-if="organization.specializations.length > 3" class="more-tags">
              +{{ organization.specializations.length - 3 }}
            </span>
          </div>
        </div>
        <div class="organization-actions">
          <button class="btn btn-outline-info btn-sm" @click="viewProjects(organization)" title="Переглянути проєкти">
            <i class="pi pi-chart-bar"></i>
          </button>
          <button class="btn btn-outline-primary btn-sm" @click="editOrganization(organization)" title="Редагувати">
            <i class="pi pi-pencil"></i>
          </button>
          <button 
            v-if="!organization.verified" 
            class="btn btn-success btn-sm" 
            @click="verifyOrganization(organization.id)"
            title="Верифікувати"
          >
            <i class="pi pi-check"></i>
          </button>
          <button class="btn btn-outline-danger btn-sm" @click="deleteOrganization(organization.id)" title="Видалити">
            <i class="pi pi-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Лоадінг -->
    <div v-else class="loading-state">
      <i class="pi pi-spin pi-spinner"></i>
      <p>Завантаження організацій...</p>
    </div>

    <!-- Модальне вікно додавання/редагування -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ showEditModal ? 'Редагувати організацію' : 'Додати нову організацію' }}</h3>
          <button class="close-btn" @click="closeModals">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="modal-body">
          <div class="form-grid">
            <div class="form-group">
              <label>Назва організації *</label>
              <input 
                type="text" 
                v-model="form.name" 
                required 
                class="form-control"
                placeholder="Введіть назву організації"
              >
            </div>

            <div class="form-group">
              <label>Тип організації *</label>
              <select v-model="form.type" required class="form-control">
                <option value="">Оберіть тип</option>
                <option value="fund">Благодійний фонд</option>
                <option value="rehabilitation">Центр реабілітації</option>
                <option value="church">Церква</option>
                <option value="ngo">Громадська організація</option>
              </select>
            </div>

            <div class="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                v-model="form.email" 
                required 
                class="form-control"
                placeholder="organization@email.com"
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
              <label>Місцерозташування *</label>
              <input 
                type="text" 
                v-model="form.location" 
                required 
                class="form-control"
                placeholder="Місто, область"
              >
            </div>

            <div class="form-group">
              <label>Веб-сайт</label>
              <input 
                type="url" 
                v-model="form.website" 
                class="form-control"
                placeholder="https://organization.com"
              >
            </div>

            <div class="form-group full-width">
              <label>Опис діяльності *</label>
              <textarea 
                v-model="form.description" 
                required 
                class="form-control"
                rows="4"
                placeholder="Детальний опис діяльності організації та її цілей"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Досвід роботи (років)</label>
              <input 
                type="number" 
                v-model="form.experience" 
                class="form-control"
                min="0"
                max="100"
              >
            </div>

            <div class="form-group">
              <label>Рейтинг (1-5)</label>
              <select v-model="form.rating" class="form-control">
                <option value="">Без рейтингу</option>
                <option value="1">1 зірка</option>
                <option value="2">2 зірки</option>
                <option value="3">3 зірки</option>
                <option value="4">4 зірки</option>
                <option value="5">5 зірок</option>
              </select>
            </div>

            <div class="form-group full-width">
              <label>Спеціалізації</label>
              <input 
                type="text" 
                v-model="form.specializationsText" 
                class="form-control"
                placeholder="Введіть спеціалізації через кому (напр.: гуманітарна допомога, медична підтримка)"
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
              {{ showEditModal ? 'Зберегти зміни' : 'Додати організацію' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Модальне вікно проектів -->
    <div v-if="showProjectsModal" class="modal-overlay" @click="closeProjectsModal">
      <div class="modal-content projects-modal" @click.stop>
        <div class="modal-header">
          <h3>Проєкти організації: {{ selectedOrganization?.name }}</h3>
          <button class="close-btn" @click="closeProjectsModal">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div v-if="organizationProjects.length === 0" class="empty-state">
            <i class="pi pi-chart-bar"></i>
            <p>У цієї організації поки немає проєктів</p>
          </div>
          <div v-else class="projects-grid">
            <div 
              v-for="project in organizationProjects" 
              :key="project.id"
              class="project-card"
            >
              <div class="project-header">
                <h5>{{ project.title }}</h5>
                <span :class="['badge', getProjectStatusClass(project.status)]">
                  {{ getProjectStatusLabel(project.status) }}
                </span>
              </div>
              <p class="project-description">{{ project.shortDescription }}</p>
              <div v-if="project.targetAmount" class="project-progress">
                <div class="progress-info">
                  <span>Зібрано: {{ formatMoney(project.raisedAmount) }} / {{ formatMoney(project.targetAmount) }}</span>
                  <span>{{ Math.round((project.raisedAmount / project.targetAmount) * 100) }}%</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill"
                    :style="{ width: `${Math.min((project.raisedAmount / project.targetAmount) * 100, 100)}%` }"
                  ></div>
                </div>
              </div>
              <div class="project-meta">
                <span><i class="pi pi-calendar mr-1"></i>{{ formatDate(project.startDate) }}</span>
                <span><i class="pi pi-users mr-1"></i>{{ project.beneficiaries }}+ людей</span>
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
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { MOCK_VOLUNTEERS } from '@/constants/volunteers'

// Stores
const toast = useToast()
const router = useRouter()

// Reactive data
const loading = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showProjectsModal = ref(false)
const submitting = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const selectedOrganization = ref(null)

// Form data
const form = ref({
  name: '',
  email: '',
  phone: '',
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

// Mock проєкти (в реальному додатку це буде з Firebase)
const mockProjects = [
  {
    id: '1',
    organizationId: '1',
    title: 'Допомога переселенцям з Донецької області',
    shortDescription: 'Збираємо кошти на першочергові потреби для родин переселенців.',
    status: 'active',
    targetAmount: 500000,
    raisedAmount: 324000,
    startDate: new Date('2024-02-01'),
    beneficiaries: 150
  },
  {
    id: '2',
    organizationId: '1',
    title: 'Шкільне приладдя для дітей',
    shortDescription: 'Забезпечуємо дітей з малозабезпечених родин необхідними шкільними приладдями.',
    status: 'completed',
    targetAmount: 200000,
    raisedAmount: 200000,
    startDate: new Date('2024-01-15'),
    beneficiaries: 200
  }
]

// Computed
const allOrganizations = computed(() => {
  // Фільтруємо тільки організації (не індивідуальних волонтерів)
  return MOCK_VOLUNTEERS.filter(v => v.type !== 'volunteer')
})

const totalOrganizations = computed(() => allOrganizations.value.length)
const verifiedOrganizations = computed(() => allOrganizations.value.filter(o => o.verified).length)
const pendingOrganizations = computed(() => allOrganizations.value.filter(o => !o.verified).length)
const activeProjects = computed(() => mockProjects.filter(p => p.status === 'active').length)

const filteredOrganizations = computed(() => {
  return allOrganizations.value.filter(organization => {
    const matchesSearch = !searchQuery.value || 
      organization.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      organization.organization.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      organization.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesType = !selectedType.value || organization.type === selectedType.value
    const matchesStatus = !selectedStatus.value || 
      (selectedStatus.value === 'verified' && organization.verified) ||
      (selectedStatus.value === 'pending' && !organization.verified)

    return matchesSearch && matchesType && matchesStatus
  })
})

const organizationProjects = computed(() => {
  if (!selectedOrganization.value) return []
  return mockProjects.filter(p => p.organizationId === selectedOrganization.value.id)
})

// Methods
const getTypeIcon = (type) => {
  const icons = {
    fund: 'pi pi-building',
    rehabilitation: 'pi pi-heart',
    church: 'pi pi-home',
    ngo: 'pi pi-users'
  }
  return icons[type] || 'pi pi-building'
}

const getTypeLabel = (type) => {
  const labels = {
    fund: 'Фонд',
    rehabilitation: 'Реабілітація',
    church: 'Церква',
    ngo: 'НГО'
  }
  return labels[type] || 'Організація'
}

const getTypeBadgeClass = (type) => {
  const classes = {
    fund: 'badge-warning',
    rehabilitation: 'badge-info',
    church: 'badge-secondary',
    ngo: 'badge-primary'
  }
  return classes[type] || 'badge-primary'
}

const getProjectStatusClass = (status) => {
  const classes = {
    active: 'badge-success',
    completed: 'badge-info',
    paused: 'badge-warning',
    cancelled: 'badge-danger'
  }
  return classes[status] || 'badge-secondary'
}

const getProjectStatusLabel = (status) => {
  const labels = {
    active: 'Активний',
    completed: 'Завершено',
    paused: 'Призупинено',
    cancelled: 'Скасовано'
  }
  return labels[status] || 'Невідомо'
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

const viewProjects = (organization) => {
  selectedOrganization.value = organization
  showProjectsModal.value = true
}

const editOrganization = (organization) => {
  form.value = {
    name: organization.name,
    email: organization.email,
    phone: organization.phone,
    type: organization.type,
    description: organization.description,
    location: organization.location,
    website: organization.website || '',
    experience: organization.experience || null,
    rating: organization.rating || null,
    specializationsText: organization.specializations ? organization.specializations.join(', ') : '',
    verified: organization.verified
  }
  editingId.value = organization.id
  showEditModal.value = true
}

const verifyOrganization = async (id) => {
  if (confirm('Верифікувати цю організацію?')) {
    // Тут буде логіка верифікації в Firebase
    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Організацію успішно верифіковано',
      life: 3000
    })
  }
}

const deleteOrganization = async (id) => {
  if (confirm('Ви впевнені, що хочете видалити цю організацію? Це також видалить усі її проєкти.')) {
    // Тут буде логіка видалення з Firebase
    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Організацію успішно видалено',
      life: 3000
    })
  }
}

const closeModals = () => {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

const closeProjectsModal = () => {
  showProjectsModal.value = false
  selectedOrganization.value = null
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
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

const submitForm = async () => {
  submitting.value = true
  
  try {
    const organizationData = {
      ...form.value,
      organization: form.value.name, // Додаємо поле organization для сумісності
      specializations: form.value.specializationsText
        ? form.value.specializationsText.split(',').map(s => s.trim()).filter(s => s)
        : []
    }
    
    delete organizationData.specializationsText

    if (showEditModal.value) {
      // Логіка оновлення
      toast.add({
        severity: 'success',
        summary: 'Успіх',
        detail: 'Дані організації успішно оновлено',
        life: 3000
      })
    } else {
      // Додавання нової організації (використовуємо той самий store для волонтерів)
      // В реальному додатку можна створити окремий store для організацій
      toast.add({
        severity: 'success',
        summary: 'Успіх',
        detail: 'Організацію успішно додано до бази даних',
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
  // В реальному додатку тут буде завантаження з Firebase
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
.bg-yellow-500 { background-color: #f59e0b; }
.bg-purple-500 { background-color: #8b5cf6; }

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

.organizations-list {
  display: grid;
  gap: 1rem;
}

.organization-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: all 0.2s;
}

.organization-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.organization-avatar {
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

.organization-info {
  flex: 1;
}

.organization-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.organization-header h4 {
  margin: 0;
  color: #111827;
  font-size: 1.1rem;
}

.organization-badges {
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
.badge-danger { background: #fee2e2; color: #dc2626; }

.organization-info p {
  margin: 0.25rem 0;
  color: #6b7280;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.organization-info p i {
  width: 16px;
}

.organization-website a {
  color: #3b82f6;
  text-decoration: none;
}

.organization-website a:hover {
  text-decoration: underline;
}

.organization-description {
  margin: 0.75rem 0 !important;
  color: #374151 !important;
  line-height: 1.5;
}

.organization-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.rating-stars {
  display: flex;
  gap: 0.1rem;
}

.star {
  color: #fbbf24;
  font-size: 0.875rem;
}

.rating-text {
  color: #6b7280;
  font-size: 0.875rem;
}

.specializations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
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

.organization-actions {
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

.projects-modal {
  max-width: 1000px;
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

/* Projects modal */
.projects-grid {
  display: grid;
  gap: 1rem;
}

.project-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.project-header h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.project-description {
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
}

.project-meta span {
  display: flex;
  align-items: center;
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

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
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