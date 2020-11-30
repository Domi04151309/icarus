import Page from '../components/page.js'
import FoodListItem from '../components/food-list-item.js'

//TODO: Dynamically generate content

export default {
  name: 'healthy',
  data: () => {
    return {
      title: 'The Healthy',
      items: ['Apple', 'Banana', 'Salad'],
      generalSuggestions: ['Breakfast', 'Lunch', 'Dinner'],
      suggestions: ['Sweet', 'Hearty', 'Vegi', 'Vegan', 'Fast', 'Light', 'Heavy', 'Warm', 'Cold']
    }
  },
  template:
  '<page :title="title" parent="/experience">\
    <div class="text-center">\
      <img src="https://via.placeholder.com/256" alt="TODO: Add diagram">\
      <h2>Healthy Food</h2>\
    </div>\
    <div class="grid-2 gap-16">\
      <food-list-item v-for="item in items" :key="item" :title="item" icon="restaurant_menu"></food-list-item>\
      <food-list-item title="Add Item" icon="add"></food-list-item>\
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
      FoodListItem
  }
}
