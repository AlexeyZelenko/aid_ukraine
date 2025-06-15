<template>
    <div class="component-content">
      <h2>Налаштування</h2>
      <p>Тут будуть основні налаштування системи.</p>
      <div class="settings-form">
        <h3>Налаштування системи</h3>
        <form>
          <div class="form-group">
            <label for="site-name">Назва сайту</label>
            <input type="text" id="site-name" class="form-control" value="Мій Адмін Панель">
          </div>
          <div class="form-group">
            <label for="admin-email">Email адміністратора</label>
            <input type="email" id="admin-email" class="form-control" value="admin@example.com">
          </div>
          <div class="form-group">
            <label for="theme-select">Тема оформлення</label>
            <select id="theme-select" class="form-control">
              <option>Світла</option>
              <option>Темна</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Зберегти</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SettingsComponent',
  };
  </script>
  
  <style scoped>
  /* Styles for settings-form, form-group, form-control, etc. are defined in AdminPanel.vue or a shared CSS file */
  </style>