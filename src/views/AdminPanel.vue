<template>
  <div class="admin-layout">
    <!-- Бічна панель -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': collapsed }">
      <!-- Заголовок бічної панелі -->
      <div class="sidebar-header">
        <div class="logo">
          <i class="pi pi-shield" v-if="!collapsed"></i>
          <span v-if="!collapsed" class="logo-text">Панель адміністратора</span>
          <i class="pi pi-shield" v-else></i>
        </div>
        <button 
          class="toggle-btn" 
          @click="toggleSidebar"
          :title="collapsed ? 'Розгорнути' : 'Згорнути'"
        >
          <i :class="collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"></i>
        </button>
      </div>

      <!-- Навігаційне меню -->
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

        <!-- Секція управління -->
        <div class="nav-section" v-if="!collapsed">
          <div class="nav-section-header">
            <span>Управління</span>
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

      <!-- Підвал бічної панелі -->
      <div class="sidebar-footer" v-if="!collapsed">
        <div class="user-info">
          <div class="user-avatar">
            <i class="pi pi-user"></i>
          </div>
          <div class="user-details">
            <span class="user-name">Адміністратор</span>
            <span class="user-role">Системний адміністратор</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Основний контент -->
    <div class="main-content" :class="{ 'collapsed': collapsed }">
      <!-- Заголовок -->
      <header class="content-header">
        <div class="header-left">
          <h1>{{ getCurrentTitle() }}</h1>
        </div>        
      </header>

      <!-- Область контенту -->
      <div class="content-body">
        <!-- Динамічний компонент -->
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardComponent from '@/components/AdminPanel/DashboardComponent.vue'
import VolunteersComponent from '@/components/AdminPanel/VolunteersComponent.vue'
import NeedsComponent from '@/components/AdminPanel/NeedsComponent.vue'
import ProjectsComponent from '@/components/AdminPanel/ProjectsComponent.vue'
import AnalyticsComponent from '@/components/AdminPanel/AnalyticsComponent.vue'
import NotificationsComponent from '@/components/AdminPanel/NotificationsComponent.vue'
import UsersComponent from '@/components/AdminPanel/UsersComponent.vue'
import ArticlesComponent from '@/components/AdminPanel/ArticlesComponent.vue'
import SettingsComponent from '@/components/AdminPanel/SettingsComponent.vue'

export default {
  name: 'AdminPanel',
  components: {
    DashboardComponent,
    VolunteersComponent,    
    NeedsComponent,
    ProjectsComponent,
    AnalyticsComponent,
    NotificationsComponent,
    UsersComponent,
    ArticlesComponent,
    SettingsComponent
  },
  data() {
    return {
      collapsed: false,
      activeComponent: 'dashboard',
      menuItems: [
        {
          id: 1,
          label: 'Панель управління',
          icon: 'pi pi-home',
          component: 'dashboard'
        },
        {
          id: 2,
          label: 'Організації/Волонтери',
          icon: 'pi pi-users',
          component: 'volunteers',
          badge: '24'
        },        
        {
          id: 3,
          label: 'Потреби',
          icon: 'pi pi-heart',
          component: 'needs',
          badge: '15'
        },
        {
          id: 4,
          label: 'Проєкти',
          icon: 'pi pi-chart-bar',
          component: 'projects',
          badge: '12'
        },
        {
          id: 5,
          label: 'Аналітика',
          icon: 'pi pi-chart-line',
          component: 'analytics'
        },
        {
          id: 6,
          label: 'Сповіщення',
          icon: 'pi pi-bell',
          component: 'notifications',
          badge: '3'
        },
        {
          id: 7,
          label: 'Користувачі',
          icon: 'pi pi-user',
          component: 'users'
        },
        {
          id: 8,
          label: 'Статті',
          icon: 'pi pi-file-text',
          component: 'articles'
        }
      ],
      managementItems: [
        {
          id: 9,
          label: 'Налаштування',
          icon: 'pi pi-cog',
          component: 'settings'
        }
      ]
    };
  },
  computed: {
    currentComponent() {
      const componentMap = {
        dashboard: 'DashboardComponent',
        volunteers: 'VolunteersComponent',
        organizations: 'OrganizationsComponent',
        needs: 'NeedsComponent',
        projects: 'ProjectsComponent',
        analytics: 'AnalyticsComponent',
        notifications: 'NotificationsComponent',
        users: 'UsersComponent',
        articles: 'ArticlesComponent',
        settings: 'SettingsComponent'
      };
      return componentMap[this.activeComponent] || 'DashboardComponent';
    }
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
      return currentItem ? currentItem.label : 'Панель адміністратора';
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

/* Стилі бічної панелі */
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

/* Стилі навігації */
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

/* Підвал бічної панелі */
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

/* Стилі основного контенту */
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

/* Адаптивність */
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
}
</style>