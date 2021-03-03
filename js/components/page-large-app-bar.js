export default {
  name: 'page-large-app-bar',
  props: {
    title: String,
    parent: String
  },
  template:
  `<div class="large-app-bar">
    <header>
      <router-link :to="parent">
        <span class="material-icons-round transparent nav-icon" aria-label="Back">arrow_back</span>
      </router-link>
    </header>
    <h2 class="large-app-bar">{{ title }}</h2>
    <main class="large-app-bar zoom-in-animation">
      <slot></slot>
    </main>
  </div>`
}
