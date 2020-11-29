import Page from '../components/page.js'
import FoodListItem from '../components/food-list-item.js'

//TODO: Dynamically generate content

export default {
  name: 'not-so-healthy',
  data: () => {
    return {
      title: 'The Not-So-Healthy',
      items: ['Hamburger', 'Cheseburger', 'Fries']
    }
  },
  template:
  '<page :title="title" parent="/experience">\
    <div class="text-center">\
      <img src="https://via.placeholder.com/256" alt="TODO: Add diagram">\
      <h2>Today\'s Intake of Not-So-Healthy Food</h2>\
    </div>\
    <div class="grid-2 gap-16">\
      <food-list-item v-for="item in items" :key="item" :title="item" icon="fastfood"></food-list-item>\
      <food-list-item title="Add Item" icon="add"></food-list-item>\
    </div>\
  </page>',
  components: {
      Page,
      FoodListItem
  }
}
