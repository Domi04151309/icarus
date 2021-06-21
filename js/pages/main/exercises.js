/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ExerciseItem from '../../components/exercise-item.js'
import Modal from '../../components/modal.js'

import ExercisesHelper from '../../helpers/exercises.js'

//TODO: Full workouts

export default {
  name: 'exercises',
  data() {
    return {
      recommended: ExercisesHelper.getRecommended(),
      combinations: ['Full Body', 'Abs', 'Legs & Booty', 'Upper Body']
    }
  },
  template:
  `<page-tab-bar class="red">
    <h2 class="mt-16 mx-8 secondary-title">Exercises</h2>
    <p class="mt-0 mb-48 mx-8">An exercise a day keeps the doctor away!</p>
    <router-link to="/exercises/exercise-list" class="card mb-16-p-16 flex center">
      <div class="material-icons-round big-c-icon">directions_run</div>
      <div>
        <h2 class="m-0 mt-2">Without Equipment</h2>
        <p>Things you can do right away</p>
      </div>
    </router-link>
    <router-link to="/exercises/exercise-list" class="card mb-16-p-16 flex center">
      <div class="material-icons-round big-c-icon">fitness_center</div>
      <div>
        <h2 class="m-0 mt-2">With Equipment</h2>
        <p>Things you need equipment for</p>
      </div>
    </router-link>
    <router-link to="/exercises/exercise-list" class="card mb-16-p-16 flex center">
      <div class="material-icons-round big-c-icon">self_improvement</div>
      <div>
        <h2 class="m-0 mt-2">Yoga</h2>
        <p>Find inner balance</p>
      </div>
    </router-link>
    <h2 class="mx-8 mt-48 mb-24">Perfect Fits For You</h2>
    <div class="grid-2 gap-16 mb-16">
      <exercise-item
        v-for="item in recommended"
        :key="item.title + item.posX + item.posZ"
        :link="'/exercises/exercise-details?posX=' + item.posX + '&posY=' + item.posY + '&posZ=' + item.posZ"
        :title="item.title"
        :image="item.image">
      </exercise-item>
    </div>
    <h2 class="mx-8 mt-48 mb-24">Full Workouts</h2>

    <div class="disabled">

    <router-link v-for="item in combinations" :key="item" to="" class="card mb-16-p-16 flex center">
      <div class="material-icons-round big-c-icon">inventory</div>
      <div>
        <h2 class="m-0 mt-2">{{ item }} Workout</h2>
        <p>Train your {{ item.toLowerCase() }}</p>
      </div>
    </router-link>

    </div>

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
