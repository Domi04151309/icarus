export default {
  name: 'icon-item',
  props: {
    icon: String,
    title: String,
    summary: String,
    link: {
      type: String,
      default: ''
    }
  },
  template:
  `<router-link :to="link" class="card mb-16-p-16 flex center text-start">
    <div class="material-icons-round big-c-icon">{{ icon }}</div>
    <div>
      <h2 class="m-0 mt-2">{{ title }}</h2>
      <p>{{ summary }}</p>
    </div>
  </router-link>`
}
