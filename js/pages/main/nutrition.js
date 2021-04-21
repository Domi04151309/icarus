/*global Vue*/

import PageTabBar from '../../components/page-tab-bar.js'
import ProgressRing from '../../components/progress-ring.js'
import FoodListItemImage from '../../components/food-list-item-image.js'
import Modal from '../../components/modal.js'

import FoodHelper from '../../helpers/food.js'

//TODO: Dynamically generate content

export default {
  name: 'nutrition',
  data() {
    return {
      generalSuggestions: [
        { title: "Suggestion A", img: './images/food/breakfast.jpg', link: '' },
        { title: 'Suggestion B', img: './images/food/lunch.jpg', link: '' },
        { title: 'Show more', img: './images/food/dinner.jpg', link: '/nutrition/suggestions' }
      ]
    }
  },
  computed: {
    healthyProgress() {
      var statistics = FoodHelper.getFoodStatistics()
      return (statistics.healthy.length * 100) / (statistics.healthy.length + statistics.casual.length)
    },
    casualProgress() {
      var statistics = FoodHelper.getFoodStatistics()
      return (statistics.casual.length * 100) / (statistics.healthy.length + statistics.casual.length)
    }
  },
  template:
  `<page-tab-bar class="green">
    <h2 class="mt-16 mx-8 secondary-title">Plan Your Meals</h2>
    <p class="mt-0 mb-48 mx-8">It's time to eat something delicious!</p>
    <router-link to="/nutrition/healthy" class="card mb-16-p-16 flex center">
      <progress-ring class="big-c-icon" radius="32" :progress="healthyProgress" stroke="6"></progress-ring>
      <div>
        <h2 class="m-0">Healthy Food</h2>
        <p>Food that's good for you</p>
      </div>
    </router-link>
    <router-link to="/nutrition/casual" class="card mb-16-p-16 flex center">
      <progress-ring class="big-c-icon" radius="32" :progress="casualProgress" stroke="6"></progress-ring>
      <div>
        <h2 class="m-0">Casual Food</h2>
        <p>Food that's delicious</p>
      </div>
    </router-link>
    <h2 class="mx-8 mt-48 mb-24">What You Could Eat</h2>
    <div class="grid-1-3 gap-16 mb-16">
      <food-list-item-image v-for="item in generalSuggestions" :key="item.title" :title="item.title" :image="item.img" :link="item.link"></food-list-item-image>
    </div>
  </page-tab-bar>`,
  components: {
      PageTabBar,
      ProgressRing,
      FoodListItemImage
  },
  mounted() {
    if (localStorage.getItem('help_nutrition') == null) {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Nutrition Page',
          message: 'Use this page to track your eating habits and for getting new recommendations every day. Collect points by eating something healthy.',
          positiveFunction: () => {
            localStorage.setItem('help_nutrition', '1')
          },
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
