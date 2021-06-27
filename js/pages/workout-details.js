import Page from '../components/page-large-app-bar.js'

import Workouts from '../data/workouts.js'
import Exercises from '../data/exercises.js'

//TODO: Manage Content

export default {
  name: 'workout-details',
  data() {
    return {
      workout: {},
      exercises: [],
      fragment: -1,
      cardTitle: '',
      cardItems: [],
      buttonIcon: ''
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
      <h2>{{ cardTitle }}</h2>
      <ol>
        <li v-for="(item, i) in cardItems" :key="i">{{ item }}</li>
      </ol>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">{{ buttonIcon }}</div>
  </page>`,
  components: {
      Page
  },
  methods: {
    render() {
      if (this.fragment == -1) {
        this.cardTitle = 'Overview'
        this.cardItems = this.exercises.map(item => item.title + ' (' + item.variation.title + ')')
        this.buttonIcon = 'play_arrow'
      } else if (this.fragment == 10) {
        this.cardTitle = 'Finished'
        this.cardItems = this.exercises.map(item => item.title + ' (' + item.variation.title + ')')
        this.buttonIcon = 'flag'
      } else if (this.fragment > 10) {
        this.$router.push('/exercises')
      } else {
        this.cardTitle = this.exercises[this.fragment].title
        this.cardItems = this.exercises[this.fragment].variation.tutorial
        this.buttonIcon = 'skip_next'
      }
    },
    onFabClicked() {
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
