//TODO: Replace with generic modal

export default {
  name: 'modal-theme',
  template:
  `<div class="modal-container">
    <div class="modal-background" v-on:click="close()"></div>
    <div class="modal-content card">
      <h2>Change Theme</h2>
      <p>Switch to a theme you prefer</p>
      <div class="flex space">
        <button v-on:click="setTheme('auto')" type="button">Auto</button>
        <button v-on:click="setTheme('light')" type="button">Light</button>
        <button v-on:click="setTheme('dark')" type="button">Dark</button>
      </div>
      <div class="button-bar">
        <button v-on:click="close()" type="button">Ok</button>
      </div>
    </div>
  </div>`,
  methods: {
    setTheme(theme) {
      localStorage.setItem('theme', theme)
      var darkTheme = undefined
      switch (theme) {
        case 'auto':
          darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          break
        case 'light':
          darkTheme = false
          break
        case 'dark':
          darkTheme = true
          break
      }
      document.documentElement.classList.toggle('dark-theme', darkTheme)
    },
    close() {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
