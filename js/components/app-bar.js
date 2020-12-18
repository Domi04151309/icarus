export default {
  name: 'app-bar',
  props: {
    title: String,
    parent: String
  },
  template:
  `<header>
    <router-link :to="parent">
      <span class="material-icons-round nav-icon" aria-label="Back">arrow_back</span>
    </router-link>
    <h1 class="with-nav-icon">{{ title }}</h1>
  </header>`
}
