export default {
  name: 'tab-bar',
  props: ['tabs'],
  template:
  '<footer>\
    <router-link class="tab" v-for="tab in tabs" :to="tab.url">\
      <span class="material-icons block">{{ tab.icon }}</span>\
      <span>{{ tab.title }}</span>\
    </router-link>\
  </footer>'
}
