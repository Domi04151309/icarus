import PageTabBar from '../../components/page-tab-bar.js'

import Identifiers from '../../helpers/identifiers.js'
import { DayHelper, WeekHelper, MonthHelper } from '../../helpers/progress.js'

export default {
  name: 'progress_tab',
  computed: {
    name: () => localStorage.getItem('info_name'),
    dayProgress: () => {
      var helper = new DayHelper(Identifiers.getDateId())
      return helper.getProgress() * 100
    },
    weekProgress: () => {
      var helper = new WeekHelper(Identifiers.getDateId())
      return helper.getProgress() * 100
    },
    monthProgress: () => {
      var helper = new MonthHelper(Identifiers.getDateId())
      return helper.getProgress() * 100
    }
  },
  template:
  `<page-tab-bar>
    <div class="mt-16 mx-8 material-icons-round big accent">waves</div>
    <h2 class="mx-8 secondary-title">Welcome Back {{ name }}</h2>
    <p class="mt-0 mb-48 mx-8">Keep going! You're doing awesome!</p>
    <router-link to="/progress/day" class="card mb-16-p-16">
      <h2>Today's Goals</h2>
      <progress max="100" :value="dayProgress"></progress>
      <p>Your progress for today.</p>
    </router-link>
    <div class="grid-2 gap-16">
      <router-link to="/progress/week" class="card mb-16-p-16">
        <h2>This Week</h2>
        <progress max="100" :value="weekProgress"></progress>
        <p>Your progress for this week.</p>
      </router-link>
      <router-link to="/progress/month" class="card mb-16-p-16">
        <h2>This Month</h2>
        <progress max="100" :value="monthProgress"></progress>
        <p>Your progress for this month.</p>
      </router-link>
    </div>
    <router-link to="/progress/calendar" class="card mb-16-p-16 flex center">
      <div class="material-icons-round big-c-icon">calendar_today</div>
      <div>
        <h2 class="m-0">Calendar</h2>
        <p>View the progress of another day, week, or month</p>
      </div>
    </router-link>
  </page-tab-bar>`,
  components: {
      PageTabBar
  }
}
