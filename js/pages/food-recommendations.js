import Page from '../components/page.js'
import FoodListItem from '../components/food-list-item.js'
import ListItemImage from '../components/list-item-image.js'

import JsonHelper from '../helpers/json.js'
import FoodHelper from '../helpers/food.js'
import { MaxProgress, DayHelper } from '../helpers/progress.js'

export default {
  name: 'exercise-details',
  data() {
    return {
      situationRecommendations: []
    }
  },
  computed: {
    title: () => 'Our Recommendations',
    recommendations: () => FoodHelper.getRecommended(4)
  },
  template:
  `<page :title="title" parent="/nutrition" class="green">
    <h2 class="mx-8 mt-0 mb-24">Based On Your Progress</h2>
    <div class="grid-1-2 gap-16">
      <div v-for="(item, i) in situationRecommendations" :key="i" class="card">
        <list-item-image
          :title="item.title"
          :image="item.image"
          :link="'/nutrition/healthy/food-details?item=' + item.i">
        </list-item-image>
        <p class="m-0 p-16">{{ item.title }} {{ item.summary }}</p>
      </div>
    </div>
    <h2 class="mx-8 mt-48 mb-24">Our Top Picks For You</h2>
    <div class="grid-1-2 gap-16">
      <list-item-image
        v-for="item in recommendations"
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
    const progressHelper = new DayHelper()
    const food = FoodHelper.getHealthyFood()
    const recents = JsonHelper.get('food_recents', () => [])
    food.forEach((item, i) => item.i = i)
    recents.forEach(item => {
      food[item].fat = 0
      food[item].carbs = 0
      food[item].proteins = 0
    })

    const data = [
      {
        key: 'fat',
        image: './images/food/fat.jpg',
        summary: 'is great for getting more fat'
      },
      {
        key: 'carbs',
        image: './images/food/carbs.jpg',
        summary: 'is great for getting more carbs'
      },
      {
        key: 'proteins',
        image: './images/food/protein.jpg',
        summary: 'is great for getting more protein'
      }
    ]

    data.forEach(item => {
      const recommendation = JSON.parse(JSON.stringify(food.reduce((a, b) => a[item.key] / a.portion * a.serving > b[item.key] / b.portion * b.serving ? a : b)))
      recommendation.image = item.image
      recommendation.summary = item.summary
      recommendation.percent = progressHelper.progress[item.key] / MaxProgress[item.key]
      this.situationRecommendations.push(recommendation)
    })
    this.situationRecommendations.sort((a, b) => a.percent - b.percent)
  }
}
