import Page from '../components/page.js'
import ProgressSections from '../components/progress-sections.js'

import Identifiers from '../helpers/identifiers.js'
import { WeekHelper, MonthHelper } from '../helpers/progress.js'

export default {
  name: 'about',
  data() {
    return {
      readableDate: '',
      helper: { },
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
      <progress-sections
        :s1="helper.getSleepProgress()"
        :s2="helper.getWaterProgress()"
        :s3="helper.getFoodProgress()"
        :s4="helper.getExerciseProgress()">
      </progress-sections>
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
        <progress class="reverse mb-16 deep-purple" max="100" :value="lastSleep"></progress>
        <p class="progress-text">Sleep</p>
        <progress class="mb-16 deep-purple" max="100" :value="sleep"></progress>
        <progress class="reverse mb-16 indigo" max="100" :value="lastWater"></progress>
        <p class="progress-text">Water</p>
        <progress class="mb-16 indigo" max="100" :value="water"></progress>
        <progress class="reverse mb-16 green" max="100" :value="lastFood"></progress>
        <p class="progress-text">Food</p>
        <progress class="mb-16 green" max="100" :value="food"></progress>
        <progress class="reverse mb-16 red" max="100" :value="lastExercises"></progress>
        <p class="progress-text">Exercices</p>
        <progress class="mb-16 red" max="100" :value="exercises"></progress>
      </div>
    </div>
  </page>`,
  components: {
      Page,
      ProgressSections
  },
  created() {
    const dateString = this.$route.query.date
    let dateId = null
    if (dateString == null) {
      dateId = Identifiers.getDateId()
      this.readableDate = 'this month'
    } else {
      dateId = dateString
      this.readableDate = dateString.substring(4, 6) + '/' + dateString.substring(0, 4)
    }

    const lastMonth = Identifiers.dateIdToDate(dateId)
    if (lastMonth.getMonth() == 0) {
      lastMonth.setYear(lastMonth.getYear() - 1)
      lastMonth.setMonth(11)
    }
    else lastMonth.setMonth(lastMonth.getMonth() - 1)
    this.helper = new MonthHelper(Identifiers.getDateId(lastMonth))

    this.lastWater = this.helper.getWaterProgress() * 100
    this.lastFood = this.helper.getFoodProgress() * 100
    this.lastExercises = this.helper.getExerciseProgress() * 100
    this.lastSleep = this.helper.getSleepProgress() * 100

    this.helper = new MonthHelper(dateId)

    let weekHelper = null
    let i = 7
    this.helper.forDayInMonth(date => {
      if (i == 7) {
        weekHelper = new WeekHelper(Identifiers.getDateId(date))
        this.month.push(weekHelper.getProgress() * 100)
        i = 0
      }
      i++
    })

    this.water = this.helper.getWaterProgress() * 100
    this.food = this.helper.getFoodProgress() * 100
    this.exercises = this.helper.getExerciseProgress() * 100
    this.sleep = this.helper.getSleepProgress() * 100
  }
}
