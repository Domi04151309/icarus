import Page from '../components/page.js'

export default {
  name: 'about',
  data: function() {
    return {
      title: "This Month\'s Progress"
    }
  },
  template:
  '<page :title="title" parent="/progress">\
    <h2>This Month</h2>\
  </page>',
  components: {
      Page
  }
}
