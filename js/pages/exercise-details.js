/*global Vue*/

import Page from '../components/page-large-app-bar.js'
import Modal from '../components/modal.js'
import ProgressRing from '../components/progress-ring.js'

import Exercises from '../data/exercises.js'
import ExerciseHelper from '../helpers/exercises.js'
import Identifiers from '../helpers/identifiers.js'

//TODO: Add content

export default {
  name: 'exercise-details',
  data() {
    return {
      exerciseTitle: '',
      exerciseItem: { },
      intensity: null,
    }
  },
  computed: {
    title: () => 'Exercise'
  },
  watch: {
    intensity() {
      this.$refs.low.classList.remove('selected')
      this.$refs.medium.classList.remove('selected')
      this.$refs.high.classList.remove('selected')
      if (this.intensity === 'low') this.$refs.low.classList.add('selected')
      else if (this.intensity === 'medium') this.$refs.medium.classList.add('selected')
      else if (this.intensity === 'high') this.$refs.high.classList.add('selected')
    }
  },
  template:
  `<page :title="exerciseItem.title + ' ' + exerciseTitle" parent="/exercises" class="exercises">
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
        <button ref="medium" type="button" v-on:click="intensity = 'medium'">Medium</button>
        <button ref="high" type="button" v-on:click="intensity = 'high'">High</button>
      </div>
    </div>
    <div class="card text-center mb-16-p-16">
      <h2>Timer</h2>
      <div class="p-16">
        <progress-ring radius="56" progress="66" stroke="8"></progress-ring>
      </div>
    </div>
    <div class="card mb-16-p-16">
      <h2>Sets</h2>
      <div class="flex my-24">
        <button class="progress-control left" type="button" v-on:click="">&minus;</button>
        <progress max="100" value="33"></progress>
        <button class="progress-control right" type="button" v-on:click="">+</button>
      </div>
    </div>
    <div class="card mb-16-p-16">
      <h2>Repetitions</h2>
      <input type="number" value="4" autocomplete="off"></input>
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
      var dateId = Identifiers.getDateId()
      localStorage.setItem(
        dateId + '_exercises',
        (parseInt(localStorage.getItem(dateId + '_exercises'), 10) || 0) + 1
      )
      ExerciseHelper.addRecentExercise([
        parseInt(this.$route.query.posX, 10),
        parseInt(this.$route.query.posY, 10),
        parseInt(this.$route.query.posZ, 10)
      ])
      this.$router.push('/exercises')
    }
  },
  mounted() {
    if (this.$route.query.posX != null && this.$route.query.posY != null && this.$route.query.posZ != null) {
      this.exerciseTitle = Exercises[parseInt(this.$route.query.posX, 10)].exercises[parseInt(this.$route.query.posY, 10)].title
      this.exerciseItem = Exercises[parseInt(this.$route.query.posX, 10)].exercises[parseInt(this.$route.query.posY, 10)].variations[parseInt(this.$route.query.posZ, 10)]
      this.intensity = 'low'
    } else {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Exercise Not Found',
          message: 'Unfortunately, this exercise does not exist.',
          positiveFunction: () => {
            setTimeout(() => { this.$router.push('/exercises') }, 1000)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
