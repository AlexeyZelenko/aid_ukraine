<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': collapsed }">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="logo">
          <i class="pi pi-shield" v-if="!collapsed"></i>
          <span v-if="!collapsed" class="logo-text">Admin Panel</span>
          <i class="pi pi-shield" v-else></i>
        </div>
        <button 
          class="toggle-btn" 
          @click="toggleSidebar"
          :title="collapsed ? 'Развернуть' : 'Свернуть'"
        >
          <i :class="collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"></i>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li 
            v-for="item in menuItems" 
            :key="item.id"
            class="nav-item"
            :class="{ 'active': activeComponent === item.component }"
          >
            <a 
              href="#" 
              class="nav-link" 
              @click.prevent="selectComponent(item.component)"
              :title="collapsed ? item.label : ''"
            >
              <i :class="item.icon" class="nav-icon"></i>
              <span v-if="!collapsed" class="nav-label">{{ item.label }}</span>
              <span v-if="item.badge && !collapsed" class="nav-badge">{{ item.badge }}</span>
            </a>
          </li>
        </ul>

        <!-- Submenu example -->
        <div class="nav-section" v-if="!collapsed">
          <div class="nav-section-header">
            <span>Управление</span>
          </div>
          <ul class="nav-list">
            <li 
              v-for="item in managementItems" 
              :key="item.id"
              class="nav-item"
              :class="{ 'active': activeComponent === item.component }"
            >
              <a 
                href="#" 
                class="nav-link" 
                @click.prevent="selectComponent(item.component)"
              >
                <i :class="item.icon" class="nav-icon"></i>
                <span class="nav-label">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer" v-if="!collapsed">
        <div class="user-info">
          <div class="user-avatar">
            <i class="pi pi-user"></i>
          </div>
          <div class="user-details">
            <span class="user-name">Admin</span>
            <span class="user-role">Администратор</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'collapsed': collapsed }">
      <!-- Header -->
      <header class="content-header">
        <div class="header-left">
          <h1>{{ getCurrentTitle() }}</h1>
        </div>        
      </header>

      <!-- Content Area -->
      <div class="content-body">
        <!-- Dashboard Component -->
        <div v-if="activeComponent === 'dashboard'" class="component-content">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="pi pi-users"></i>
              </div>
              <div class="stat-content">
                <h3>1,234</h3>
                <p>Пользователи</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="pi pi-shopping-cart"></i>
              </div>
              <div class="stat-content">
                <h3>567</h3>
                <p>Заказы</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="pi pi-chart-bar"></i>
              </div>
              <div class="stat-content">
                <h3>89%</h3>
                <p>Конверсия</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Component -->
        <div v-else-if="activeComponent === 'users'" class="component-content">
          <div class="services-table">
            <div class="table-header">
              <h3>Оголошення та послуги</h3>
              <div class="header-actions">
                <button class="btn btn-secondary">
                  <i class="pi pi-filter"></i>
                  Фільтр
                </button>
                <button class="btn btn-primary">
                  <i class="pi pi-plus"></i>
                  Додати
                </button>
              </div>
            </div>
            
            <div class="services-grid">
              <!-- Service Card 1 -->
              <div class="service-card urgent">
                <div class="service-header">
                  <div class="priority-badge urgent">Терміново</div>
                  <div class="service-icon medical">
                    <i class="pi pi-heart"></i>
                  </div>
                </div>
                <div class="service-content">
                  <h4>Медикаменти для діабетиків</h4>
                  <p class="service-description">
                    Потрібен інсулін та тест-смужки для глюкометра. Людина переселенець, втратила доступ до звичних ліків.
                  </p>
                  <div class="service-location">
                    <i class="pi pi-map-marker"></i>
                    <span>Київ, Печерський район</span>
                  </div>
                  <div class="service-contact">
                    <i class="pi pi-user"></i>
                    <span>Марія Петренко</span>
                  </div>
                  <div class="service-phone">
                    <i class="pi pi-phone"></i>
                    <span>+38 (050) 123-45-67</span>
                  </div>
                  <div class="service-quantity">
                    <i class="pi pi-hashtag"></i>
                    <span>Кількість: 2</span>
                  </div>
                </div>
                <div class="service-footer">
                  <div class="service-meta">
                    <span class="service-category">Медична допомога</span>
                    <span class="service-date">15.01.2024</span>
                  </div>
                  <div class="service-actions">
                    <button class="btn btn-primary btn-sm">
                      <i class="pi pi-phone"></i>
                      Зв'язатися
                    </button>
                    <button class="btn btn-outline btn-sm">
                      <i class="pi pi-eye"></i>
                      Деталі
                    </button>
                  </div>
                </div>
              </div>

              <!-- Service Card 2 -->
              <div class="service-card high">
                <div class="service-header">
                  <div class="priority-badge high">Високий</div>
                  <div class="service-icon housing">
                    <i class="pi pi-home"></i>
                  </div>
                </div>
                <div class="service-content">
                  <h4>Тимчасове житло для сім'ї з дітьми</h4>
                  <p class="service-description">
                    Сім'я з двома малими дітьми потребує тимчасового житла. Готові допомагати по господарству.
                  </p>
                  <div class="service-location">
                    <i class="pi pi-map-marker"></i>
                    <span>Львів</span>
                  </div>
                  <div class="service-contact">
                    <i class="pi pi-user"></i>
                    <span>Олександр Коваленко</span>
                  </div>
                  <div class="service-phone">
                    <i class="pi pi-phone"></i>
                    <span>+38 (067) 234-56-78</span>
                  </div>
                </div>
                <div class="service-footer">
                  <div class="service-meta">
                    <span class="service-category">Житло</span>
                    <span class="service-date">14.01.2024</span>
                  </div>
                  <div class="service-actions">
                    <button class="btn btn-primary btn-sm">
                      <i class="pi pi-phone"></i>
                      Зв'язатися
                    </button>
                    <button class="btn btn-outline btn-sm">
                      <i class="pi pi-eye"></i>
                      Деталі
                    </button>
                  </div>
                </div>
              </div>

              <!-- Service Card 3 -->
              <div class="service-card medium">
                <div class="service-header">
                  <div class="priority-badge medium">Середній</div>
                  <div class="service-icon food">
                    <i class="pi pi-shopping-bag"></i>
                  </div>
                </div>
                <div class="service-content">
                  <h4>Продукти харчування</h4>
                  <p class="service-description">
                    Потрібні продукти першої необхідності: крупи, консерви, дитяче харчування.
                  </p>
                  <div class="service-location">
                    <i class="pi pi-map-marker"></i>
                    <span>Одеса, Приморський район</span>
                  </div>
                  <div class="service-contact">
                    <i class="pi pi-user"></i>
                    <span>Ірина Сидоренко</span>
                  </div>
                  <div class="service-phone">
                    <i class="pi pi-phone"></i>
                    <span>+38 (093) 345-67-89</span>
                  </div>
                  <div class="service-quantity">
                    <i class="pi pi-hashtag"></i>
                    <span>Кількість: 10</span>
                  </div>
                </div>
                <div class="service-footer">
                  <div class="service-meta">
                    <span class="service-category">Продукти харчування</span>
                    <span class="service-date">13.01.2024</span>
                  </div>
                  <div class="service-actions">
                    <button class="btn btn-primary btn-sm">
                      <i class="pi pi-phone"></i>
                      Зв'язатися
                    </button>
                    <button class="btn btn-outline btn-sm">
                      <i class="pi pi-eye"></i>
                      Деталі
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Orders Component -->
        <div v-else-if="activeComponent === 'orders'" class="component-content">
          <div class="orders-list">
            <h3>Последние заказы</h3>
            <div class="order-item">
              <div class="order-info">
                <span class="order-id">#12345</span>
                <span class="order-customer">Иван Петров</span>
                <span class="order-date">14.06.2025</span>
              </div>
              <div class="order-status">
                <span class="badge badge-warning">В обработке</span>
              </div>
              <div class="order-amount">
                $125.00
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Component -->
        <div v-else-if="activeComponent === 'settings'" class="component-content">
          <div class="settings-form">
            <h3>Настройки системы</h3>
            <form>
              <div class="form-group">
                <label>Название сайта</label>
                <input type="text" class="form-control" value="My Admin Panel">
              </div>
              <div class="form-group">
                <label>Email администратора</label>
                <input type="email" class="form-control" value="admin@example.com">
              </div>
              <div class="form-group">
                <label>Тема оформления</label>
                <select class="form-control">
                  <option>Светлая</option>
                  <option>Тёмная</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Сохранить</button>
            </form>
          </div>
        </div>

        <!-- Other components -->
        <div v-else class="component-content">
          <div class="placeholder">
            <i class="pi pi-inbox" style="font-size: 3rem; color: #6c757d;"></i>
            <h3>{{ getCurrentTitle() }}</h3>
            <p>Содержимое компонента будет добавлено здесь</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data() {
    return {
      userId: '5C4AFwtxF1TpyQEdGXEKPfDk2K73',
      collapsed: false,
      activeComponent: 'dashboard',
      menuItems: [
        {
          id: 1,
          label: 'Панель управления',
          icon: 'pi pi-home',
          component: 'dashboard'
        },
        {
          id: 2,
          label: 'Пользователи',
          icon: 'pi pi-users',
          component: 'users',
          badge: '12'
        },
        {
          id: 3,
          label: 'Заказы',
          icon: 'pi pi-shopping-cart',
          component: 'orders',
          badge: '5'
        },
        {
          id: 4,
          label: 'Продукты',
          icon: 'pi pi-box',
          component: 'products'
        },
        {
          id: 5,
          label: 'Аналитика',
          icon: 'pi pi-chart-line',
          component: 'analytics'
        },
        {
          id: 6,
          label: 'Сообщения',
          icon: 'pi pi-inbox',
          component: 'messages'
        }
      ],
      managementItems: [
        {
          id: 7,
          label: 'Настройки',
          icon: 'pi pi-cog',
          component: 'settings'
        },
        {
          id: 8,
          label: 'Логи',
          icon: 'pi pi-file-text',
          component: 'logs'
        },
        {
          id: 9,
          label: 'Помощь',
          icon: 'pi pi-question-circle',
          component: 'help'
        }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
    selectComponent(component) {
      this.activeComponent = component;
    },
    getCurrentTitle() {
      const allItems = [...this.menuItems, ...this.managementItems];
      const currentItem = allItems.find(item => item.component === this.activeComponent);
      return currentItem ? currentItem.label : 'Admin Panel';
    }
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e9ecef;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #495057;
}

.logo i {
  font-size: 1.5rem;
  color: #007bff;
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.1rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background-color: #f8f9fa;
  color: #495057;
}

/* Navigation Styles */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0.25rem 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.nav-item.active .nav-link {
  background-color: #e3f2fd;
  color: #1976d2;
  border-right: 3px solid #1976d2;
}

.nav-icon {
  font-size: 1.1rem;
  margin-right: 0.75rem;
  width: 1.2rem;
  text-align: center;
}

.nav-label {
  flex: 1;
  font-weight: 500;
}

.nav-badge {
  background-color: #dc3545;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
}

.nav-section {
  margin-top: 2rem;
}

.nav-section-header {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #e9ecef;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 0.75rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.user-role {
  font-size: 0.8rem;
  color: #6c757d;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  background-color: #f8f9fa;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
}

.content-header {
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
}

.header-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #495057;
  font-weight: 600;
}

.content-body {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.component-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Button Styles */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-icon {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  margin: 0 0.25rem;
}

.btn-icon:hover {
  background-color: #f8f9fa;
  color: #495057;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
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
  margin: 0;
  color: #6c757d;
  font-weight: 500;
}

/* Services Grid Styles */
.services-table .table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.service-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

.service-card.urgent {
  border-left: 4px solid #dc3545;
}

.service-card.high {
  border-left: 4px solid #fd7e14;
}

.service-card.medium {
  border-left: 4px solid #ffc107;
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 0;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.priority-badge.urgent {
  background-color: #f8d7da;
  color: #721c24;
}

.priority-badge.high {
  background-color: #fed7aa;
  color: #9a3412;
}

.priority-badge.medium {
  background-color: #fff3cd;
  color: #856404;
}

.service-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.service-icon.medical {
  background: linear-gradient(135deg, #dc3545, #c82333);
}

.service-icon.housing {
  background: linear-gradient(135deg, #007bff, #0056b3);
}

.service-icon.food {
  background: linear-gradient(135deg, #28a745, #1e7e34);
}

.service-icon i {
  font-size: 1.25rem;
}

.service-content {
  padding: 1rem 1.5rem;
}

.service-content h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  line-height: 1.4;
}

.service-description {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.service-location,
.service-contact,
.service-phone,
.service-quantity {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #495057;
}

.service-location i,
.service-contact i,
.service-phone i,
.service-quantity i {
  margin-right: 0.5rem;
  color: #007bff;
  width: 14px;
  text-align: center;
}

.service-footer {
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.service-category {
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
}

.service-date {
  font-size: 0.8rem;
  color: #adb5bd;
}

.service-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
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

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
}

.badge-warning {
  background-color: #fff3cd;
  color: #856404;
}

/* Orders */
.orders-list h3 {
  margin: 0 0 1.5rem 0;
  color: #495057;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.order-info {
  flex: 1;
  display: flex;
  gap: 1rem;
}

.order-id {
  font-weight: 600;
  color: #007bff;
}

.order-amount {
  font-weight: 600;
  color: #28a745;
}

/* Settings Form */
.settings-form h3 {
  margin: 0 0 1.5rem 0;
  color: #495057;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
}

/* Placeholder */
.placeholder {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.placeholder h3 {
  margin: 1rem 0;
  color: #6c757d;
}

/* Responsive Services Grid */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -280px;
    z-index: 1000;
    height: 100vh;
  }
  
  .sidebar.sidebar-open {
    left: 0;
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .service-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .service-actions {
    justify-content: center;
  }
  
  .header-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>