export default {
  name: 'app-bar-no-parent',
  props: {
    title: String
  },
  template:
  `<header>
    <h1>{{ title }}</h1>
  </header>`
}
