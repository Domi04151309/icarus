import Page from '../components/page.js'

export default {
  name: 'preferences',
  data: function() {
    return {
      title: "Preferences"
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
