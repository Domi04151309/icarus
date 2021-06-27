/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ExerciseItem from '../../components/exercise-item.js'
import Modal from '../../components/modal.js'

import ExerciseHelper from '../../helpers/exercises.js'
import Workouts from '../../data/workouts.js'

export default {
  name: 'exercises',
  data() {
    return {
      recommended: ExerciseHelper.getRecommended(),
      workouts: Workouts[0].types
    }
  },
  template:
  `<page-tab-bar class="red">
    <h2 class="mt-16 mx-8 secondary-title">Exercises</h2>
    <p class="mt-0 mb-48 mx-8">An exercise a day keeps the doctor away!</p>

    <div class="card mb-16-p-16">
      <h2>Categories</h2>
      <p class="mb-16">Choose what you want to do</p>
      <div class="flex between center">
        <router-link to="/exercises/list?x=0" class="card p-16 big material-icons-round">directions_run</router-link>
        <router-link to="/exercises/list?x=1" class="card p-16 big material-icons-round">fitness_center</router-link>
        <router-link to="/exercises/list?x=2" class="card p-16 big material-icons-round">self_improvement</router-link>
        <router-link to="/exercises/list" class="card p-16 big material-icons-round">format_list_bulleted</router-link>
      </div>
    </div>
    <h2 class="mx-8 mt-48 mb-24">Perfect Fits For You</h2>
    <div class="grid-2 gap-16 mb-16">
      <exercise-item
        v-for="item in recommended"
        :key="item.title + item.posX + item.posZ"
        :link="'/exercises/details?x=' + item.posX + '&y=' + item.posY + '&z=' + item.posZ"
        :title="item.title"
        :image="item.image">
      </exercise-item>
    </div>
    <h2 class="mx-8 mt-48 mb-24">Full Workouts</h2>
    <router-link v-for="(item, i) in workouts" :key="item.title" :to="'/exercises/workout-details?y=' + i" class="card mb-16-p-16 flex center">
      <div class="material-icons-round big-c-icon">inventory</div>
      <div>
        <h2 class="m-0 mt-2">{{ item.title }} Workout</h2>
        <p>Train your {{ item.title.toLowerCase() }}</p>
      </div>
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
