import Page from '../components/page.js'
import ProgressRing from '../components/progress-ring.js'
import FoodListItem from '../components/food-list-item.js'

import FoodHelper from '../helpers/food.js'

//TODO: Dynamically generate content

export default {
  name: 'healthy',
  data() {
    return {
      title: 'The Healthy',
      generalSuggestions: ['Breakfast', 'Lunch', 'Dinner'],
      suggestions: ['Sweet', 'Hearty', 'Vegi', 'Vegan', 'Fast', 'Light', 'Heavy', 'Warm', 'Cold']
    }
  },
  computed: {
    items: () => FoodHelper.getHealthyFood(),
    progress: () => {
      var statistics = FoodHelper.getFoodStatistics()
      return (statistics.healthy * 100) / (statistics.healthy + statistics.notSoHealthy)
    }
  },
  template:
  '<page :title="title" parent="/experience">\
    <div class="text-center">\
      <progress-ring radius="64" :progress="progress" stroke="8"></progress-ring>\
      <h2>Healthy Food</h2>\
    </div>\
    <div class="grid-2 gap-16">\
      <food-list-item v-for="(item, index) in items" :key="index" :link="\'/experience/add-food?healthy=1&item=\' + index" :title="item.title" icon="restaurant_menu"></food-list-item>\
      <food-list-item link="/experience/add-food?healthy=1" title="Add Item" icon="add"></food-list-item>\
    </div>\
    <h2 class="text-center">What You Could Eat</h2>\
    <div class="grid-3 gap-16">\
      <food-list-item v-for="item in generalSuggestions" :key="item" :title="item" icon="restaurant_menu"></food-list-item>\
    </div>\
    <h2 class="text-center">Our Suggestions</h2>\
    <div class="grid-2 gap-16">\
      <food-list-item v-for="item in suggestions" :key="item" :title="item" icon="restaurant_menu"></food-list-item>\
    </div>\
  </page>',
  components: {
      Page,
      ProgressRing,
      FoodListItem
  }
}
