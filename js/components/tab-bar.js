export default {
  name: 'tab-bar',
  props: ['tabs'],
  template:
  '<footer>\
    <router-link class="tab" v-for="tab in tabs" :key="tab.url" :to="tab.url">\
      <span class="material-icons-round block" :aria-label="tab.title">{{ tab.icon }}</span>\
    </router-link>\
  </footer>',
  created() {

  console.info('App currentRoute:', this.$router.currentRoute)
  }
}
