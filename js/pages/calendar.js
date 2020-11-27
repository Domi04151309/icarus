import Page from '../components/page.js'

export default {
  name: 'calendar',
  data: function() {
    return {
      title: "Calendar"
    }
  },
  template:
  '<page :title="title" parent="/progress">\
    <div class="card mb-16-p-16 intro text-center">\
      <h2>Coming soon...</h2>\
    </div>\
  </page>',
  components: {
      Page
  }
}
