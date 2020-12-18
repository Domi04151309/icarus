export default {
  name: 'tab-bar',
  props: {
    tabs: Array
  },
  template:
  `<footer>
    <router-link class="tab" v-for="tab in tabs" :key="tab.url" :to="tab.url">
      <span class="material-icons-round" :aria-label="tab.title">{{ tab.icon }}</span>
    </router-link>
  </footer>`
}
