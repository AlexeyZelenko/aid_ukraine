<template>
  <div class="registration-modal">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const register = () => {
  console.log('Registering:', username.value, password.value);
  // Add registration logic here
};
</script>

<style scoped>
.registration-modal {
  /* Add styles for the modal */
}
</style>