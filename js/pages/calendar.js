import Page from '../components/page.js'
import ProgressSections from '../components/progress-sections.js'
import ProgressRing from '../components/progress-ring.js'

import { WeekHelper, MonthHelper } from '../helpers/progress.js'

export default {
  name: 'calendar',
  data() {
    return {
      month: 0,
      year: 0,
      days: [],
      weeks: [],
      monthHelper: { },
      circleRadius: 2
    }
  },
  computed: {
    months: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'Decemeber'],
    weekDays: () => ['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat']
  },
  template:
  `<page title="Calendar" parent="/progress" id="calendar">
    <div class="card mb-16 p-16">
      <h2>
        <span>{{ months[month] }}</span>
        <div class="controls">
          <button type="button" v-on:click="prevMonth()">Previous</button>
          <button type="button" v-on:click="nextMonth()">Next</button>
        </div>
      </h2>
      <h3>
        <span>{{ year }}</span>
        <div class="controls">
          <button type="button" v-on:click="prevYear()">Previous</button>
          <button type="button" v-on:click="nextYear()">Next</button>
        </div>
      </h3>
    </div>
    <div v-if="!window.unlocked" class="card mb-16 lite general small">
      View weekly and monthly progress with the full version of Icarus
    </div>
    <div class="card mb-16 p-16 text-center grid-7">
      <div v-for="(item, i) in weekDays" :key="i + 200">{{ item }}</div>
      <button
        v-for="(item, i) in days"
        :key="i"
        :class="{ today: item.highlighted }"
        type="button"
        v-on:click="if (item.clickable) openDay(item.day)">
          {{ item.title }}
        </button>
    </div>
    <div v-if="window.unlocked">
      <div v-on:click="openMonth()" class="card mb-16 p-16">
        <h2>Whole Month</h2>
        <progress-sections
          :s1="monthHelper?.getWellBeingProgress()"
          :s2="monthHelper?.getWaterProgress()"
          :s3="monthHelper?.getFoodProgress()"
          :s4="monthHelper?.getExerciseProgress()">
        </progress-sections>
        <p>Click too see the whole month.</p>
      </div>
      <div class="card mb-16 p-16">
        <div id="weeks" class="flex space">
          <button v-for="(item, i) in weeks" :key="i + 100" class="relative p-2" type="button" v-on:click="openWeek(item.day)">
            <span class="absolute">{{ item.title }}</span>
            <progress-ring :radius="circleRadius" :progress="item.progress" stroke="4"></progress-ring>
          </button>
        </div>
      </div>
    </div>
  </page>`,
  components: {
    Page,
    ProgressSections,
    ProgressRing
  },
  methods: {
    openDay(day) {
      this.$router.push(`/progress/day?date=${this.year}${String(this.month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`)
    },
    openWeek(day) {
      this.$router.push(`/progress/week?date=${this.year}${String(this.month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`)
    },
    openMonth() {
      this.$router.push(`/progress/month?date=${this.year}${String(this.month + 1).padStart(2, '0')}01`)
    },
    getDays() {
      let i, j
      const days = []
      const weeks = []

      this.monthHelper = new MonthHelper(this.year + String(this.month + 1).padStart(2, '0') + '01')

      const firstDay = new Date(this.year, this.month, 1)
      const today = new Date()
      const lastDay = new Date(this.year, this.month + 1, 0)
      let offset = firstDay.getDay()
      let dayCount = 1
      for (i = 0; i < 6; i++) {
        for (j = 0; j < 7; j++) {
          if (offset == 0) {
            if (dayCount > lastDay.getDate()) break
            days.push({
              title: dayCount,
              clickable: true,
              day: dayCount,
              highlighted: dayCount == today.getDate()
                && this.month == today.getMonth()
                && this.year == today.getFullYear()
            })
            dayCount++
          } else {
            days.push({
              title: '',
              clickable: false
            })
            offset--
          }
          if (j == 0) {
            const progress = new WeekHelper(`${this.year}${String(this.month + 1).padStart(2, '0')}${String(dayCount).padStart(2, '0')}`).getProgress() * 100
            weeks.push({
              title: i + 1,
              day: dayCount,
              progress: progress > 100 ? 100 : progress
            })
          }
        }
      }
      this.days = days
      this.weeks = weeks
    },
    prevMonth() {
      if (this.month > 0) this.month--
      else {
        this.year--
        this.month = 11
      }
      this.getDays()
    },
    nextMonth() {
      if (this.month < 11) this.month++
      else {
        this.year++
        this.month = 0
      }
      this.getDays()
    },
    prevYear() {
      this.year--
      this.getDays()
    },
    nextYear() {
      this.year++
      this.getDays()
    }
  },
  created() {
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth()

    this.getDays()

    this.circleRadius = Math.min(window.innerWidth / 20, 24)
    window.addEventListener('resize', () => {
      this.circleRadius = Math.min(window.innerWidth / 20, 24)
      document.querySelectorAll('circle').forEach(item => {
        //Needed for correct svg position
        item.style.transformOrigin = '0 0'
        setTimeout(() => {
          item.style.transformOrigin = '50% 50%'
        }, 100)
      })
    })
  }
}
