<template>
    <div class="component-content">
      <h2>Сповіщення</h2>
      <p>Тут будуть системні сповіщення та повідомлення для адміністратора.</p>
      <div class="notifications-list">
        <div class="notification-item unread">
          <i class="pi pi-bell"></i>
          <div class="notification-content">
            <h4>Нове повідомлення від користувача</h4>
            <p>Користувач Олена Петрова надіслала запит через форму зворотного зв'язку.</p>
            <span class="notification-date">1 годину тому</span>
          </div>
          <button class="btn btn-outline btn-sm">Переглянути</button>
        </div>
        <div class="notification-item">
          <i class="pi pi-check-circle"></i>
          <div class="notification-content">
            <h4>Оновлення системи</h4>
            <p>Система була успішно оновлена до останньої версії.</p>
            <span class="notification-date">Вчора, 14:30</span>
          </div>
          <button class="btn btn-outline btn-sm">Деталі</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotificationsComponent',
  };
  </script>
  
  <style scoped>
  .notifications-list {
    margin-top: 1.5rem;
    display: grid;
    gap: 1rem;
  }
  
  .notification-item {
    background-color: #fefefe;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .notification-item.unread {
    background-color: #e3f2fd;
    border-left: 4px solid #1976d2;
  }
  
  .notification-item i {
    font-size: 1.5rem;
    color: #007bff;
  }
  
  .notification-item.unread i {
    color: #1976d2;
  }
  
  .notification-content {
    flex-grow: 1;
  }
  
  .notification-content h4 {
    margin: 0 0 0.25rem 0;
    color: #212529;
  }
  
  .notification-content p {
    margin: 0;
    color: #6c757d;
    font-size: 0.9rem;
  }
  
  .notification-date {
    font-size: 0.75rem;
    color: #adb5bd;
  }
  </style>