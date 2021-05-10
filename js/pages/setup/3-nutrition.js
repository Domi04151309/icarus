import PageNoAppBar from '../../components/page-no-app-bar.js'
import SimpleQuestion from '../../components/simple-question.js'

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
    <div class="setup-image info"></div>
    <page-no-app-bar class="setup-text">
      <h1>Nutrition</h1>
      <p class="mb-32">Please answer the questions below so that we know your goals.</p>
      <label for="fat_loss">Fat loss</label>
      <input id="fat_loss" class="mb-16" type="range" max="100" v-model="nutrition.fatLoss">
      <simple-question question="Do you want to eat less sweets?" class="mb-16" v-model="nutrition.lessSweets"></simple-question>
      <simple-question question="Do you want to drink more water?" class="mb-16" v-model="nutrition.moreWater"></simple-question>
      <simple-question question="Are you vegetarian?" class="mb-16" v-model="nutrition.vegetarian"></simple-question>
      <simple-question question="Are you vegan?" class="mb-16" v-model="nutrition.vegan"></simple-question>
      <button type="button" v-on:click="handleClick()">Continue</button>
    </page-no-app-bar>
  </div>`,
  components: {
      PageNoAppBar,
      SimpleQuestion
  },
  methods: {
    handleClick() {
      localStorage.setItem('nutrition', JSON.stringify(this.nutrition))
      this.$router.push('/setup/fitness')
    }
  },
  mounted() {
    const stored = localStorage.getItem('nutrition')
    if (stored != null) this.nutrition = JSON.parse(stored)
  }
}
