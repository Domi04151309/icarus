import Page from '../components/page.js'

import Exercises from '../data/exercises.js'
import ExercisesHelper from '../helpers/exercises.js'

export default {
  name: 'exercise-list',
  data() {
    return {
      title: 'Exercises',
      listItems: [],
      searchString: ''
    }
  },
  computed: {
    ExercisesHelper: () => ExercisesHelper
  },
  watch: {
    searchString() {
      this.listItems = Exercises.filter(a => a.name.toUpperCase().includes(this.searchString.toUpperCase()))
    }
  },
  template:
  `<page :title="title" parent="/exercises">
    <input v-model="searchString" class="card mb-16" type="text" placeholder="Search" autocomplete="off">
    <div class="card mb-16" v-for="(item, posX) in listItems" :key="posX + item.name">
      <h2 class="p-16 m-0">{{ item.name }}</h2>
      <ul class="link-list m-0">
        <li v-for="(variation, posY) in item.variations" :key="posX + variation.name">
          <router-link :to="'/exercises/exercise-details?posX=' + posX + '&posY=' + posY">
            {{ variation.name }}<br>
            <span class="p">Score: {{ ExercisesHelper.getScore(posX, posY) }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </page>`,
  components: {
      Page
  },
  mounted() {
    this.listItems = Exercises
    //TODO: Sorting
    /*this.listItems = Exercises.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })*/
  }
}
