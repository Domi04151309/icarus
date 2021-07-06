import PageNoAppBar from '../../components/page-no-app-bar.js'
import RangeInput from '../../components/range-input.js'
import SimpleQuestion from '../../components/simple-question.js'

import FoodHelper from '../../helpers/food.js'

export default {
  name: 'setup-nutrition',
  data() {
    return {
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
  `<div>
    <div class="setup-image nutrition"></div>
    <page-no-app-bar class="setup-text">
      <h1>Nutrition</h1>
      <p class="mb-32">Please answer the questions below so that we know your goals.</p>
      <range-input title="Fat loss" class="mb-16" v-model.number="nutrition.fatLoss"></range-input>
      <simple-question question="Do you want to eat less sweets?" class="mb-16" v-model="nutrition.lessSweets"></simple-question>
      <simple-question question="Do you want to drink more water?" class="mb-16" v-model="nutrition.moreWater"></simple-question>
      <simple-question question="Are you vegetarian?" class="mb-16" v-model="nutrition.vegetarian"></simple-question>
      <simple-question question="Are you vegan?" class="mb-16" v-model="nutrition.vegan"></simple-question>
      <button type="button" v-on:click="handleClick()" class="mt-8">Continue</button>
    </page-no-app-bar>
  </div>`,
  components: {
    PageNoAppBar,
    RangeInput,
    SimpleQuestion
  },
  methods: {
    handleClick() {
      localStorage.setItem('nutrition', JSON.stringify(this.nutrition))
      FoodHelper.generateNewScores()
      this.$router.push('/setup/fitness')
    }
  },
  created() {
    const stored = localStorage.getItem('nutrition')
    if (stored != null) this.nutrition = JSON.parse(stored)
  }
}
