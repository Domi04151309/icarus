import Page from '../components/page.js'
import ProgressSections from '../components/progress-sections.js'

import { MonthHelper } from '../helpers/progress.js'

export default {
  name: 'calendar',
  data() {
    return {
      title: 'Calendar',
      month: 0,
      year: 0,
      monthHelper: { }
    }
  },
  computed: {
    months: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'Decemeber'],
    days: () => ['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat']
  },
  template:
  `<page :title="title" parent="/progress" id="calendar">
    <div class="card mb-16-p-16">
      <h2>
        <span id="month-title"></span>
        <div class="controls">
          <button type="button" id="prev-month">Previous</button>
          <button type="button" id="next-month">Next</button>
        </div>
      </h2>
      <h3>
        <span id="year"></span>
        <div class="controls">
          <button type="button" id="prev-y">Previous</button>
          <button type="button" id="next-y">Next</button>
        </div>
      </h3>
    </div>
    <div id="picker-container" class="card mb-16-p-16 text-center grid-7"></div>
    <div v-on:click="openMonth()" class="card mb-16-p-16">
      <h2>Whole Month</h2>
      <progress-sections
        :s1="monthHelper?.getWellBeingProgress()"
        :s2="monthHelper?.getWaterProgress()"
        :s3="monthHelper?.getFoodProgress()"
        :s4="monthHelper?.getExerciseProgress()">
      </progress-sections>
      <p>Click too see the whole month.</p>
    </div>
    <div class="card mb-16-p-16">
      <div id="weeks" class="flex space"></div>
    </div>
  </page>`,
  components: {
      Page,
      ProgressSections
  },
  methods: {
    openDay(day) {
      this.$router.push('/progress/day?date=' + this.year + String(this.month + 1).padStart(2, '0') + String(day).padStart(2, '0'))
    },
    openWeek(day) {
      this.$router.push('/progress/week?date=' + this.year + String(this.month + 1).padStart(2, '0') + String(day).padStart(2, '0'))
    },
    openMonth() {
      this.$router.push('/progress/month?date=' + this.year + String(this.month + 1).padStart(2, '0') + '01')
    },
    getDays() {
      let pickerContainer, weekContainer, dayNode, weekButton, i, j

      pickerContainer = document.getElementById('picker-container')
      pickerContainer.innerHTML = ''
      weekContainer = document.getElementById('weeks')
      weekContainer.innerHTML = ''
      document.getElementById('month-title').innerHTML = this.months[this.month]
      document.getElementById('year').innerHTML = this.year

      this.monthHelper = new MonthHelper(this.year + String(this.month + 1).padStart(2, '0') + '01')

      for (i = 0; i < 7; i++) {
        dayNode = document.createElement('div')
        dayNode.appendChild(document.createTextNode(this.days[i]))
        pickerContainer.appendChild(dayNode)
      }

      const firstDay = new Date(this.year, this.month, 1)
      const today = new Date()
      const lastDay = new Date(this.year, this.month + 1, 0)
      let offset = firstDay.getDay()
      let dayCount = 1
      for (i = 0; i < 6; i++) {
        for (j = 0; j < 7; j++) {
          if (offset == 0) {
            if (dayCount > lastDay.getDate()) break
            dayNode = document.createElement('button')
            dayNode.type = 'button'
            dayNode.addEventListener('click', event => {
              this.openDay(event.target.innerHTML)
            })
            dayNode.appendChild(document.createTextNode(dayCount))
            if (
              dayCount == today.getDate()
              && this.month == today.getMonth()
              && this.year == today.getFullYear()
            ) dayNode.classList.add('today')
            pickerContainer.appendChild(dayNode)
            dayCount++
          } else {
            dayNode = document.createElement('div')
            pickerContainer.appendChild(dayNode)
            offset--
          }
          if (j == 0) {
            weekButton = document.createElement('button')
            weekButton.type = 'button'
            weekButton.dataset.day = dayCount
            weekButton.addEventListener('click', event => {
              this.openWeek(event.target.dataset.day)
            })
            weekButton.appendChild(document.createTextNode(i + 1))
            weekContainer.append(weekButton)
          }
        }
      }
    }
  },
  created() {
    this.monthHelper = new MonthHelper()
  },
  mounted() {
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth()

    document.getElementById('next-month').addEventListener('click', () => {
      if (this.month < 11) this.month++
      else {
        this.year++
        this.month = 0
      }
      this.getDays()
    })

    document.getElementById('prev-month').addEventListener('click', () => {
      if (this.month > 0) this.month--
      else {
        this.year--
        this.month = 11
      }
      this.getDays()
    })

    document.getElementById('next-y').addEventListener('click', () => {
      this.year++
      this.getDays()
    })

    document.getElementById('prev-y').addEventListener('click', () => {
      this.year--
      this.getDays()
    })

    this.getDays()
  }
}
