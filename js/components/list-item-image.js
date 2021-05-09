export default {
  name: 'list-item-image',
  props: {
    image: String,
    title: String,
    link: {
      type: String,
      default: ''
    }
  },
  template:
  `<router-link :to="link" class="card food img-card">
    <img class="" :src="image" alt="preview image">
    <div class="overlay"></div>
    <h2 class="m-0 p-16">{{ title }}</h2>
  </router-link>`
}
