import PageTabBar from '../components/page-tab-bar.js'

export default {
  name: 'progress_tab',
  data () {
    return {
      name: ''
    }
  },
  template:
  '<page-tab-bar>\
    <div class="card mb-16-p-16 intro">\
      <p><span class="material-icons-round c-icon">waves</span>Welcome Back {{ name }}</p>\
    </div>\
    <router-link to="/progress/day" class="card mb-16-p-16">\
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
    <router-link to="/progress/calendar" class="card mb-16-p-16">\
      <h2>Calendar <span class="material-icons-round c-icon">chevron_right</span></h2>\
      <progress></progress>\
      <p>View the progress of another day, week, or month</p>\
    </router-link>\
  </page-tab-bar>',
  components: {
      PageTabBar
  },
  mounted () {
    this.name = localStorage.getItem('info_name')
  }
}
