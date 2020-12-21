export default {
  name: 'exercise-item',
  props: {
    image: String,
    title: String,
    link: {
      type: String,
      default: ''
    }
  },
  template:
  `<router-link :to="link" class="card">
    <img class="header-image" :src="image" alt="preview image">
    <h3 class="m-0 p-16">{{ title }}</h3>
  </router-link>`
}
