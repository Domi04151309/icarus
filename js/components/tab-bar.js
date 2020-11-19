export default {
  name: 'tab-bar',
  props: ['tabs'],
  template:
  '<footer>\
    <a class="tab" v-for="tab in tabs">\
      <span class="material-icons block">{{ tab.icon }}</span>\
      <span>{{ tab.title }}</span>\
    </a>\
  </footer>'
}
