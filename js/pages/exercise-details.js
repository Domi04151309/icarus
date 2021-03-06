/*global Vue*/

import Page from '../components/page-large-app-bar.js'
import Modal from '../components/modal.js'
import ProgressRing from '../components/progress-ring.js'

import Exercises from '../data/exercises.js'
import Identifiers from '../helpers/identifiers.js'

//TODO: Add content

export default {
  name: 'exercise-details',
  data() {
    return {
      exerciseTitle: '',
      exerciseItem: { }
    }
  },
  computed: {
    title: () => 'Exercise'
  },
  template:
  `<page :title="exerciseItem.title + ' ' + exerciseTitle" parent="/exercises" class="exercises">
    <div class="card mb-16-p-16">
      <h2>Tutorial</h2>
      <p>
        {{ exerciseItem.tutorial }}
      </p>
    </div>
    <div class="card text-center mb-16-p-16">
      <h2>Timer</h2>
      <progress-ring radius="64" progress="66" stroke="8"></progress-ring>
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
    <div class="card mb-16-p-16">
      <h2>Information</h2>
      <p>
        Dummy text dummy text dummy text dummy text dummy text dummy text.
        Dummy text dummy text dummy text dummy text dummy text dummy text.
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
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
