<template>
    <div class="component-content">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-users"></i>
          </div>
          <div class="stat-content">
            <h3>1,234</h3>
            <p>Користувачі</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-shopping-cart"></i>
          </div>
          <div class="stat-content">
            <h3>567</h3>
            <p>Замовлення</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-chart-bar"></i>
          </div>
          <div class="stat-content">
            <h3>89%</h3>
            <p>Конверсія</p>
          </div>
        </div>
      </div>
      <div class="dashboard-section">
        <h3>Останні активності</h3>
        <ul>
          <li>Новий користувач зареєструвався: **Олена Мельник**</li>
          <li>Оновлено статус оголошення: **"Тимчасове житло"** на **"Виконано"**</li>
          <li>Додано нову статтю: **"Як долучитися до волонтерства?"**</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardComponent',
  };
  </script>
  
  <style scoped>
  .dashboard-section {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }
  
  .dashboard-section h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #495057;
  }
  
  .dashboard-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .dashboard-section li {
    padding: 0.5rem 0;
    color: #6c757d;
    border-bottom: 1px dashed #e9ecef;
  }
  
  .dashboard-section li:last-child {
    border-bottom: none;
  }
  /* Styles for stats-grid, stat-card, etc. are defined in AdminPanel.vue or a shared CSS file */
  </style>