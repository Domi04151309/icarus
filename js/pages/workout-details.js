import Page from '../components/page-large-app-bar.js'
import ProgressRing from '../components/progress-ring.js'

import Workouts from '../data/workouts.js'
import Exercises from '../data/exercises.js'
import ExerciseHelper from '../helpers/exercises.js'
import { DayHelper, Achievement } from '../helpers/progress.js'

export default {
  name: 'workout-details',
  data() {
    return {
      workout: {},
      exercises: [],
      fragment: -1,
      thread: 0,
      running: false,
      time: 60,
      timeMax: 60,
      playIcon: '',
      cardTitle: '',
      cardSmall: '',
      cardItems: [],
      buttonIcon: ''
    }
  },
  template:
  `<page :title="workout.title + ' HIIT'" parent="/exercises" class="exercises red">
    <div class="card mb-16-p-16">
      <h2>Progress <small class="p">{{ Math.min(fragment + 1, exercises.length) }}/{{ exercises.length }}</small></h2>
      <progress :max="exercises.length" :value="fragment + 1"></progress>
    </div>
    <div v-if="fragment == -1" class="card mb-16-p-16">
      <h2>Timing</h2>
      <p>
        Use the first 15 seconds to read the tutorial and as a break before performing the exercise for the remaining 45 seconds.
      </p>
    </div>
    <div v-if="fragment > -1 && fragment < exercises.length" class="card text-center mb-16-p-16">
      <h2>Timer</h2>
      <div class="flex space center">
        <button ref="play" class="progress-control material-icons-round" type="button" v-on:click="playPauseTime()">{{ playIcon }}</button>
        <div class="relative p-16">
          <div class="absolute">{{ Math.floor(time / 60) + ':' + String(time % 60).padStart(2, '0') }}</div>
          <progress-ring radius="56" :progress="time / timeMax * 100" stroke="8"></progress-ring>
        </div>
        <button class="progress-control material-icons-round" type="button" v-on:click="resetTime()">stop</button>
      </div>
      <p class="m-0">
        15s reading and resting - 45s performing
      </p>
    </div>
    <div class="card p-16">
      <h2>{{ cardTitle }} <small v-if="cardSmall.length > 0" class="p">{{ cardSmall }}</small></h2>
      <ol>
        <li v-for="(item, i) in cardItems" :key="i">{{ item }}</li>
      </ol>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="nextFragment()">{{ buttonIcon }}</div>
  </page>`,
  components: {
      Page,
      ProgressRing
  },
  methods: {
    playPauseTime() {
      this.running = ! this.running
      if (!this.running) {
        this.thread++
        this.playIcon = 'play_arrow'
      } else {
        if (this.time == 0) this.time = this.timeMax
        this.playIcon = 'pause'
        setTimeout(() => this.doCountdown(), 1000)
      }
      navigator.vibrate(1)
    },
    playTime() {
      this.thread++
      this.running = true
      this.time = this.timeMax
      this.playIcon = 'pause'
      setTimeout(() => this.doCountdown(), 1000)
    },
    doCountdown(thread = this.thread) {
      if (this.thread == thread) {
        if (this.time > 0) {
          this.time--
          setTimeout(() => this.doCountdown(thread), 1000)
        } else {
          this.thread++
          if (this.$route.path.includes(this.$options.name)) this.nextFragment()
        }
      }
    },
    resetTime(vibrate = true) {
      this.thread++
      this.running = false
      this.time = this.timeMax
      this.playIcon = 'play_arrow'
      if (vibrate) navigator.vibrate(1)
    },
    render() {
      if (this.fragment == -1) {
        this.cardTitle = 'Overview'
        this.cardSmall = ''
        this.cardItems = this.exercises.map(item => item.title + ' (' + item.variation.title + ')')
        this.buttonIcon = 'play_arrow'
      } else if (this.fragment == this.exercises.length) {
        this.cardTitle = 'Finished'
        this.cardSmall = ''
        this.cardItems = this.exercises.map(item => item.title + ' (' + item.variation.title + ')')
        this.buttonIcon = 'flag'
      } else if (this.fragment == this.exercises.length + 1) {
        const dayHelper = new DayHelper()
        dayHelper.progress.exercises += this.exercises.length
        dayHelper.saveProgress()

        this.exercises.forEach(exercise => {
          const item = {}
          item.title =  exercise.variation.title + ' ' + exercise.title
          item.category = 0
          item.information = exercise.variation.information
          item.exp = 2
          ExerciseHelper.addExerciseToStatistic(item)
        })
        Achievement.show('Completed a workout')
        this.$router.push('/exercises')
      } else {
        this.cardTitle = this.exercises[this.fragment].title
        this.cardSmall = this.exercises[this.fragment].variation.title
        this.cardItems = this.exercises[this.fragment].variation.tutorial
        this.buttonIcon = 'skip_next'
        this.playTime()
      }
    },
    nextFragment() {
      this.fragment++
      this.render()
    }
  },
  created() {
    if (this.$route.query.y == null) this.$router.push('/exercises')
    else this.workout = Workouts[0].types[this.$route.query.y]

    let exercises = []
    this.workout.exercises.sort(() => .5 - Math.random())
    this.workout.exercises.forEach(item => {
      exercises.push(Exercises[item[0]].exercises[item[1]])
    })
    exercises = exercises.slice(0, 10)
    exercises.forEach(item => {
      item.variation = item.variations[Math.floor(Math.random() * item.variations.length)]
    })
    this.exercises = exercises

    this.render()
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
