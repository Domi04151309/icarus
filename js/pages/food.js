import Page from '../components/page.js'
import ProgressRing from '../components/progress-ring.js'
import FoodListItem from '../components/food-list-item.js'
import FoodListItemImage from '../components/food-list-item-image.js'

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
    generalSuggestions: () => [
      { title: "Breakfast", img: './images/food/breakfast.jpg' },
      { title: 'Lunch', img: './images/food/lunch.jpg' },
      { title: 'Dinner', img: './images/food/dinner.jpg' }
    ],
    suggestions: () => ['Sweet', 'Hearty', 'Vegi', 'Vegan', 'Fast', 'Light', 'Heavy', 'Warm', 'Cold']
  },
  template:
  `<page :title="title" parent="/nutrition">
    <div class="text-center">
      <progress-ring radius="64" :progress="progress" stroke="8"></progress-ring>
      <h2>{{ secondaryTitle }}</h2>
    </div>
    <div class="grid-2 gap-16">
      <food-list-item v-for="(item, index) in items" :key="index" :link="'/nutrition/' + writtenType + '/add-food?item=' + index" :title="item.title" :icon="icon"></food-list-item>
      <food-list-item :link="'/nutrition/' + writtenType + '/add-food'" title="Add Item" icon="add"></food-list-item>
    </div>
    <h2 class="text-center">What You Could Eat</h2>
    <div class="grid-1-3 gap-16">
      <food-list-item-image v-for="item in generalSuggestions" :key="item.title" :title="item.title" :image="item.img"></food-list-item-image>
    </div>
    <h2 class="text-center">Our Suggestions</h2>
    <div class="grid-2 gap-16">
      <food-list-item v-for="item in suggestions" :key="item" :title="item" :icon="icon"></food-list-item>
    </div>
  </page>`,
  components: {
      Page,
      ProgressRing,
      FoodListItem,
      FoodListItemImage
  }
}
