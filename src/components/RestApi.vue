<template>
  <div class="container">
    <h2 class="greeting">Hello, {{ userName }}</h2>
    <div class="grid">
      <button @click="fetchImages" class="new-images-button">New Images</button>
      <img v-for="(image, index) in images" :key="index" :src="image" class="image" />
    </div>
    
  </div>
</template>

<script>
import { useMainStore } from '../store/store.js';
import { mapState } from 'pinia';

export default {
  data() {
    return { images: [] };
  },
  computed: {
    ...mapState(useMainStore, ['userName']),
  },
  created() {
    this.fetchImages();
  },
  methods: {
    async fetchImages() {
      const res = await fetch('https://dog.ceo/api/breed/dachshund/images/random/12');
      const data = await res.json();
      this.images = data.message;
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
}

.greeting {
  margin-bottom: 20px; 
  font-size: 24px; 
  text-align: left;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 2fr));
  gap: 10px; 
  margin-bottom: 20px; 
}

.image {
  width: 100%; 
  height: auto; 
  border-radius: 8px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  transition: transform 0.3s; 
}

.image:hover {
  transform: scale(1.05); 
}

.new-images-button {
  padding: 10px 15px;
  background-color: #007bff; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.new-images-button:hover {
  background-color: #0056b3; 
}
</style>