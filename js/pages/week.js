import Page from '../components/page.js'

import Identifiers from '../helpers/identifiers.js'
import { DayHelper, WeekHelper } from '../helpers/progress.js'

export default {
  name: 'week',
  data() {
    return {
      dateId: '',
      readableDate: '',
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
  computed: {
    title() {
      if (this.readableDate == 'this week')
        return 'This Week\'s Progress'
      else
        return 'Progress of ' + this.readableDate
    }
  },
  template:
    `<page :title="title" parent="/progress">
      <div class="card mb-16-p-16">
        <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>
        <progress max="100" :value="total"></progress>
        <p>This is your general progress for {{ readableDate }}. It combines your progress of the sections below.</p>
      </div>
      <div class="card mb-16-p-16">
        <h2>Daily View <span class="material-icons-round c-icon">pending_actions</span></h2>
        <div class="flex vertical-container">
          <progress v-for="(item, index) in week" :key="index" class="vertical" max="100" :value="item"></progress>
        </div>
        <div class="flex space">
          <p>S</p>
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>T</p>
          <p>F</p>
          <p>S</p>
        </div>
      </div>
      <div class="card mb-16-p-16">
        <h2>Compared to Last Week <span class="material-icons-round c-icon">sync_alt</span></h2>
        <div class="grid-3">
          <p class="progress-text mt-8 mb-16">Last Week</p>
          <span></span>
          <p class="progress-text mt-8 mb-16">This Week</p>
          <progress class="reverse mb-16" max="100" :value="lastWater"></progress>
          <p class="progress-text">Water</p>
          <progress class="mb-16" max="100" :value="water"></progress>
          <progress class="reverse mb-16 indigo" max="100" :value="lastFood"></progress>
          <p class="progress-text">Food</p>
          <progress class="mb-16 indigo" max="100" :value="food"></progress>
          <progress class="reverse mb-16 red" max="100" :value="lastExercises"></progress>
          <p class="progress-text">Exercices</p>
          <progress class="mb-16 red" max="100" :value="exercises"></progress>
          <progress class="reverse mb-16 deep-orange" max="100" :value="lastSleep"></progress>
          <p class="progress-text">Sleep</p>
          <progress class="mb-16 deep-orange" max="100" :value="sleep"></progress>
        </div>
      </div>
    </page>`,
  components: {
    Page
  },
  mounted() {
    var dateString = this.$route.query.date
    if (dateString == null) {
      this.dateId = Identifiers.getDateId()
      this.readableDate = 'this week'
    } else {
      this.dateId = dateString
      this.readableDate = dateString.substring(6, 8) + '/' + dateString.substring(4, 6) + '/' + dateString.substring(0, 4)
    }

    var weekHelper = new WeekHelper(this.dateId)
    this.total = weekHelper.getProgress() * 100

    var dayHelper = null
    var i = 0
    weekHelper.forDayInWeek(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      this.week[i] = dayHelper.getProgress() * 100
      i++
    })

    this.water = weekHelper.getWaterProgress() * 100
    this.food = weekHelper.getFoodProgress() * 100
    this.exercises = weekHelper.getExercisesProgress() * 100
    this.sleep = weekHelper.getSleepProgress() * 100

    var lastWeek = Identifiers.dateIdToDate(this.dateId)
    lastWeek.setTime(lastWeek.getTime() - (7 * 24 * 3600000))
    weekHelper = new WeekHelper(Identifiers.getDateId(lastWeek))

    this.lastWater = weekHelper.getWaterProgress() * 100
    this.lastFood = weekHelper.getFoodProgress() * 100
    this.lastExercises = weekHelper.getExercisesProgress() * 100
    this.lastSleep = weekHelper.getSleepProgress() * 100
  }
}
