import Page from '../components/page.js'
import FoodListItem from '../components/food-list-item.js'
import ListItemImage from '../components/list-item-image.js'

import JsonHelper from '../helpers/json.js'
import FoodHelper from '../helpers/food.js'

export default {
  name: 'exercise-details',
  data() {
    return {
      situationSuggestions: []
    }
  },
  computed: {
    title: () => 'Our Suggestions',
    suggestions: () => FoodHelper.getRecommended(4)
  },
  template:
  `<page :title="title" parent="/nutrition" class="green">
    <h2 class="mx-8 mt-0 mb-24">Based On Your Progress</h2>
    <div class="grid-1-2 gap-16">
      <div v-for="(item, i) in situationSuggestions" :key="i" class="card">
        <list-item-image
          :title="item.title"
          :image="item.image"
          :link="'/nutrition/healthy/food-details?item=' + item.i">
        </list-item-image>
        <p class="m-0 p-16">{{ item.title }} {{ item.summary }}</p>
      </div>
    </div>
    <h2 class="mx-8 mt-48 mb-24">General Suggestions</h2>
    <div class="grid-1-2 gap-16">
      <list-item-image
        v-for="item in suggestions"
        :key="item.title"
        :title="item.title"
        :image="item.image"
        :link="item.link">
      </list-item-image>
    </div>
  </page>`,
  components: {
      Page,
      FoodListItem,
      ListItemImage
  },
  created() {
    const recents = JsonHelper.get('food_recents', () => [])
    const food = FoodHelper.getHealthyFood()
    food.forEach((item, i) => item.i = i)
    recents.forEach(item => {
      food[item].fat = 0
      food[item].carbs = 0
      food[item].proteins = 0
    })

    const fat = food.reduce((a,b) => a.fat > b.fat ? a : b)
    fat.image = './images/food/fat.jpg'
    fat.summary = 'is great for getting more fat'
    this.situationSuggestions.push(fat)

    const carbs = food.reduce((a,b) => a.carbs > b.carbs ? a : b)
    carbs.image = './images/food/carbs.jpg'
    carbs.summary = 'is great for getting more carbs'
    this.situationSuggestions.push(carbs)

    const protein = food.reduce((a,b) => a.proteins > b.proteins ? a : b)
    protein.image = './images/food/protein.jpg'
    protein.summary = 'is great for getting more protein'
    this.situationSuggestions.push(protein)

    //TODO: Sort based on progress
  }
}
