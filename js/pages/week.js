import Page from '../components/page.js'

import Identifiers from '../helpers/identifiers.js'
import ProgressHelper from '../helpers/progress.js'

//TODO: Comparison to last week

export default {
  name: 'week',
  data() {
    return {
      title: 'This Week\'s Progress',
      dateId: '',
      total: 0,
      week: [0, 0, 0, 0, 0, 0, 0]
    }
  },
  template:
    '<page :title="title" parent="/progress">\
      <div class="card mb-16-p-16">\
        <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>\
        <progress max="100" :value="total"></progress>\
        <p>This is your general progress for this week. It combines your progress of the sections below.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Daily View <span class="material-icons-round c-icon">pending_actions</span></h2>\
        <div class="flex vertical-container">\
          <progress class="vertical" max="100" :value="week[0]"></progress>\
          <progress class="vertical" max="100" :value="week[1]"></progress>\
          <progress class="vertical" max="100" :value="week[2]"></progress>\
          <progress class="vertical" max="100" :value="week[3]"></progress>\
          <progress class="vertical" max="100" :value="week[4]"></progress>\
          <progress class="vertical" max="100" :value="week[5]"></progress>\
          <progress class="vertical" max="100" :value="week[6]"></progress>\
        </div>\
        <div class="flex space">\
          <p>S</p>\
          <p>M</p>\
          <p>T</p>\
          <p>W</p>\
          <p>T</p>\
          <p>F</p>\
          <p>S</p>\
        </div>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Compared to Last Week <span class="material-icons-round c-icon">sync_alt</span></h2>\
        <div class="grid-3">\
          <p class="progress-text mt-8 mb-16">Last Week</p>\
          <span></span>\
          <p class="progress-text mt-8 mb-16">This Week</p>\
          <progress class="reverse mb-16" max="100" value="33"></progress>\
          <p class="progress-text">Water</p>\
          <progress class="mb-16" max="100" value="33"></progress>\
          <progress class="reverse mb-16 indigo" max="100" value="33"></progress>\
          <p class="progress-text">Food</p>\
          <progress class="mb-16 indigo" max="100" value="33"></progress>\
          <progress class="reverse mb-16 red" max="100" value="33"></progress>\
          <p class="progress-text">Exercices</p>\
          <progress class="mb-16 red" max="100" value="33"></progress>\
          <progress class="reverse mb-16 deep-orange" max="100" value="33"></progress>\
          <p class="progress-text">Sleep</p>\
          <progress class="mb-16 deep-orange" max="100" value="33"></progress>\
        </div>\
      </div>\
    </page>',
  components: {
    Page
  },
  mounted() {
    var dateString = this.$route.query.date
    if (dateString == null) {
      this.dateId = Identifiers.getDateId()
    } else {
      this.dateId = dateString
    }
    this.total = ProgressHelper.calculateWeekProgress(this.dateId) * 100

    var date = Identifiers.dateIdToDate(this.dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (var i = 0; i < 7; i++) {
      this.week[i] = ProgressHelper.calculateDayProgress(Identifiers.getDateId(date)) * 100
      date.setDate(date.getDate() + 1)
    }
  }
}
