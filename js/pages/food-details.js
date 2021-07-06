/*global Vue*/

import Page from '../components/page-large-app-bar.js'
import Modal from '../components/modal.js'

import FoodHelper from '../helpers/food.js'
import { DayHelper, Achievement } from '../helpers/progress.js'

const FOOD_PARAMETERS = ['calories', 'fat', 'carbs', 'sugar', 'protein', 'alcohol']

export default {
  name: 'food-details',
  props: {
    healthy: Boolean
  },
  data() {
    return {
      foodItem: {}
    }
  },
  computed: {
    parent() {
      return this.healthy ? '/nutrition/healthy' : '/nutrition/casual'
    },
    writtenType() {
      return this.healthy ? 'healthy' : 'casual'
    }
  },
  template:
  `<page :title="foodItem.title" :parent="parent" :class="writtenType + ' green'" :imgId="foodItem.image">
    <div class="card mb-16 p-16">
      <h2>Description</h2>
      <p>{{ foodItem.description || 'No description provided' }}</p>
    </div>
    <div v-if="foodItem.preparation" class="card mb-16 p-16">
      <h2>Preparation</h2>
      <p>{{ foodItem.preparation }}</p>
    </div>
    <div class="card mb-16 p-16">
      <h2>Information</h2>
      <ul class="link-list ignore-page-padding mt-8">
        <li><span><span :class="'material-icons-round ' + getColor('vegetarian')">{{ getIcon('vegetarian') }}</span>Vegetarian</span></li>
        <li><span><span :class="'material-icons-round ' + getColor('vegan')">{{ getIcon('vegan') }}</span>Vegan</span></li>
      </ul>
    </div>
    <div class="card mb-16 p-16">
      <h2>Portion <small class="p">({{ foodItem.unit }})</small></h2>
      <input v-model.number="foodItem.serving" aria-label="Portion" type="number"></input>
    </div>
    <div class="card mb-16 p-16">
      <h2>Values</h2>
      <div class="grid-2 gap-16 mb-16">
        <div>
          <label for="calories">Calories (kcal)</label>
          <input readonly id="calories" :value="getActualValue(foodItem.calories)" type="number"></input>
        </div>
        <div>
          <label for="fat">Fat (g)</label>
          <input readonly id="fat" :value="getActualValue(foodItem.fat)" type="number"></input>
        </div>
        <div>
          <label for="carbs">Carbs (g)</label>
          <input readonly id="carbs" :value="getActualValue(foodItem.carbs)" type="number"></input>
        </div>
        <div>
          <label for="sugar">Sugar (g)</label>
          <input readonly id="sugar" :value="getActualValue(foodItem.sugar)" type="number"></input>
        </div>
        <div>
          <label for="protein">Protein (g)</label>
          <input readonly id="protein" :value="getActualValue(foodItem.protein)" type="number"></input>
        </div>
        <div>
          <label for="alcohol">Alcohol (vol)<label>
          <input readonly id="alcohol" :value="getActualValue(foodItem.alcohol)" type="number"></input>
        </div>
      </div>
    </div>
    <div class="grid-2 gap-16 mb-48">
      <button type="button" class="two" v-on:click="onEditClicked()">Edit</button>
      <button type="button" class="two" v-on:click="onDeleteClicked()">Delete</button>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
    Page
  },
  methods: {
    getColor(key) {
      return this.foodItem[key] ? 'green' : 'red'
    },
    getIcon(key) {
      return this.foodItem[key] ? 'check_circle' : 'cancel'
    },
    getActualValue(value) {
      return Math.round(value / this.foodItem.portion * this.foodItem.serving)
    },
    onEditClicked() {
      this.$router.push('/nutrition/' + this.writtenType + '/item?item=' + this.$route.query.item)
    },
    onDeleteClicked() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Item',
          message: 'Are you sure you want to delete this item? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            let foodArray = []
            if (this.healthy) foodArray = FoodHelper.getHealthyFood()
            else foodArray = FoodHelper.getCasualFood()
            if (this.$route.query.item != null) {
              foodArray.splice(this.$route.query.item, 1)
              if (this.healthy) localStorage.setItem('healthy-food', JSON.stringify(foodArray))
              else localStorage.setItem('casual-food', JSON.stringify(foodArray))
              FoodHelper.generateNewScores()
            }
            setTimeout(() => { this.$router.push(this.parent) }, 1000)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onFabClicked() {
      const dayHelper = new DayHelper()
      FOOD_PARAMETERS.forEach(item => {
        dayHelper.progress[item] += this.getActualValue(this.foodItem[item])
      })
      dayHelper.saveProgress()

      if (this.healthy) {
        FoodHelper.addRecent(this.$route.query.item)
        FoodHelper.addHealthyFoodToStatistics(this.foodItem)
      }
      else FoodHelper.addCasualFoodToStatistics(this.foodItem)
      Achievement.show('Consumed something')
      this.$router.push('/nutrition')
    }
  },
  created() {
    if (this.$route.query.item != null) {
      if (this.healthy)
        this.foodItem = FoodHelper.getHealthyFood()[this.$route.query.item]
      else
        this.foodItem = FoodHelper.getCasualFood()[this.$route.query.item]
    }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
    if (this.$route.query.item == null) {
      this.$router.push('/nutrition/' + this.writtenType + '/item')
    }
  }
}
