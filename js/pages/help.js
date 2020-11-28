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
    <div class="card mb-16-p-16 intro text-center">\
      <h2>Coming soon...</h2>\
    </div>\
  </page>',
  components: {
      Page
  }
}
