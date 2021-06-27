import Page from '../components/page-large-app-bar.js'

import Workouts from '../data/workouts.js'
import Exercises from '../data/exercises.js'

//TODO: Manage Content

export default {
  name: 'workout-details',
  data() {
    return {
      workout: {},
      exercises: []
    }
  },
  template:
  `<page :title="workout.title + ' Workout'" parent="/exercises" class="exercises red">

    <div class="card mb-16-p-16 flex center">
      <div class="material-icons-round big-c-icon">warning</div>
      <div>
        <h2 class="m-0 mt-2">In Development</h2>
        <p>This feature is not yet fully implemented</p>
      </div>
    </div>
    <div class="card mb-16-p-16">
      <h2>Overview</h2>
      <ol>
        <li v-for="(item, i) in exercises" :key="i">{{ item.title }} ({{ item.variation.title }})</li>
      </ol>
    </div>
    <div v-for="(item, i) in exercises" :key="item.title" class="card mb-16-p-16">
      <h2>{{ item.title }} <small class="p">{{ item.variation.title }}</small></h2>
      <ol>
        <li v-for="(step, j) in item.variation.tutorial" :key="10 + i">{{ step }}</li>
      </ol>
    </div>
  </page>`,
  components: {
      Page
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
  }
}
