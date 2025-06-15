<template>
    <div class="component-content">
      <h2>Потреби</h2>
      <p>Тут буде список усіх нагальних потреб та управління ними.</p>
      <div class="needs-list">
        <div class="need-item">
          <h4>Медикаменти для літніх людей</h4>
          <p>Місто: Харків</p>
          <p>Категорія: Медична допомога</p>
          <button class="btn btn-primary btn-sm">Деталі</button>
        </div>
        <div class="need-item">
          <h4>Теплий одяг для дітей</h4>
          <p>Місто: Чернігів</p>
          <p>Категорія: Речі</p>
          <button class="btn btn-primary btn-sm">Деталі</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NeedsComponent',
  };
  </script>
  
  <style scoped>
  .needs-list {
    margin-top: 1.5rem;
    display: grid;
    gap: 1rem;
  }
  
  .need-item {
    background-color: #fefefe;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .need-item h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #212529;
  }
  
  .need-item p {
    margin-bottom: 0.25rem;
    color: #6c757d;
    font-size: 0.9rem;
  }
  
  .need-item .btn {
    margin-top: 1rem;
  }
  </style>