import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/create',
    name: 'CreateStory',
    component: () => import('../views/StoryWizard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/to/:slug',
    name: 'StoryViewer',
    component: () => import('../views/StoryView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Helper to wait for firebase auth state to initialize
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      console.warn('Navigation Guard: Unauthorized. Redirecting to Landing Page.');
      next({ name: 'LandingPage' });
    }
  } else {
    next();
  }
});

export default router;
