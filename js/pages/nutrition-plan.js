import Page from '../components/page.js'
import SimpleQuestion from '../components/simple-question.js'

import FoodHelper from '../helpers/food.js'

export default {
  name: 'nutrition-plan',
  data() {
    return {
      title: 'Nutrition Plan',
      nutrition: {
        fatLoss: 50,
        lessSweets: null,
        moreWater: null,
        vegetarian: null,
        vegan: null
      }
    }
  },
  template:
  `<page :title="title" parent="/account/data" class="text-center">
    <label for="fat_loss">Fat loss</label>
    <input id="fat_loss" class="mb-16" type="range" max="100" v-model="nutrition.fatLoss">
    <simple-question question="Do you want to eat less sweets?" class="mb-16" v-model="nutrition.lessSweets"></simple-question>
    <simple-question question="Do you want to drink more water?" class="mb-16" v-model="nutrition.moreWater"></simple-question>
    <simple-question question="Are you vegetarian?" class="mb-16" v-model="nutrition.vegetarian"></simple-question>
    <simple-question question="Are you vegan?" class="mb-16" v-model="nutrition.vegan"></simple-question>
    <button type="button" v-on:click="handleClick()">Save</button>
  </page>`,
  components: {
      Page,
      SimpleQuestion
  },
  methods: {
    handleClick() {
      localStorage.setItem('nutrition', JSON.stringify(this.nutrition))
      FoodHelper.generateNewScores()
      this.$router.push('/account/data')
    }
  },
  created() {
    const stored = localStorage.getItem('nutrition')
    if (stored != null) this.nutrition = JSON.parse(stored)
  }
}
