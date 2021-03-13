import Page from '../components/page.js'
import ProgressRing from '../components/progress-ring.js'
import FoodListItem from '../components/food-list-item.js'

import FoodHelper from '../helpers/food.js'

//TODO: Dynamically generate content

export default {
  name: 'food',
  props: {
    healthy: Boolean
  },
  computed: {
    writtenType() {
      if (this.healthy) return 'healthy'
      else return 'casual'
    },
    title() {
      if (this.healthy) return 'Healthy'
      else return 'Casual'
    },
    secondaryTitle() {
      if (this.healthy) return 'Healthy Food'
      else return 'Casual Food'
    },
    icon() {
      if (this.healthy) return 'restaurant_menu'
      else return 'fastfood'
    },
    items() {
      if (this.healthy) return FoodHelper.getHealthyFood()
      else return FoodHelper.getNotSoHealthyFood()
    },
    progress() {
      var statistics = FoodHelper.getFoodStatistics()
      if (this.healthy)
        return (statistics.healthy * 100) / (statistics.healthy + statistics.notSoHealthy)
      else
        return (statistics.notSoHealthy * 100) / (statistics.healthy + statistics.notSoHealthy)
    },
    suggestions: () => ['Sweet', 'Hearty', 'Vegi', 'Vegan', 'Fast', 'Light', 'Heavy', 'Warm', 'Cold']
  },
  template:
  `<page :title="title" parent="/nutrition">
    <div class="text-center">
      <div class="p-16">
        <progress-ring radius="48" :progress="progress" stroke="8"></progress-ring>
      </div>
      <h2>{{ secondaryTitle }}</h2>
    </div>
    <div class="grid-2 gap-16">
      <food-list-item v-for="(item, index) in items" :key="index" :link="'/nutrition/' + writtenType + '/food-details?item=' + index" :title="item.title" :icon="icon"></food-list-item>
      <food-list-item :link="'/nutrition/' + writtenType + '/food-item'" title="Add Item" icon="add"></food-list-item>
    </div>
    <h2 class="text-center">Our Suggestions</h2>
    <div class="grid-2 gap-16" v-on:click="alert('Not yet implemented!')">
      <food-list-item v-for="item in suggestions" :key="item" :title="item" :icon="icon"></food-list-item>
    </div>
  </page>`,
  components: {
      Page,
      ProgressRing,
      FoodListItem
  }
}
