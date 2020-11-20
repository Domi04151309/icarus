import Page from '../components/page.js'

export default {
  name: 'help',
  data: function() {
    return {
      title: "Help"
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
