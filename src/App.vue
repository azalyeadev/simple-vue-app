<template>
  <div :class="darkModeClass">
    <header>
      <h1 class="app-name">{{ appName }}</h1>
      <button @click="toggleMode" class="mode-toggle">{{ modeLabel }}</button>
    </header>
    <div class="main-layout">
      <nav class="sidebar">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/arrays" :class="['nav-link', { disabled: !userName }]">I love Arrays</router-link>
        <router-link to="/rest-api" :class="['nav-link', { disabled: !userName }]">REST API</router-link>
        <router-link class="nav-link" to="/gauge-chart">Gauge Chart</router-link>
        <router-link class="nav-link" to="/multi-chart">Multi-Column Chart</router-link>
      </nav>
      <main class="content">
        <HomeComponent @input="updateUserName" />
        <router-view></router-view> 
      </main>
    </div>
  </div>
</template>

<script>
import { useMainStore } from './store/store.js';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(useMainStore, ['appName', 'userName', 'darkMode']),
    darkModeClass() {
      return this.darkMode ? 'dark' : 'light';
    },
    modeLabel() {
      return this.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  },
  methods: {
    ...mapActions(useMainStore, ['toggleMode']),
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.main-layout { 
  display: flex; 
  min-height: calc(100vh - 60px);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--header-bg-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.app-name {
  margin: 0; 
  font-size: 1.5rem;
}

.mode-toggle {
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px; 
  transition: background-color 0.3s;
}

.mode-toggle:hover {
  background-color: #0056b3; 
}

.sidebar { 
  width: 220px; 
  padding: 20px;
  border-right: 1px solid rgb(221 221 221 / 35%);
  background-color: var(--sidebar-bg-color); 
}

.nav-link {
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: inherit;
  padding: 8px; 
  border-radius: 4px; 
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(0, 123, 255, 0.1); 
}

.disabled { 
  pointer-events: none; 
  opacity: 0.5; 
}

.light { 
  background-color: white; 
  color: black; 
}

.dark { 
  background-color: black; 
  color: white; 
}

.content {
  flex: 1; 
  padding: 20px; 
}
</style>