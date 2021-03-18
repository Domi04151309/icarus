import Page from '../components/page-large-app-bar.js'
import FoodListItem from '../components/food-list-item.js'

//TODO: Dynamically generate content

export default {
  name: 'exercise-details',
  computed: {
    title: () => 'Our Suggestions',
    suggestions: () => ['Sweet', 'Hearty', 'Vegi', 'Vegan', 'Fast', 'Light', 'Heavy', 'Warm', 'Cold']
  },
  template:
  `<page :title="title" parent="/nutrition" class="healthy">
    <div class="grid-2 gap-16" v-on:click="alert('Not yet implemented!')">
      <food-list-item v-for="item in suggestions" :key="item" :title="item" icon="restaurant_menu"></food-list-item>
    </div>
  </page>`,
  components: {
      Page,
      FoodListItem
  }
}
