<template>
  <div class="container">
    <h2 class="greeting">Hello, {{ userName }}</h2>
    <div class="input-group">
      <input
        v-model="arrayInput"
        placeholder="Enter numbers (comma-separated)"
        class="input"
      />
      <button @click="processArray" class="submit-button">Submit</button>
    </div>
    <ul class="result-list">
      <li v-for="(count, number) in sortedArray" :key="number" class="result-item">
        {{ number }} - {{ count }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useMainStore } from '../store/store.js';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      arrayInput: '',
      arrayCounts: {},
    };
  },
  computed: {
    ...mapState(useMainStore, ['userName']),
    sortedArray() {
      const sorted = Object.entries(this.arrayCounts).sort((a, b) => b[1] - a[1] || b[0] - a[0]);
      return Object.fromEntries(sorted);
    }
  },
  methods: {
    processArray() {
      const numbers = this.arrayInput.split(',').map(Number);
      const counts = {};
      numbers.forEach(num => counts[num] = (counts[num] || 0) + 1);
      this.arrayCounts = counts;
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 20px;
  width: 500px; 
}

.greeting {
  margin-bottom: 20px; 
  font-size: 24px; 
  text-align: left;
}

.input-group {
  display: flex;
  gap: 10px; 
  margin-bottom: 20px;
}

.input {
  flex: 1; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 10px 15px;
  background-color: #007bff; 
  color: white;
  border: none; 
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.result-list {
  list-style-type: none; 
  padding: 0;
  width: 100%;
}

.result-item {
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
}
</style>