<template>
  <div class="landing-page">
    <div class="hero">
      <h1>Romantic Lane</h1>
      <p>Create and share interactive romantic stories with your partner.</p>
      <button class="login-btn" @click="login">Login with Google</button>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { syncUser } from '../services/modules/user';

const router = useRouter();
const auth = getAuth();
const provider = new GoogleAuthProvider();

const login = async () => {
  try {
    await signInWithPopup(auth, provider);
    
    // Sinkronisasi data user Firebase (yang ada di token) ke PostgreSQL Backend
    const syncResponse = await syncUser();
    
    if (syncResponse && syncResponse.data) {
      localStorage.setItem('user_cache', JSON.stringify(syncResponse.data));
    }
    
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed', error);
  }
};
</script>

<style scoped>
.landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--color-bg-dark);
  color: white;
}

.hero {
  text-align: center;
}

h1 {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.login-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.login-btn:hover {
  transform: translateY(-2px);
  background-color: var(--color-secondary);
}
</style>
