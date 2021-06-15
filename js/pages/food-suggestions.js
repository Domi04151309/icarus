import Page from '../components/page-large-app-bar.js'
import FoodListItem from '../components/food-list-item.js'

import FoodHelper from '../helpers/food.js'

//TODO: Improve this site

export default {
  name: 'exercise-details',
  computed: {
    title: () => 'Our Suggestions',
    suggestions: () => FoodHelper.getRecommended(9)
  },
  template:
  `<page :title="title" parent="/nutrition" class="healthy green">
    <div class="grid-2 gap-16 disabled">
      <food-list-item v-for="(item, i) in suggestions" :key="i" :title="item.title" icon="restaurant_menu"></food-list-item>
    </div>
  </page>`,
  components: {
      Page,
      FoodListItem
  }
}
