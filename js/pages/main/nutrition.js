import PageTabBar from '../../components/page-tab-bar.js'
import ProgressRing from '../../components/progress-ring.js'
import FoodListItemImage from '../../components/food-list-item-image.js'

import FoodHelper from '../../helpers/food.js'

//TODO: Dynamically generate content

export default {
  name: 'nutrition',
  data() {
    return {
      generalSuggestions: [
        { title: "Breakfast", img: '../images/food/breakfast.jpg' },
        { title: 'Lunch', img: '../images/food/lunch.jpg' },
        { title: 'Dinner', img: '../images/food/dinner.jpg' }
      ]
    }
  },
  computed: {
    healthyProgress() {
      var statistics = FoodHelper.getFoodStatistics()
      return (statistics.healthy * 100) / (statistics.healthy + statistics.notSoHealthy)
    },
    casualProgress() {
      var statistics = FoodHelper.getFoodStatistics()
      return (statistics.notSoHealthy * 100) / (statistics.healthy + statistics.notSoHealthy)
    }
  },
  template:
  `<page-tab-bar>
    <h2 class="mt-16 mx-8 secondary-title">Plan Your Meals</h2>
    <p class="mt-0 mb-48 mx-8">It's time to eat something delicious!</p>
    <router-link to="/nutrition/healthy" class="card mb-16-p-16">
      <div class="flex center">
        <progress-ring class="big-c-icon" radius="32" :progress="healthyProgress" stroke="6"></progress-ring>
        <div>
          <h2 class="m-0">Healthy Food</h2>
          <p>Food that's good for you</p>
        </div>
      </div>
    </router-link>
    <router-link to="/nutrition/casual" class="card mb-16-p-16">
      <div class="flex center">
        <progress-ring class="big-c-icon" radius="32" :progress="casualProgress" stroke="6"></progress-ring>
        <div>
          <h2 class="m-0">Casual Food</h2>
          <p>Food that's delicious</p>
        </div>
      </div>
    </router-link>
    <h2 class="mx-8 mt-48 mb-24">What You Could Eat</h2>
    <div class="grid-1-3 gap-16 mb-16" v-on:click="alert('Not yet implemented!')">
      <food-list-item-image v-for="item in generalSuggestions" :key="item.title" :title="item.title" :image="item.img"></food-list-item-image>
    </div>
  </page-tab-bar>`,
  components: {
      PageTabBar,
      ProgressRing,
      FoodListItemImage
  }
}
