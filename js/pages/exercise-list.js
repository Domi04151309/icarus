import Page from '../components/page.js'

import Exercises from '../data/exercises.js'
import ExercisesHelper from '../helpers/exercises.js'

export default {
  name: 'exercise-list',
  data() {
    return {
      title: 'Exercises',
      listItems: [],
      searchString: '',
      sorting: 'by_score'
    }
  },
  computed: {
    ExercisesHelper: () => ExercisesHelper
  },
  watch: {
    searchString() { this.sort() },
    sorting() { this.sort() }
  },
  template:
  `<page :title="title" parent="/exercises">
    <input v-model="searchString" class="card mb-16" type="text" placeholder="Search" autocomplete="off">
    <div class="mb-16">
      <input type="radio" id="by_score" value="by_score" v-model="sorting">
      <label class="mr-8" for="by_score">By Score</label>
      <input type="radio" id="alphabetically" value="alphabetically" v-model="sorting">
      <label for="alphabetically">Alphabetically</label>
    </div>
    <div class="card mb-16" v-for="(item, posX) in listItems" :key="posX + item.title">
      <h2 class="p-16 m-0">{{ item.title }}</h2>
      <ul class="link-list m-0">
        <li v-for="(variation, posY) in item.variations" :key="posX + variation.title">
          <router-link :to="'/exercises/exercise-details?posX=' + item.pos + '&posY=' + posY">
            {{ variation.title }}<br>
            <span class="p">Score: {{ ExercisesHelper.getScore(item.pos, posY) }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </page>`,
  components: {
      Page
  },
  methods: {
    filtered() {
      var ex = Exercises
      ex.forEach((item, i) => { item.pos = i })
      return ex.filter(a => a.title.toUpperCase().includes(this.searchString.toUpperCase()))
    },
    sort() {
      if (this.sorting == 'by_score') {
        this.listItems = this.filtered().sort((a, b) => {
          var scoreA = ExercisesHelper.categoryScore(a.pos)
          var scoreB = ExercisesHelper.categoryScore(b.pos)
          return scoreA > scoreB ? -1 : scoreA < scoreB ? 1 : 0
        })
      } else if (this.sorting == 'alphabetically') {
         this.listItems = this.filtered().sort((a, b) => a.title.localeCompare(b.title))
      } else this.listItems = []
    }
  },
  mounted() {
    this.sort()
  }
}
