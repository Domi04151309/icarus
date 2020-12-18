import Page from '../components/page.js'

import Identifiers from '../helpers/identifiers.js'
import { MonthHelper } from '../helpers/progress.js'

//TODO: Dynamically generate content

export default {
  name: 'about',
  data() {
    return {
      title: 'This Month\'s Progress',
      dateId: '',
      total: 0,
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
  `<page :title="title" parent="/progress">
    <div class="card mb-16-p-16">
      <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>
      <progress max="100" :value="total"></progress>
      <p>This is your general progress for this month. It combines your progress of the sections below.</p>
    </div>
    <div class="card mb-16-p-16">
      <h2>Weekly View <span class="material-icons-round c-icon">pending_actions</span></h2>
      <div class="flex vertical-container">
        <progress class="vertical" max="100" value="33"></progress>
        <progress class="vertical" max="100" value="33"></progress>
        <progress class="vertical" max="100" value="33"></progress>
        <progress class="vertical" max="100" value="33"></progress>
        <progress class="vertical" max="100" value="33"></progress>
      </div>
      <div class="flex space">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
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
    } else {
      this.dateId = dateString
    }

    var monthHelper = new MonthHelper(this.dateId)
    this.total = monthHelper.getProgress() * 100

    this.water = monthHelper.getWaterProgress() * 100
    this.food = monthHelper.getFoodProgress() * 100
    this.exercises = monthHelper.getExercisesProgress() * 100
    this.sleep = monthHelper.getSleepProgress() * 100

    var lastMonth = Identifiers.dateIdToDate(this.dateId)
    lastMonth.setTime(lastMonth.getTime() - (28 * 24 * 3600000))
    monthHelper = new MonthHelper(Identifiers.getDateId(lastMonth))

    this.lastWater = monthHelper.getWaterProgress() * 100
    this.lastFood = monthHelper.getFoodProgress() * 100
    this.lastExercises = monthHelper.getExercisesProgress() * 100
    this.lastSleep = monthHelper.getSleepProgress() * 100
  }
}
