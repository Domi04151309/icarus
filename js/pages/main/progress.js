/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ProgressSections from '../../components/progress-sections.js'
import IconItem from '../../components/icon-item.js'
import Modal from '../../components/modal.js'

import JsonHelper from '../../helpers/json.js'
import InfoHelper from '../../helpers/info.js'
import Identifiers from '../../helpers/identifiers.js'
import { DayHelper, WeekHelper, MonthHelper } from '../../helpers/progress.js'

export default {
  name: 'progress_tab',
  data() {
    return {
      dayHelper: new DayHelper(),
      weekHelper: new WeekHelper(Identifiers.getDateId()),
      monthHelper: new MonthHelper(Identifiers.getDateId()),
      info: JsonHelper.get('info'),
      weight: InfoHelper.getLatestEntry('weight') || "0",
      bloodpressure: InfoHelper.getLatestEntry('bloodpressure') || "0",
      bloodsugar: InfoHelper.getLatestEntry('bloodsugar') || "0",
      clicks: 0
    }
  },
  template:
  `<page-tab-bar>
    <div class="mt-16 mx-8 material-icons-round big accent" v-on:click="easterEgg()">waves</div>
    <h2 class="mx-8 secondary-title">{{ 'Welcome Back ' + (window.unlocked ? this.info?.name : '') }}</h2>
    <p class="mt-0 mb-48 mx-8">Keep going! You're doing awesome!</p>
    <div v-if="window.unlocked">
      <router-link to="/progress/day" class="card mb-16 p-16">
        <h2>Today's Goals</h2>
        <progress-sections
          :s1="dayHelper.getWellBeingProgress()"
          :s2="dayHelper.getWaterProgress()"
          :s3="dayHelper.getFoodProgress()"
          :s4="dayHelper.getExerciseProgress()">
        </progress-sections>
        <p>Your progress for today</p>
      </router-link>
      <div class="grid-2 gap-16">
        <router-link to="/progress/week" class="card mb-16 p-16">
          <h2>This Week</h2>
          <progress-sections
            :s1="weekHelper.getWellBeingProgress()"
            :s2="weekHelper.getWaterProgress()"
            :s3="weekHelper.getFoodProgress()"
            :s4="weekHelper.getExerciseProgress()">
          </progress-sections>
          <p>Your progress for this week</p>
        </router-link>
        <router-link to="/progress/month" class="card mb-16 p-16">
          <h2>This Month</h2>
          <progress-sections
            :s1="monthHelper.getWellBeingProgress()"
            :s2="monthHelper.getWaterProgress()"
            :s3="monthHelper.getFoodProgress()"
            :s4="monthHelper.getExerciseProgress()">
          </progress-sections>
          <p>Your progress for this month</p>
        </router-link>
      </div>
    </div>
    <div v-else>
      <icon-item
        icon="insights"
        title="Today's Progress"
        summary="View today's progress"
        link="/progress/day">
      </icon-item>
    </div>
    <icon-item
      icon="calendar_today"
      title="Calendar"
      :summary="'View the progress of another day' + (window.unlocked ? ', week, or month' : '')"
      link="/progress/calendar">
    </icon-item>
    <h2 class="mx-8 mt-48 mb-24">Tracking</h2>
    <router-link to="/progress/tracking?i=weight" class="card mb-16 p-16 flex center between">
      <div>
        <h2 class="m-0 mt-2">Weight</h2>
        <p>Track your weight</p>
      </div>
      <div class="big mr-16 p">{{ weight }}</div>
    </router-link>
    <router-link to="/progress/tracking?i=bloodpressure" class="card mb-16 p-16 flex center between">
      <div>
        <h2 class="m-0 mt-2">Blood Pressure</h2>
        <p>Track your blood pressure</p>
      </div>
      <div class="big mr-16 p">{{ bloodpressure }}</div>
    </router-link>
    <router-link to="/progress/tracking?i=bloodsugar" class="card mb-48 p-16 flex center between">
      <div>
        <h2 class="m-0 mt-2">Blood Sugar</h2>
        <p>Track your blood sugar</p>
      </div>
      <div class="big mr-16 p">{{ bloodsugar }}</div>
    </router-link>
    <div v-if="window.unlocked" ref="fab" class="material-icons-round raised fab hidden" v-on:click="onFabClicked()">book</div>
  </page-tab-bar>`,
  components: {
      PageTabBar,
      ProgressSections,
      IconItem
  },
  methods: {
    easterEgg() {
      if (this.clicks >= 4) document.querySelector('main').classList.toggle('wavy')
      else this.clicks++
    },
    onFabClicked() {
      this.$router.push('/progress/diary')
    }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
    if (localStorage.getItem('help_progress') == null) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Progress Page',
          message: 'On this page, you can track your personal progress of the current day, week, and month.',
          positiveFunction: () => {
            localStorage.setItem('help_progress', '1')
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
