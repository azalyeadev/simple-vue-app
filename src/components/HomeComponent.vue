<template>
  <div class="container">
    <label for="name" class="label">Name:</label>
    <input
      type="text"
      id="name"
      v-model="userName"
      @input="updateUserName"
      placeholder="Enter your name"
      class="input"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useMainStore } from '../store/store.js';

export default {
  setup() {
    const store = useMainStore(); 
    const userName = ref(''); 

    const updateUserName = () => {
      store.setUserName(userName.value); 
    };

    return {
      userName,
      updateUserName,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 500px;
}

.label {
  font-weight: bold;
  margin-bottom: 8px;
}

.input {
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
  transition: border-color 0.3s;
  width: 100%;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}
</style>