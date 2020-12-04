import AppBar from './app-bar.js'

export default {
  name: 'page',
  props: {
    title: String,
    parent: String
  },
  template:
  '<div>\
    <app-bar :title="title" :parent="parent"></app-bar>\
    <main class="with app-bar">\
      <transition name="fade-in">\
        <div>\
          <slot></slot>\
        </div>\
      </transition>\
    </main>\
  </div>',
  components: {
    AppBar
  }
}
