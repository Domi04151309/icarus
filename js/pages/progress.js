import PageTabBar from '../components/page-tab-bar.js'

export default {
  name: 'progress',
  template:
  '<page-tab-bar>\
    <router-link to="/progress/today" class="card mb-16-p-16">\
      <h2>Today\'s Goal <span class="material-icons-round c-icon">chevron_right</span></h2>\
      <progress max="100" value="33"></progress>\
      <p>Your progress for today.</p>\
    </router-link>\
    <router-link to="/progress/week" class="card mb-16-p-16">\
      <h2>This Week <span class="material-icons-round c-icon">chevron_right</span></h2>\
      <progress max="100" value="66"></progress>\
      <p>Your progress for this week.</p>\
    </router-link>\
    <router-link to="/progress/month" class="card mb-16-p-16">\
      <h2>This Month <span class="material-icons-round c-icon">chevron_right</span></h2>\
      <progress max="100" value="33"></progress>\
      <p>Your progress for this month.</p>\
    </router-link>\
  </page-tab-bar>',
  components: {
      PageTabBar
  }
}
