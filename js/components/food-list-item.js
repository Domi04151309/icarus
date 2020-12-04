export default {
  name: 'food-list-item',
  props: {
    icon: String,
    title: String
  },
  template:
  '<div class="card p-16">\
    <span class="material-icons-round accent">{{ icon }}</span>\
    <h3 class="mt-8">{{ title }}</h3>\
  </div>'
}
