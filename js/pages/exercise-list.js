import Page from '../components/page.js'

import Exercises from '../data/exercises.js'
import ExerciseHelper from '../helpers/exercises.js'

export default {
  name: 'exercise-list',
  data() {
    return {
      title: 'Exercises',
      listItems: [],
      searchString: '',
      sorting: window.unlocked ? 'by_score' : 'alphabetically'
    }
  },
  computed: {
    ExerciseHelper: () => ExerciseHelper
  },
  watch: {
    searchString() { this.sort() },
    sorting() { this.sort() }
  },
  template:
  `<page :title="title" parent="/exercises">
    <input v-model="searchString" class="card mb-16" type="text" placeholder="Search" autocomplete="off">
    <div v-if="window.unlocked" class="mb-16">
      <input type="radio" id="by_score" value="by_score" v-model="sorting">
      <label class="mr-8" for="by_score">By Score</label>
      <input type="radio" id="alphabetically" value="alphabetically" v-model="sorting">
      <label for="alphabetically">Alphabetically</label>
    </div>
    <div v-for="(category, posX) in listItems" :key="posX + category.title">
      <p v-if="$route.query.x == null" :id="posX" class="text-center">{{ category.title }}</p>
      <div class="category">
        <div class="card mb-16" v-for="(exercise, posY) in category.exercises" :key="posY + exercise.title">
          <h2 class="p-16 m-0">{{ exercise.title }}</h2>
          <ul class="link-list m-0">
            <li v-for="(variation, posZ) in exercise.variations" :key="posY + variation.title">
              <router-link :to="'/exercises/details?x=' + ($route.query.x || posX) + '&y=' + exercise.pos + '&z=' + posZ">
                {{ variation.title }}<br>
                <span v-if="window.unlocked" class="p">Score: {{ ExerciseHelper.getScore($route.query.x || posX, exercise.pos, posZ) }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </page>`,
  components: {
      Page
  },
  methods: {
    filtered() {
      let ex = JSON.parse(JSON.stringify(Exercises))
      ex.forEach(category => {
        category.exercises.forEach((item, i) => { item.pos = i })
        let localExercises = category.exercises.filter(a => a.title.toUpperCase().includes(this.searchString.toUpperCase()))
        category.exercises = localExercises
      })
      return ex
    },
    sort() {
      let ex = this.filtered()
      ex.forEach((category, i) => {
        if (this.sorting == 'by_score') {
          category.exercises.sort((a, b) => {
            const scoreA = ExerciseHelper.categoryScore(i, a.pos)
            const scoreB = ExerciseHelper.categoryScore(i, b.pos)
            return scoreA > scoreB ? -1 : scoreA < scoreB ? 1 : 0
          })
        } else if (this.sorting == 'alphabetically') {
           category.exercises.sort((a, b) => a.title.localeCompare(b.title))
        }
      })
      if (this.$route.query.x == null) this.listItems = ex
      else this.listItems = [ex[this.$route.query.x]]
    }
  },
  created() {
    this.sort()
  }
}
