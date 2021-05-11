import Page from '../components/page.js'
import ProgressRing from '../components/progress-ring.js'

import { DayHelper, Achievement } from '../helpers/progress.js'

export default {
  name: 'sleep',
  data() {
    return {
      title: 'Sleep',
      sleep: 0,
      hourPercent: 0,
      start: null,
      end: null,
      dateOptions: { hour: '2-digit', minute: '2-digit', hour12: false },
      active: true
    }
  },
  computed: {
    startLabel() {
      return this.start ? 'Restart' : 'Start'
    },
  },
  template:
  `<page :title="title" parent="/well-being" class="deep-purple">
    <div class="flex space center mt-16 mb-32">
      <div class="relative p-16">
        <h2 class="absolute m-0">{{ getString() }}</h2>
        <progress-ring radius="128" :progress="hourPercent * 100" stroke="8"></progress-ring>
      </div>
    </div>
    <div class="card flex space center text-center p-16 mb-32">
      <div>
        <h2 class="m-0">{{ start?.toLocaleTimeString([], dateOptions) || '00:00' }}</h2>
        <p class="mb-0">Start</p>
      </div>
      <div>
        <h2 class="m-0">{{ end.toLocaleTimeString([], dateOptions) }}</h2>
        <p class="mb-0">Now</p>
      </div>
    </div>
    <div class="grid-2 gap-8 mb-8">
      <button type="button" v-on:click="setStart()">{{ startLabel }}</button>
      <button type="button" v-on:click="reset()">Reset</button>
    </div>
    <button class="w-100" type="button" v-on:click="addToTotal()">End and add to total</button>
  </page>`,
  components: {
      Page,
      ProgressRing
  },
  methods: {
    setZeroDate() {
      const date = new Date()
      date.setHours(0, 0, 0, 0)
      this.start = date
    },
    setStart() {
      this.start = new Date()
      this.sleep = 0
      this.hourPercent = 0
      localStorage.setItem('sleep_start', this.start.getTime())
    },
    reset() {
      this.start = null
      this.sleep = 0
      this.hourPercent = 0
      localStorage.removeItem('sleep_start')
    },
    addToTotal() {
      let helper = new DayHelper()
      helper.progress.sleep += this.sleep + Math.round(this.hourPercent)
      helper.saveProgress()

      this.reset()
      Achievement.show('Slept ' + this.getString())
      this.$router.push('/well-being')
    },
    getString() {
      return this.sleep + (this.sleep == 1 ? ' hour' : ' hours')
    },
    loop() {
      this.end = new Date()
      if (this.start != null) {
        this.sleep = Math.floor((this.end - this.start) / 36e5)
        this.hourPercent = (this.end - this.start) / 36e5
      }
      if (this.active) setTimeout(this.loop, 5000)
    }
  },
  created() {
    const millis = parseInt(localStorage.getItem('sleep_start'), 10)
    this.start = isNaN(millis) ? null : new Date(millis)
    this.loop()
  },
  beforeDestroy() {
    this.active = false
  }
}
