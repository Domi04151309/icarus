import PageTabBar from '../components/page-tab-bar.js'

import Identifiers from '../helpers/identifiers.js'
import ProgressHelper from '../helpers/progress.js'

export default {
  name: 'progress_tab',
  computed: {
    name: () => localStorage.getItem('info_name'),
    dayProgress: () => ProgressHelper.calculateDayProgress(Identifiers.getDateId()) * 100,
    weekProgress: () => ProgressHelper.calculateWeekProgress(Identifiers.getDateId()) * 100,
    monthProgress: () => ProgressHelper.calculateMonthProgress(Identifiers.getDateId()) * 100
  },
  template:
  '<page-tab-bar>\
    <div class="card mb-16-p-16 intro">\
      <div class="flex center">\
        <div class="material-icons-round c-icon">waves</div>\
        <div>Welcome Back {{ name }}</div>\
      </div>\
    </div>\
    <router-link to="/progress/day" class="card mb-16-p-16">\
      <h2>Today\'s Goal <span class="material-icons-round c-icon">chevron_right</span></h2>\
      <progress max="100" :value="dayProgress"></progress>\
      <p>Your progress for today.</p>\
    </router-link>\
    <router-link to="/progress/week" class="card mb-16-p-16">\
      <h2>This Week <span class="material-icons-round c-icon">chevron_right</span></h2>\
      <progress max="100" :value="weekProgress"></progress>\
      <p>Your progress for this week.</p>\
    </router-link>\
    <router-link to="/progress/month" class="card mb-16-p-16">\
      <h2>This Month <span class="material-icons-round c-icon">chevron_right</span></h2>\
      <progress max="100" :value="monthProgress"></progress>\
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
  }
}
