import Page from '../components/page.js'

import Exercises from '../data/exercises.js'
import ExercisesHelper from '../helpers/exercises.js'

export default {
  name: 'exercise-list',
  data() {
    return {
      title: 'Exercises',
      storage: Exercises
    }
  },
  computed: {
    ExercisesHelper: () => ExercisesHelper
  },
  template:
  `<page :title="title" parent="/exercises">
    <div class="card mb-16" v-for="item, index) in storage" :key="index + item.name">
      <h2 class="p-16 m-0">{{ item.name }}</h2>
      <ul class="link-list m-0">
        <li v-for="variation in item.variations" :key="index + variation.name">
          <span>
            {{ variation.name }}<br>
            <span class="p">Score: {{ ExercisesHelper.getScore(variation) }}</span>
          </span>
        </li>
      </ul>
    </div>
  </page>`,
  components: {
      Page
  }
}
