<template>
  <div class="churches-management">
    <!-- Заголовок та статистика -->
    <div class="header-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon pending">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>{{ pendingChurches.length }}</h3>
            <p>Очікують перевірки</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon approved">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ approvedChurches.length }}</h3>
            <p>Затверджені</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon rejected">
            <i class="fas fa-times-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ rejectedChurches.length }}</h3>
            <p>Відхилені</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon total">
            <i class="fas fa-church"></i>
          </div>
          <div class="stat-content">
            <h3>{{ churches.length }}</h3>
            <p>Всього заявок</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Фільтри та пошук -->
    <div class="filters-section">
      <div class="filters-row">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Пошук церков..."
            class="search-input"
          >
        </div>
        
        <div class="filter-group">
          <select v-model="statusFilter" class="filter-select">
            <option value="">Всі статуси</option>
            <option value="pending">Очікують перевірки</option>
            <option value="approved">Затверджені</option>
            <option value="rejected">Відхилені</option>
          </select>
          
          <select v-model="typeFilter" class="filter-select">
            <option value="">Всі типи</option>
            <option value="orthodox">Православна церква</option>
            <option value="catholic">Католицька церква</option>
            <option value="protestant">Протестантська церква</option>
            <option value="baptist">Баптистська церква</option>
            <option value="pentecostal">П'ятидесятницька церква</option>
            <option value="evangelical">Євангельська церква</option>
            <option value="adventist">Адвентистська церква</option>
            <option value="jewish">Іудейська громада</option>
            <option value="muslim">Мусульманська громада</option>
            <option value="other">Інша релігійна організація</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Список церков -->
    <div class="churches-list">
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Завантаження церков...</p>
      </div>
      
      <div v-else-if="filteredChurches.length === 0" class="empty-state">
        <i class="fas fa-church"></i>
        <h3>Церкви не знайдені</h3>
        <p>Немає церков, що відповідають вашим критеріям пошуку</p>
      </div>
      
      <div v-else class="churches-grid">
        <div 
          v-for="church in filteredChurches" 
          :key="church.id"
          class="church-card"
          :class="{ 
            'pending': church.status === 'pending',
            'approved': church.status === 'approved',
            'rejected': church.status === 'rejected'
          }"
        >
          <!-- Статус індикатор -->
          <div class="status-indicator" :class="church.status">
            <i class="fas fa-clock" v-if="church.status === 'pending'"></i>
            <i class="fas fa-check" v-if="church.status === 'approved'"></i>
            <i class="fas fa-times" v-if="church.status === 'rejected'"></i>
          </div>

          <!-- Основна інформація -->
          <div class="church-header">
            <h3 class="church-name">{{ church.name }}</h3>
            <span class="church-type">{{ getOrganizationTypeLabel(church.organizationType) }}</span>
          </div>

          <div class="church-details">
            <div class="detail-row">
              <i class="fas fa-user"></i>
              <span>{{ church.contactPerson }}</span>
              <span v-if="church.position" class="position">({{ church.position }})</span>
            </div>
            
            <div class="detail-row">
              <i class="fas fa-envelope"></i>
              <span>{{ church.email }}</span>
            </div>
            
            <div class="detail-row">
              <i class="fas fa-phone"></i>
              <span>{{ church.phone }}</span>
            </div>
            
            <div class="detail-row">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ church.location }}</span>
            </div>

            <div v-if="church.members" class="detail-row">
              <i class="fas fa-users"></i>
              <span>{{ church.members }} прихожан</span>
            </div>

            <div v-if="church.experience" class="detail-row">
              <i class="fas fa-calendar"></i>
              <span>{{ church.experience }} років досвіду</span>
            </div>
          </div>

          <!-- Послуги -->
          <div v-if="church.services && church.services.length > 0" class="church-services">
            <h4>Напрямки допомоги:</h4>
            <div class="services-tags">
              <span 
                v-for="service in church.services.slice(0, 3)" 
                :key="service"
                class="service-tag"
              >
                {{ service }}
              </span>
              <span v-if="church.services.length > 3" class="more-services">
                +{{ church.services.length - 3 }} ще
              </span>
            </div>
          </div>

          <!-- Опис -->
          <div class="church-description">
            <p>{{ truncateText(church.description, 150) }}</p>
          </div>

          <!-- Дата реєстрації -->
          <div class="church-meta">
            <span class="registration-date">
              <i class="fas fa-calendar-plus"></i>
              Подано: {{ formatDate(church.createdAt) }}
            </span>
            <span class="user-info">
              <i class="fas fa-user-circle"></i>
              {{ church.userEmail }}
            </span>
          </div>

          <!-- Дії -->
          <div class="church-actions">
            <button 
              @click="viewChurch(church)"
              class="action-btn view"
              title="Переглянути деталі"
            >
              <i class="fas fa-eye"></i>
            </button>
            
            <button 
              v-if="church.status === 'pending'"
              @click="approveChurch(church)"
              class="action-btn approve"
              title="Затвердити"
            >
              <i class="fas fa-check"></i>
            </button>
            
            <button 
              v-if="church.status === 'pending'"
              @click="rejectChurch(church)"
              class="action-btn reject"
              title="Відхилити"
            >
              <i class="fas fa-times"></i>
            </button>
            
            <button 
              @click="deleteChurch(church)"
              class="action-btn delete"
              title="Видалити"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальне вікно деталей -->
    <div v-if="selectedChurch" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedChurch.name }}</h2>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="detail-section">
            <h3>Основна інформація</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <label>Назва:</label>
                <span>{{ selectedChurch.name }}</span>
              </div>
              <div class="detail-item">
                <label>Тип організації:</label>
                <span>{{ getOrganizationTypeLabel(selectedChurch.organizationType) }}</span>
              </div>
              <div class="detail-item">
                <label>Контактна особа:</label>
                <span>{{ selectedChurch.contactPerson }}</span>
              </div>
              <div class="detail-item">
                <label>Посада:</label>
                <span>{{ selectedChurch.position || 'Не вказано' }}</span>
              </div>
              <div class="detail-item">
                <label>Email:</label>
                <span>{{ selectedChurch.email }}</span>
              </div>
              <div class="detail-item">
                <label>Телефон:</label>
                <span>{{ selectedChurch.phone }}</span>
              </div>
              <div class="detail-item">
                <label>Адреса:</label>
                <span>{{ selectedChurch.address }}</span>
              </div>
              <div class="detail-item">
                <label>Місцезнаходження:</label>
                <span>{{ selectedChurch.location }}</span>
              </div>
              <div class="detail-item">
                <label>Веб-сайт:</label>
                <span>{{ selectedChurch.website || 'Не вказано' }}</span>
              </div>
              <div class="detail-item">
                <label>Кількість прихожан:</label>
                <span>{{ selectedChurch.members || 'Не вказано' }}</span>
              </div>
              <div class="detail-item">
                <label>Досвід (років):</label>
                <span>{{ selectedChurch.experience || 'Не вказано' }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3>Напрямки допомоги</h3>
            <div class="services-list">
              <span 
                v-for="service in selectedChurch.services" 
                :key="service"
                class="service-tag"
              >
                {{ service }}
              </span>
            </div>
          </div>

          <div class="detail-section">
            <h3>Опис організації</h3>
            <p class="description-text">{{ selectedChurch.description }}</p>
          </div>

          <div class="detail-section">
            <h3>Документи та реєстрація</h3>
            <div class="documents-info">
              <div class="document-item">
                <i class="fas fa-certificate" :class="{ 'text-green': selectedChurch.hasRegistration, 'text-red': !selectedChurch.hasRegistration }"></i>
                <span>Офіційна реєстрація: {{ selectedChurch.hasRegistration ? 'Є' : 'Немає' }}</span>
              </div>
              <div class="document-item">
                <i class="fas fa-file-invoice" :class="{ 'text-green': selectedChurch.hasTaxNumber, 'text-red': !selectedChurch.hasTaxNumber }"></i>
                <span>Податковий номер: {{ selectedChurch.hasTaxNumber ? 'Є' : 'Немає' }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3>Системна інформація</h3>
            <div class="system-info">
              <p><strong>Статус:</strong> {{ getStatusLabel(selectedChurch.status) }}</p>
              <p><strong>Дата подання:</strong> {{ formatDate(selectedChurch.createdAt) }}</p>
              <p><strong>Користувач:</strong> {{ selectedChurch.userEmail }}</p>
              <p><strong>ID користувача:</strong> {{ selectedChurch.userId }}</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button 
            v-if="selectedChurch.status === 'pending'"
            @click="approveChurch(selectedChurch)"
            class="btn btn-success"
          >
            <i class="fas fa-check mr-2"></i>
            Затвердити
          </button>
          
          <button 
            v-if="selectedChurch.status === 'pending'"
            @click="rejectChurch(selectedChurch)"
            class="btn btn-danger"
          >
            <i class="fas fa-times mr-2"></i>
            Відхилити
          </button>
          
          <button @click="closeModal" class="btn btn-secondary">
            Закрити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { db } from '../../config/firebase'
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'

// Reactive data
const churches = ref([])
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const selectedChurch = ref(null)

// Computed properties
const pendingChurches = computed(() => 
  churches.value.filter(church => church.status === 'pending')
)

const approvedChurches = computed(() => 
  churches.value.filter(church => church.status === 'approved')
)

const rejectedChurches = computed(() => 
  churches.value.filter(church => church.status === 'rejected')
)

const filteredChurches = computed(() => {
  let filtered = churches.value

  // Фільтр по пошуку
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(church => 
      church.name.toLowerCase().includes(query) ||
      church.contactPerson.toLowerCase().includes(query) ||
      church.email.toLowerCase().includes(query) ||
      church.location.toLowerCase().includes(query)
    )
  }

  // Фільтр по статусу
  if (statusFilter.value) {
    filtered = filtered.filter(church => church.status === statusFilter.value)
  }

  // Фільтр по типу організації
  if (typeFilter.value) {
    filtered = filtered.filter(church => church.organizationType === typeFilter.value)
  }

  return filtered
})

// Methods
const loadChurches = async () => {
  try {
    loading.value = true
    const q = query(collection(db, 'churches'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    churches.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Помилка завантаження церков:', error)
  } finally {
    loading.value = false
  }
}

const approveChurch = async (church) => {
  try {
    await updateDoc(doc(db, 'churches', church.id), {
      status: 'approved',
      verified: true,
      updatedAt: new Date()
    })
    
    church.status = 'approved'
    church.verified = true
    
    if (selectedChurch.value && selectedChurch.value.id === church.id) {
      selectedChurch.value.status = 'approved'
      selectedChurch.value.verified = true
    }
    
    console.log('Церкву затверджено')
  } catch (error) {
    console.error('Помилка затвердження церкви:', error)
  }
}

const rejectChurch = async (church) => {
  try {
    await updateDoc(doc(db, 'churches', church.id), {
      status: 'rejected',
      verified: false,
      updatedAt: new Date()
    })
    
    church.status = 'rejected'
    church.verified = false
    
    if (selectedChurch.value && selectedChurch.value.id === church.id) {
      selectedChurch.value.status = 'rejected'
      selectedChurch.value.verified = false
    }
    
    console.log('Церкву відхилено')
  } catch (error) {
    console.error('Помилка відхилення церкви:', error)
  }
}

const deleteChurch = async (church) => {
  if (confirm(`Ви впевнені, що хочете видалити церкву "${church.name}"?`)) {
    try {
      await deleteDoc(doc(db, 'churches', church.id))
      churches.value = churches.value.filter(c => c.id !== church.id)
      
      if (selectedChurch.value && selectedChurch.value.id === church.id) {
        selectedChurch.value = null
      }
      
      console.log('Церкву видалено')
    } catch (error) {
      console.error('Помилка видалення церкви:', error)
    }
  }
}

const viewChurch = (church) => {
  selectedChurch.value = church
}

const closeModal = () => {
  selectedChurch.value = null
}

const getOrganizationTypeLabel = (type) => {
  const labels = {
    orthodox: 'Православна церква',
    catholic: 'Католицька церква',
    protestant: 'Протестантська церква',
    baptist: 'Баптистська церква',
    pentecostal: 'П\'ятидесятницька церква',
    evangelical: 'Євангельська церква',
    adventist: 'Адвентистська церква',
    jewish: 'Іудейська громада',
    muslim: 'Мусульманська громада',
    other: 'Інша релігійна організація'
  }
  return labels[type] || type
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Очікує перевірки',
    approved: 'Затверджено',
    rejected: 'Відхилено'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  if (!date) return 'Не вказано'
  
  // Handle Firestore Timestamp
  if (date.toDate) {
    return date.toDate().toLocaleDateString('uk-UA')
  }
  
  // Handle regular Date
  if (date instanceof Date) {
    return date.toLocaleDateString('uk-UA')
  }
  
  // Handle string date
  return new Date(date).toLocaleDateString('uk-UA')
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Lifecycle
onMounted(() => {
  loadChurches()
})
</script>

<style scoped>
.churches-management {
  padding: 20px;
}

.header-section {
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-left: 4px solid #ddd;
}

.stat-card:has(.pending) { border-left-color: #f59e0b; }
.stat-card:has(.approved) { border-left-color: #10b981; }
.stat-card:has(.rejected) { border-left-color: #ef4444; }
.stat-card:has(.total) { border-left-color: #6366f1; }

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.stat-icon.pending { background: #f59e0b; }
.stat-icon.approved { background: #10b981; }
.stat-icon.rejected { background: #ef4444; }
.stat-icon.total { background: #6366f1; }

.stat-content h3 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #1f2937;
}

.stat-content p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.filters-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.filters-row {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.filter-group {
  display: flex;
  gap: 10px;
}

.filter-select {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-width: 150px;
}

.churches-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.loading-state, .empty-state {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.loading-state i {
  font-size: 24px;
  margin-bottom: 10px;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 20px;
  color: #d1d5db;
}

.churches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.church-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;
}

.church-card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.church-card.pending { border-left: 4px solid #f59e0b; }
.church-card.approved { border-left: 4px solid #10b981; }
.church-card.rejected { border-left: 4px solid #ef4444; }

.status-indicator {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
}

.status-indicator.pending { background: #f59e0b; }
.status-indicator.approved { background: #10b981; }
.status-indicator.rejected { background: #ef4444; }

.church-header {
  margin-bottom: 15px;
  padding-right: 40px;
}

.church-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #1f2937;
}

.church-type {
  color: #6b7280;
  font-size: 14px;
}

.church-details {
  margin-bottom: 15px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #4b5563;
}

.detail-row i {
  width: 16px;
  color: #6b7280;
}

.position {
  color: #6b7280;
  font-style: italic;
}

.church-services {
  margin-bottom: 15px;
}

.church-services h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #374151;
}

.services-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.service-tag {
  background: #f3f4f6;
  color: #374151;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.more-services {
  background: #e5e7eb;
  color: #6b7280;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.church-description {
  margin-bottom: 15px;
}

.church-description p {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.church-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 12px;
  color: #9ca3af;
}

.church-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.church-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.action-btn.view {
  background: #f3f4f6;
  color: #374151;
}

.action-btn.view:hover {
  background: #e5e7eb;
}

.action-btn.approve {
  background: #dcfce7;
  color: #16a34a;
}

.action-btn.approve:hover {
  background: #bbf7d0;
}

.action-btn.reject {
  background: #fef2f2;
  color: #dc2626;
}

.action-btn.reject:hover {
  background: #fecaca;
}

.action-btn.delete {
  background: #fef2f2;
  color: #dc2626;
}

.action-btn.delete:hover {
  background: #fecaca;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;
  padding: 5px;
}

.modal-body {
  padding: 20px;
}

.detail-section {
  margin-bottom: 30px;
}

.detail-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #1f2937;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 8px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-item label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.detail-item span {
  color: #6b7280;
  font-size: 14px;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.description-text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.documents-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.text-green { color: #16a34a; }
.text-red { color: #dc2626; }

.system-info p {
  margin: 8px 0;
  color: #4b5563;
  font-size: 14px;
}

.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-success {
  background: #16a34a;
  color: white;
}

.btn-success:hover {
  background: #15803d;
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn-danger:hover {
  background: #b91c1c;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.mr-2 {
  margin-right: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .churches-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    flex-direction: column;
  }
  
  .church-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .modal-content {
    margin: 10px;
    max-height: calc(100vh - 20px);
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style> 