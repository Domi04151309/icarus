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
  `<router-link :to="link" class="card exercise img-card">
    <img :src="image" alt="preview image">
    <div class="overlay"></div>
    <h2 class="m-0 p-16">{{ title }}</h2>
  </router-link>`
}
