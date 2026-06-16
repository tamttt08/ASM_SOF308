import { createRouter, createWebHistory } from 'vue-router';

// IMPORT TẤT CẢ CÁC TRANG TỪ THƯ MỤC COMPONENTS
import AsmHome from '../components/AsmHome.vue';
import AsmAdmin from '../components/AsmAdmin.vue';
import AsmCreate from '../components/AsmCreate.vue';
import AsmProfile from '../components/AsmProfile.vue';
import AsmLogin from '../components/AsmLogin.vue';
import AsmRegister from '../components/AsmRegister.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AsmHome
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AsmAdmin
  },
  {
    path: '/create',
    name: 'Create',
    component: AsmCreate
  },
  {
    path: '/profile',
    name: 'Profile',
    component: AsmProfile
  },
  {
    path: '/login',
    name: 'Login',
    component: AsmLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: AsmRegister
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;