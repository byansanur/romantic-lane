import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
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
  const user = await getCurrentUser();
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      console.warn('Navigation Guard: Unauthorized. Redirecting to Login.');
      next({ name: 'Login' });
    }
  } else if ((to.name === 'Login' || to.name === 'LandingPage') && user) {
    // Optional: If user is logged in, you might want to redirect them from Landing/Login to Dashboard automatically.
    // Since the bug specifically mentions clicking 'create story' goes to login, redirecting them from Login is perfect.
    if (to.name === 'Login') {
      next({ name: 'Dashboard' });
    } else {
      next(); // allow seeing LandingPage, but login buttons will route to dashboard
    }
  } else {
    next();
  }
});

export default router;
