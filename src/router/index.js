import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Volunteers from '../views/Volunteers.vue';
import Needs from '../views/Needs.vue';
import Financial from '../views/Financial.vue';
import Map from '../views/Map.vue';
import Blog from '../views/Blog.vue';
import Articles from '../views/Articles.vue';
import BlogTopicDetail from '../components/Blog/BlogTopicDetail.vue';
import BlogGuide from '../views/BlogGuide.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import About from '../views/About.vue';
import NeedDetail from '../views/NeedDetail.vue';
import VolunteerProfile from '../views/VolunteerProfile.vue';
import AdminPanel from '../views/AdminPanel.vue';
import VolunteerRegistration from '../views/VolunteerRegistration.vue';
import ChurchRegistration from '../views/ChurchRegistration.vue';
import { useAuthStore } from '../stores/auth'; // Add this line

var router = createRouter({
    history: createWebHistory(),
    // Глобальний скрол до верху при переході на нову сторінку
    scrollBehavior(to, from, savedPosition) {
        // Якщо є збережена позиція (наприклад, при поверненні назад), використовуємо її
        if (savedPosition) {
            return savedPosition;
        }
        // Якщо є якір в URL (#section), скролимо до нього
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            };
        }
        // В усіх інших випадках скролимо до верху
        return {
            top: 0,
            behavior: 'smooth'
        };
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/volunteers',
            name: 'volunteers',
            component: Volunteers
        },
        {
            path: '/needs',
            name: 'needs',
            component: Needs
        },
        {
            path: '/financial',
            name: 'financial',
            component: Financial
        },
        {
            path: '/map',
            name: 'map',
            component: Map
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog
        },
        {
            path: '/blog/:id',
            name: 'blog-detail',
            component: BlogTopicDetail,
            props: true
        },
        {
            path: '/blog-guide',
            name: 'blog-guide',
            component: BlogGuide
        },
        {
            path: '/articles',
            name: 'articles',
            component: Articles
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/need/:id',
            name: 'NeedDetail',
            component: NeedDetail,
            props: true
        },
        {
            path: '/volunteers/:id',
            name: 'VolunteerProfile',
            component: VolunteerProfile,
            props: true
        },
        {
            path: '/volunteers/projects/:id',
            name: 'organization-projects',
            component: () => import('../views/VolunteerProjects.vue'),
            props: true
        },
        {
            path: '/volunteer-registration',
            name: 'volunteer-registration',
            component: VolunteerRegistration
        },
        {
            path: '/church-registration',
            name: 'church-registration',
            component: ChurchRegistration,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminPanel,
            meta: { requiresAuth: true, adminOnly: true } // Add this line for route protection
        }
    ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const adminOnly = to.matched.some(record => record.meta.adminOnly);

    if (requiresAuth && !authStore.user) {
        next('/login');
    } else if (adminOnly && authStore.user.uid !== '5C4AFwtxF1TpyQEdGXEKPfDk2K73') {
        next('/'); // Redirect to home if not admin
    } else {
        next();
    }
});

// Додатковий guard для забезпечення скролу до верху
router.afterEach((to, from) => {
    // Використовуємо nextTick для забезпечення того, що DOM оновився
    setTimeout(() => {
        // Якщо немає якоря в URL, скролимо до верху
        if (!to.hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }, 100); // Невелика затримка для забезпечення завершення рендерингу
});

export default router;
