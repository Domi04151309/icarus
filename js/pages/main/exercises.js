import PageTabBar from '../../components/page-tab-bar.js'
import ExerciseItem from '../../components/exercise-item.js'

import ExercisesHelper from '../../helpers/exercises.js'

export default {
  name: 'exercises',
  data() {
    return {
      recommended: ExercisesHelper.getRecommended()
    }
  },
  template:
  `<page-tab-bar>
    <h2 class="mt-16 mx-8 secondary-title">Exercises</h2>
    <p class="mt-0 mb-48 mx-8">An exercise a day keeps the doctor away!</p>
    <div class="grid-2 gap-16 mb-16">
      <exercise-item
        v-for="item in recommended"
        :key="item.title + item.posX + item.posZ"
        :link="'/exercises/exercise-details?posX=' + item.posX + '&posY=' + item.posY + '&posZ=' + item.posZ"
        :title="item.title"
        :image="item.image">
      </exercise-item>
    </div>
    <router-link to="/exercises/exercise-list" class="card p-16 text-center">
      All Exercises
    </router-link>
  </page-tab-bar>`,
  components: {
      PageTabBar,
      ExerciseItem
  }
}
