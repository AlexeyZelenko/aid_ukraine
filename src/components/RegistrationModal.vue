<template>
  <div class="registration-modal">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Submit</button>
    </form>
    <button @click="registerWithGoogle">Register with Google</button>
    <button @click="registerWithFacebook">Register with Facebook</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auth, googleProvider, facebookProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

const username = ref('');
const password = ref('');

const register = () => {
  console.log('Registering:', username.value, password.value);
  // Add registration logic here
};

const registerWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign-in successful:', result);
  } catch (error) {
    console.error('Google sign-in error:', error);
  }
};

const registerWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log('Facebook sign-in successful:', result);
  } catch (error) {
    console.error('Facebook sign-in error:', error);
  }
};
</script>

<style scoped>
.registration-modal {
  /* Add styles for the modal */
}
</style>