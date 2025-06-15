<template>
    <div class="component-content">
      <h2>Волонтери</h2>
      <p>Тут буде список усіх волонтерів та управління ними.</p>
      <div class="volunteers-list">
        <div class="volunteer-card">
          <div class="volunteer-info">
            <h4>Іван Доброволець</h4>
            <p>Email: ivan.d@example.com</p>
            <p>Телефон: +380 (97) 111-22-33</p>
            <p>Напрямки: Допомога з продуктами, Транспорт</p>
          </div>
          <div class="volunteer-actions">
            <button class="btn btn-primary btn-sm">Деталі</button>
            <button class="btn btn-secondary btn-sm">Редагувати</button>
          </div>
        </div>
        <div class="volunteer-card">
          <div class="volunteer-info">
            <h4>Ольга Волонтерка</h4>
            <p>Email: olga.v@example.com</p>
            <p>Телефон: +380 (63) 444-55-66</p>
            <p>Напрямки: Медична допомога, Консультування</p>
          </div>
          <div class="volunteer-actions">
            <button class="btn btn-primary btn-sm">Деталі</button>
            <button class="btn btn-secondary btn-sm">Редагувати</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VolunteersComponent',
  };
  </script>
  
  <style scoped>
  .volunteers-list {
    margin-top: 1.5rem;
    display: grid;
    gap: 1rem;
  }
  
  .volunteer-card {
    background-color: #fefefe;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .volunteer-card h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #212529;
  }
  
  .volunteer-card p {
    margin-bottom: 0.25rem;
    color: #6c757d;
    font-size: 0.9rem;
  }
  
  .volunteer-actions {
    display: flex;
    gap: 0.5rem;
  }
  </style>