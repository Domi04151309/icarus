/*global Vue*/

import Page from '../components/page-large-app-bar.js'
import Modal from '../components/modal.js'
import ProgressRing from '../components/progress-ring.js'

import Exercises from '../data/exercises.js'
import ExerciseHelper from '../helpers/exercises.js'
import Identifiers from '../helpers/identifiers.js'
import { DayHelper } from '../helpers/progress.js'

//TODO: Add content

export default {
  name: 'exercise-details',
  data() {
    return {
      exerciseTitle: '',
      exerciseItem: { intensities: { low: { }, medium: { }, high: { }, full: { } } },
      intensity: 'medium',
    }
  },
  watch: {
    intensity() {
      ['low', 'medium', 'high', 'full'].forEach(item => {
        this.$refs[item].classList.remove('selected')
      })
      console.log('triggered')
      this.$refs[this.intensity].classList.add('selected')
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
        <h2 class="m-0">{{ exerciseItem.intensities[intensity].sets || 0 }}</h2>
        <p class="mb-0">Sets</p>
      </div>
      <div>
        <h2 class="m-0">{{ exerciseItem.intensities[intensity].repetitions || 0 }}</h2>
        <p class="mb-0">Repetitions</p>
      </div>
      <div>
        <h2 class="m-0">{{ exerciseItem.intensities[intensity].time || 0 }}</h2>
        <p class="mb-0">Time</p>
      </div>
    </div>
    <div class="card text-center mb-16-p-16">
      <h2>Timer</h2>
      <div class="flex space center">
        <button class="progress-control material-icons-round" type="button">play_arrow</button>
        <div class="p-16">
          <progress-ring radius="56" progress="66" stroke="8"></progress-ring>
        </div>
        <button class="progress-control material-icons-round" type="button">stop</button>
      </div>
    </div>
    <div class="grid-2 gap-16">
      <div class="card mb-16-p-16">
        <h2>Sets</h2>
        <progress max="100" value="33"></progress>
      </div>
      <div class="card mb-16-p-16">
        <h2>Repetitions</h2>
        <progress max="100" value="66"></progress>
      </div>
    </div>
    <div v-if="(exerciseItem.information || []).length > 0" class="card mb-16-p-16">
      <h2>Information</h2>
      <p>
        {{ exerciseItem.information[0] }}
      </p>
    </div>
    <button class="w-100" type="button" v-on:click="onPerformClicked()">Perform</button>
  </page>`,
  components: {
      Page,
      ProgressRing
  },
  methods: {
    onPerformClicked() {
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
      ExerciseHelper.addOneExerciseToStatistic(tempItem)
      this.$router.push('/exercises')
    }
  },
  mounted() {
    if (this.$route.query.posX != null && this.$route.query.posY != null && this.$route.query.posZ != null) {
      this.exerciseTitle = Exercises[parseInt(this.$route.query.posX, 10)].exercises[parseInt(this.$route.query.posY, 10)].title
      this.exerciseItem = Exercises[parseInt(this.$route.query.posX, 10)].exercises[parseInt(this.$route.query.posY, 10)].variations[parseInt(this.$route.query.posZ, 10)]
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
