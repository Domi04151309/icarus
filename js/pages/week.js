import Page from '../components/page.js'

import Identifiers from '../helpers/identifiers.js'
import ProgressHelper from '../helpers/progress.js'

export default {
  name: 'week',
  data() {
    return {
      title: 'This Week\'s Progress',
      dateId: '',
      total: 0,
      week: [0, 0, 0, 0, 0, 0, 0],
      water: 0,
      food: 0,
      exercises: 0,
      sleep: 0,
      lastWater: 0,
      lastFood: 0,
      lastExercises: 0,
      lastSleep: 0
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
          <progress class="reverse mb-16" max="100" :value="lastWater"></progress>\
          <p class="progress-text">Water</p>\
          <progress class="mb-16" max="100" :value="water"></progress>\
          <progress class="reverse mb-16 indigo" max="100" :value="lastFood"></progress>\
          <p class="progress-text">Food</p>\
          <progress class="mb-16 indigo" max="100" :value="food"></progress>\
          <progress class="reverse mb-16 red" max="100" :value="lastExercises"></progress>\
          <p class="progress-text">Exercices</p>\
          <progress class="mb-16 red" max="100" :value="exercises"></progress>\
          <progress class="reverse mb-16 deep-orange" max="100" :value="lastSleep"></progress>\
          <p class="progress-text">Sleep</p>\
          <progress class="mb-16 deep-orange" max="100" :value="sleep"></progress>\
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

    this.water = ProgressHelper.calculateWeekWaterProgress(this.dateId) * 100
    this.food = ProgressHelper.calculateWeekFoodProgress(this.dateId) * 100
    this.exercises = ProgressHelper.calculateWeekExercisesProgress(this.dateId) * 100
    this.sleep = ProgressHelper.calculateWeekSleepProgress(this.dateId) * 100

    var lastWeek = Identifiers.dateIdToDate(this.dateId)
    lastWeek.setDate(lastWeek.getDate() - 7)
    lastWeek = Identifiers.getDateId(lastWeek)

    this.lastWater = ProgressHelper.calculateWeekWaterProgress(lastWeek) * 100
    this.lastFood = ProgressHelper.calculateWeekFoodProgress(lastWeek) * 100
    this.lastExercises = ProgressHelper.calculateWeekExercisesProgress(lastWeek) * 100
    this.lastSleep = ProgressHelper.calculateWeekSleepProgress(lastWeek) * 100
  }
}
