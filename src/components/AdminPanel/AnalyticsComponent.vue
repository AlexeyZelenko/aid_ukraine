<template>
    <div class="component-content">
      <h2>Аналітика</h2>
      <p>Тут будуть графіки та статистичні дані щодо активності на платформі.</p>
      <div class="analytics-charts">
        <div class="chart-card">
          <h3>Розподіл потреб за категоріями</h3>
          <p>Діаграма, що показує найпопулярніші категорії потреб.</p>
          <div style="height: 200px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; color: #6c757d;">Графік тут</div>
        </div>
        <div class="chart-card">
          <h3>Активність волонтерів за місяць</h3>
          <p>Гістограма, що відображає кількість виконаних завдань волонтерами.</p>
          <div style="height: 200px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; color: #6c757d;">Графік тут</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AnalyticsComponent',
  };
  </script>
  
  <style scoped>
  .analytics-charts {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .chart-card {
    background-color: #fefefe;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .chart-card h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: #212529;
  }
  
  .chart-card p {
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  </style>