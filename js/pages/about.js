import Page from '../components/page.js'

export default {
  name: 'about',
  data: function() {
    return {
      title: "About"
    }
  },
  template:
  '<page :title="title" parent="/account">\
    <h2>Dummy Content</h2>\
  </page>',
  components: {
      Page
  }
}
