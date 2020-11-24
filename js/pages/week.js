import Page from '../components/page.js'

export default {
  name: 'week',
  data: function() {
    return {
      title: "This Week\'s Progress"
    }
  },
  template:
    '<page :title="title" parent="/progress">\
      <div class="card mb-16-p-16">\
        <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>\
        <progress max="100" value="65"></progress>\
        <p>This is your general progress for today. It combines your progress of the sections below.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Daily View <span class="material-icons-round c-icon">view_week</span></h2>\
        <p>TODO: Add vertical bars</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Compared to Last Week <span class="material-icons-round c-icon">compare_arrows</span></h2>\
        <p>TODO: Add improvement table</p>\
      </div>\
    </page>',
  components: {
    Page
  }
}
