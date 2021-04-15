import Page from '../components/page.js'

import Identifiers from '../helpers/identifiers.js'
import { WeekHelper, MonthHelper } from '../helpers/progress.js'

export default {
  name: 'about',
  data() {
    return {
      readableDate: '',
      total: 0,
      month: [],
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
      if (this.readableDate == 'this month')
        return 'This Month\'s Progress'
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
      <h2>Weekly View <span class="material-icons-round c-icon">pending_actions</span></h2>
      <div class="flex vertical-container">
        <progress v-for="(item, index) in month" :key="index" class="vertical" max="100" :value="item"></progress>
      </div>
      <div class="flex space">
        <p v-for="(item, index) in month" :key="index">{{ index + 1 }}</p>
      </div>
    </div>
    <div class="card mb-16-p-16">
      <h2>Compared to Last Month <span class="material-icons-round c-icon">sync_alt</span></h2>
      <div class="grid-3">
        <p class="progress-text mt-8 mb-16">Last Month</p>
        <span></span>
        <p class="progress-text mt-8 mb-16">This Month</p>
        <progress class="reverse mb-16" max="100" :value="lastWater"></progress>
        <p class="progress-text">Water</p>
        <progress class="mb-16" max="100" :value="water"></progress>
        <progress class="reverse mb-16 light-green" max="100" :value="lastFood"></progress>
        <p class="progress-text">Food</p>
        <progress class="mb-16 light-green" max="100" :value="food"></progress>
        <progress class="reverse mb-16 red" max="100" :value="lastExercises"></progress>
        <p class="progress-text">Exercices</p>
        <progress class="mb-16 red" max="100" :value="exercises"></progress>
        <progress class="reverse mb-16 light-blue" max="100" :value="lastSleep"></progress>
        <p class="progress-text">Sleep</p>
        <progress class="mb-16 light-blue" max="100" :value="sleep"></progress>
      </div>
    </div>
  </page>`,
  components: {
      Page
  },
  created() {
    var dateString = this.$route.query.date
    var dateId = null
    if (dateString == null) {
      dateId = Identifiers.getDateId()
      this.readableDate = 'this month'
    } else {
      dateId = dateString
      this.readableDate = dateString.substring(4, 6) + '/' + dateString.substring(0, 4)
    }

    var monthHelper = new MonthHelper(dateId)
    this.total = monthHelper.getProgress() * 100

    var weekHelper = null
    var i = 7
    monthHelper.forDayInMonth(date => {
      if (i == 7) {
        weekHelper = new WeekHelper(Identifiers.getDateId(date))
        this.month.push(weekHelper.getProgress() * 100)
        i = 0
      }
      i++
    })

    this.water = monthHelper.getWaterProgress() * 100
    this.food = monthHelper.getFoodProgress() * 100
    this.exercises = monthHelper.getExercisesProgress() * 100
    this.sleep = monthHelper.getSleepProgress() * 100

    var lastMonth = Identifiers.dateIdToDate(dateId)
    if (lastMonth.getMonth() == 0) {
      lastMonth.setYear(lastMonth.getYear() - 1)
      lastMonth.setMonth(11)
    }
    else lastMonth.setMonth(lastMonth.getMonth() - 1)
    monthHelper = new MonthHelper(Identifiers.getDateId(lastMonth))

    this.lastWater = monthHelper.getWaterProgress() * 100
    this.lastFood = monthHelper.getFoodProgress() * 100
    this.lastExercises = monthHelper.getExercisesProgress() * 100
    this.lastSleep = monthHelper.getSleepProgress() * 100
  }
}
