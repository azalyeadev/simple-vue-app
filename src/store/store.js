import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    appName: "My Vue App",
    userName: "",
    darkMode: false,
  }),
  actions: {
    setUserName(name) {
        this.userName = name;
    },
    toggleMode() {
      this.darkMode = !this.darkMode;
    }
  }
});
