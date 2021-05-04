/*global Vue*/

import Page from '../components/page-large-app-bar.js'
import Modal from '../components/modal.js'
import ProgressRing from '../components/progress-ring.js'

import Exercises from '../data/exercises.js'
import ExerciseHelper from '../helpers/exercises.js'
import Identifiers from '../helpers/identifiers.js'
import { DayHelper } from '../helpers/progress.js'

export default {
  name: 'exercise-details',
  data() {
    return {
      exerciseTitle: '',
      exerciseItem: { intensities: { low: { }, medium: { }, high: { }, full: { } } },
      intensity: 'medium',
      running: false,
      time: 0,
      timeMax: 0,
      repetitions: 0,
      sets: 0
    }
  },
  watch: {
    intensity() {
      ['low', 'medium', 'high', 'full'].forEach(item => {
        this.$refs[item].classList.remove('selected')
      })
      this.$refs[this.intensity].classList.add('selected')
      this.computeTime()
    }
  },
  template:
  `<page :title="exerciseItem.title + ' ' + exerciseTitle" parent="/exercises" class="exercises red">
    <div class="card mb-16-p-16">
      <h2>Tutorial</h2>
      <ol>
        <li v-for="(item, i) in exerciseItem.tutorial" :key="i">{{ item }}</li>
      </ol>
    </div>
    <div class="card mb-16-p-16 text-center">
      <h2>Intensity</h2>
      <div class="question button-bar">
        <button ref="low" type="button" v-on:click="intensity = 'low'">Low</button>
        <button ref="medium" class="selected" type="button" v-on:click="intensity = 'medium'">Medium</button>
        <button ref="high" type="button" v-on:click="intensity = 'high'">High</button>
        <button ref="full" type="button" v-on:click="intensity = 'full'">Full</button>
      </div>
    </div>
    <div class="card flex space center text-center mb-16-p-16">
      <div>
        <h2 class="m-0">{{ exerciseItem.intensities[intensity].sets || 1 }}</h2>
        <p class="mb-0">Sets</p>
      </div>
      <div>
        <h2 class="m-0">{{ exerciseItem.intensities[intensity].repetitions || 1 }}</h2>
        <p class="mb-0">Repetitions</p>
      </div>
      <div>
        <h2 class="m-0">{{ exerciseItem.intensities[intensity].time || 0 }}</h2>
        <p class="mb-0">Time</p>
      </div>
    </div>
    <div v-if="exerciseItem.intensities[intensity].time" class="card text-center mb-16-p-16">
      <h2>Timer</h2>
      <div class="flex space center">
        <button ref="play" class="progress-control material-icons-round" type="button" v-on:click="playPauseTime()">play_arrow</button>
        <div class="relative p-16">
          <div class="absolute">{{ Math.floor(time / 60) + ':' + String(time % 60).padStart(2, '0') }}</div>
          <progress-ring radius="56" :progress="time / timeMax * 100" stroke="8"></progress-ring>
        </div>
        <button class="progress-control material-icons-round" type="button" v-on:click="resetTime()">stop</button>
      </div>
    </div>
    <div v-if="exerciseItem.intensities[intensity].repetitions" class="card text-center mb-16-p-16">
      <h2>Repetitions</h2>
      <div class="flex space center">
        <button class="progress-control" type="button" v-on:click="removeRepetition()">&minus;</button>
        <div class="relative p-16">
          <div class="absolute">{{ repetitions }}</div>
          <progress-ring radius="56" :progress="repetitions / exerciseItem.intensities[intensity].repetitions * 100" stroke="8"></progress-ring>
        </div>
        <button class="progress-control" type="button" v-on:click="addRepetition()">+</button>
      </div>
    </div>
    <div v-if="exerciseItem.intensities[intensity].sets" class="card mb-16-p-16">
      <h2>Sets <span class="p">{{ sets }}/{{ exerciseItem.intensities[intensity].sets }}</span></h2>
      <progress :max="exerciseItem.intensities[intensity].sets" :value="sets"></progress>
    </div>
    <div v-if="(exerciseItem.information || []).length > 0" class="card mb-16-p-16">
      <h2>Information</h2>
      <p>
        {{ exerciseItem.information[0] }}
      </p>
    </div>
    <button class="w-100" type="button" v-on:click="onFinishClicked()">Finish</button>
  </page>`,
  components: {
      Page,
      ProgressRing
  },
  methods: {
    computeTime() {
      if (this.exerciseItem.intensities[this.intensity].time != "") {
        let time = this.exerciseItem.intensities[this.intensity].time
        if (time.indexOf('.') == -1) {
          this.timeMax = parseInt(time, 10) * 60
        } else {
          this.timeMax = parseInt(time.substr(0, time.indexOf('.')), 10) * 60 + parseInt(time.substring(time.indexOf('.') + 1), 10)
        }
        this.resetTime()
      }
    },
    playPauseTime() {
      this.running = !this.running
      if (!this.running) {
        this.$refs.play.innerHTML = 'play_arrow'
      } else {
        if (this.time == 0) this.time = this.timeMax
        this.$refs.play.innerHTML = 'pause'
        this.doCountdown()
      }
    },
    doCountdown() {
      if (this.running) {
        if (this.time > 0) {
          this.time--
          setTimeout(() => this.doCountdown(), 1000)
        } else {
          this.sets++
          this.running = false
          this.$refs.play.innerHTML = 'play_arrow'
        }
      }
    },
    resetTime() {
      this.running = false
      this.time = this.timeMax
      let play = this.$refs?.play
      if (play != null) play.innerHTML = 'play_arrow'
    },
    removeRepetition() {
      if (this.repetitions == 0) {
        if (this.sets != 0) {
          this.repetitions = this.exerciseItem.intensities[this.intensity].repetitions - 1
          this.sets--
        }
      } else this.repetitions--
    },
    addRepetition() {
      if (this.repetitions >= this.exerciseItem.intensities[this.intensity].repetitions - 1) {
        this.repetitions = 0
        this.sets++
      }
      else this.repetitions++
    },
    onFinishClicked() {
      var dayHelper = new DayHelper(Identifiers.getDateId())
      dayHelper.progress.exercises += 1
      dayHelper.saveProgress()
      ExerciseHelper.addRecentExercise([
        parseInt(this.$route.query.posX, 10),
        parseInt(this.$route.query.posY, 10),
        parseInt(this.$route.query.posZ, 10)
      ])
      var tempItem = {}
      tempItem.title =  this.exerciseItem.title + ' ' + this.exerciseTitle
      tempItem.information = this.exerciseItem.information
      ExerciseHelper.addExerciseToStatistic(tempItem)
      navigator.vibrate(5)
      this.$router.push('/exercises')
    }
  },
  mounted() {
    if (this.$route.query.posX != null && this.$route.query.posY != null && this.$route.query.posZ != null) {
      this.exerciseTitle = Exercises[parseInt(this.$route.query.posX, 10)].exercises[parseInt(this.$route.query.posY, 10)].title
      this.exerciseItem = Exercises[parseInt(this.$route.query.posX, 10)].exercises[parseInt(this.$route.query.posY, 10)].variations[parseInt(this.$route.query.posZ, 10)]

      this.computeTime()
    } else {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Exercise Not Found',
          message: 'Unfortunately, this exercise does not exist.',
          positiveFunction: () => {
            setTimeout(() => { this.$router.push('/exercises') }, 1000)
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
