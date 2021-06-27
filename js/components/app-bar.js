export default {
  name: 'app-bar',
  props: {
    title: String,
    parent: String
  },
  template:
  `<header>
    <router-link :to="parent ? parent : '/progress'">
      <span class="material-icons-round nav-icon" role="button" aria-label="Back">{{ parent ? 'arrow_back' : 'close' }}</span>
    </router-link>
    <h1 class="with-nav-icon">{{ title }}</h1>
  </header>`
}
