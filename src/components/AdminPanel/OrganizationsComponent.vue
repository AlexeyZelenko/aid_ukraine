<template>
    <div class="component-content">
      <h2>Організації</h2>
      <p>Тут буде список усіх організацій та управління ними.</p>
      <div class="organizations-list">
        <div class="organization-card">
          <div class="organization-info">
            <h4>Благодійний фонд "Разом Сильніші"</h4>
            <p>Email: info@razomsilnishi.org</p>
            <p>Телефон: +380 (44) 123-45-67</p>
            <p>Напрямки: Гуманітарна допомога, Психологічна підтримка</p>
          </div>
          <div class="organization-actions">
            <button class="btn btn-primary btn-sm">Деталі</button>
            <button class="btn btn-secondary btn-sm">Редагувати</button>
          </div>
        </div>
        <div class="organization-card">
          <div class="organization-info">
            <h4>Волонтерський рух "Надія"</h4>
            <p>Email: contact@nadeya.ua</p>
            <p>Телефон: +380 (50) 987-65-43</p>
            <p>Напрямки: Евакуація, Забезпечення житлом</p>
          </div>
          <div class="organization-actions">
            <button class="btn btn-primary btn-sm">Деталі</button>
            <button class="btn btn-secondary btn-sm">Редагувати</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrganizationsComponent',
  };
  </script>
  
  <style scoped>
  .organizations-list {
    margin-top: 1.5rem;
    display: grid;
    gap: 1rem;
  }
  
  .organization-card {
    background-color: #fefefe;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .organization-card h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #212529;
  }
  
  .organization-card p {
    margin-bottom: 0.25rem;
    color: #6c757d;
    font-size: 0.9rem;
  }
  
  .organization-actions {
    display: flex;
    gap: 0.5rem;
  }
  </style>