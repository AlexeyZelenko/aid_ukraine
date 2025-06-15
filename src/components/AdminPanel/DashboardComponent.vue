// DashboardComponent.vue
<template>
  <div class="dashboard-content">
    <!-- Статистичні картки -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon volunteers">
          <i class="pi pi-users"></i>
        </div>
        <div class="stat-content">
          <h3>1,234</h3>
          <p>Волонтери</p>
          <span class="stat-change positive">+12% цього місяця</span>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon organizations">
          <i class="pi pi-building"></i>
        </div>
        <div class="stat-content">
          <h3>87</h3>
          <p>Організації</p>
          <span class="stat-change positive">+5% цього місяця</span>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon needs">
          <i class="pi pi-heart"></i>
        </div>
        <div class="stat-content">
          <h3>156</h3>
          <p>Активні потреби</p>
          <span class="stat-change neutral">Без змін</span>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon completed">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>892</h3>
          <p>Виконано</p>
          <span class="stat-change positive">+23% цього місяця</span>
        </div>
      </div>
    </div>

    <!-- Останні активності -->
    <div class="dashboard-row">
      <div class="dashboard-col">
        <div class="activity-card">
          <div class="card-header">
            <h3>Останні активності</h3>
            <button class="btn btn-outline btn-sm">
              <i class="pi pi-refresh"></i>
              Оновити
            </button>
          </div>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon new-volunteer">
                <i class="pi pi-user-plus"></i>
              </div>
              <div class="activity-content">
                <p><strong>Новий волонтер</strong> Марія Петренко зареєструвалася</p>
                <span class="activity-time">5 хвилин тому</span>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon need-fulfilled">
                <i class="pi pi-heart-fill"></i>
              </div>
              <div class="activity-content">
                <p><strong>Потреба виконана</strong> Медикаменти для діабетиків</p>
                <span class="activity-time">15 хвилин тому</span>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon new-organization">
                <i class="pi pi-building"></i>
              </div>
              <div class="activity-content">
                <p><strong>Нова організація</strong> Червоний Хрест приєднався</p>
                <span class="activity-time">1 година тому</span>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon article-published">
                <i class="pi pi-file-text"></i>
              </div>
              <div class="activity-content">
                <p><strong>Стаття опублікована</strong> "Як стати волонтером"</p>
                <span class="activity-time">2 години тому</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="dashboard-col">
        <div class="priority-card">
          <div class="card-header">
            <h3>Пріоритетні потреби</h3>
            <span class="priority-count">3 термінові</span>
          </div>
          <div class="priority-list">
            <div class="priority-item urgent">
              <div class="priority-indicator"></div>
              <div class="priority-content">
                <h4>Медикаменти для діабетиків</h4>
                <p>Київ, Печерський район</p>
                <span class="priority-time">Створено 2 години тому</span>
              </div>
              <button class="btn btn-primary btn-sm">Переглянути</button>
            </div>
            
            <div class="priority-item high">
              <div class="priority-indicator"></div>
              <div class="priority-content">
                <h4>Тимчасове житло для сім'ї</h4>
                <p>Львів</p>
                <span class="priority-time">Створено 4 години тому</span>
              </div>
              <button class="btn btn-primary btn-sm">Переглянути</button>
            </div>
            
            <div class="priority-item medium">
              <div class="priority-indicator"></div>
              <div class="priority-content">
                <h4>Продукти харчування</h4>
                <p>Одеса, Приморський район</p>
                <span class="priority-time">Створено 6 годин тому</span>
              </div>
              <button class="btn btn-primary btn-sm">Переглянути</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Графіки та статистика -->
    <div class="charts-section">
      <div class="chart-card">
        <div class="card-header">
          <h3>Активність за останні 7 днів</h3>
        </div>
        <div class="chart-placeholder">
          <i class="pi pi-chart-line"></i>
          <p>Тут буде графік активності</p>
        </div>
      </div>
      
      <div class="chart-card">
        <div class="card-header">
          <h3>Розподіл потреб за категоріями</h3>
        </div>
        <div class="chart-placeholder">
          <i class="pi pi-chart-pie"></i>
          <p>Тут буде кругова діаграма</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardComponent',
  data() {
    return {
      // Дані компонента
    };
  },
  methods: {
    refreshData() {
      // Логіка оновлення даних
    }
  }
};
</script>

<style scoped>
.dashboard-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Статистичні картки */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.stat-icon.volunteers {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.organizations {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-icon.needs {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-icon.completed {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-icon i {
  font-size: 1.5rem;
  color: white;
}

.stat-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #495057;
}

.stat-content p {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
  font-weight: 500;
}

.stat-change {
  font-size: 0.85rem;
  font-weight: 500;
}

.stat-change.positive {
  color: #28a745;
}

.stat-change.negative {
  color: #dc3545;
}

.stat-change.neutral {
  color: #6c757d;
}

/* Розміщення рядів */
.dashboard-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.dashboard-col {
  display: flex;
  flex-direction: column;
}

/* Картка активності */
.activity-card, .priority-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  height: 100%;
}

.card-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  color: #495057;
  font-size: 1.1rem;
  font-weight: 600;
}

.priority-count {
  background: #dc3545;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.activity-list, .priority-list {
  padding: 1rem 1.5rem 1.5rem;
}

.activity-item, .priority-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.activity-item:last-child, .priority-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
}

.activity-icon.new-volunteer {
  background: #007bff;
}

.activity-icon.need-fulfilled {
  background: #28a745;
}

.activity-icon.new-organization {
  background: #6f42c1;
}

.activity-icon.article-published {
  background: #fd7e14;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0 0 0.25rem 0;
  color: #495057;
  font-size: 0.9rem;
}

.activity-time, .priority-time {
  color: #6c757d;
  font-size: 0.8rem;
}

/* Пріоритетні потреби */
.priority-item {
  align-items: flex-start;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border: 1px solid transparent;
}

.priority-item.urgent {
  background: #fef2f2;
  border-color: #fecaca;
}

.priority-item.high {
  background: #fef3c7;
  border-color: #fed7aa;
}

.priority-item.medium {
  background: #f0f9ff;
  border-color: #bae6fd;
}

.priority-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 1rem;
  margin-top: 0.5rem;
}

.priority-item.urgent .priority-indicator {
  background: #dc3545;
}

.priority-item.high .priority-indicator {
  background: #fd7e14;
}

.priority-item.medium .priority-indicator {
  background: #007bff;
}

.priority-content {
  flex: 1;
}

.priority-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #212529;
}

.priority-content p {
  margin: 0 0 0.25rem 0;
  color: #6c757d;
  font-size: 0.85rem;
}

/* Графіки */
.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.chart-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.chart-placeholder {
  padding: 3rem;
  text-align: center;
  color: #6c757d;
}

.chart-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

/* Кнопки */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-outline {
  background: transparent;
  border: 1px solid #dee2e6;
  color: #6c757d;
}

.btn-outline:hover {
  background-color: #f8f9fa;
  border-color: #adb5bd;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

/* Адаптивність */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-row {
    grid-template-columns: 1fr;
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
}
</style>