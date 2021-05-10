/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ExerciseItem from '../../components/exercise-item.js'
import Modal from '../../components/modal.js'

import ExercisesHelper from '../../helpers/exercises.js'

export default {
  name: 'exercises',
  data() {
    return {
      recommended: ExercisesHelper.getRecommended()
    }
  },
  template:
  `<page-tab-bar class="red">
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
  },
  mounted() {
    if (localStorage.getItem('help_exercises') == null) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Exercise Page',
          message: 'This page is for people that want to be active. You can perform one of four recommended exercises or chose one from our huge collection by yourself to collect points.',
          positiveFunction: () => {
            localStorage.setItem('help_exercises', '1')
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
