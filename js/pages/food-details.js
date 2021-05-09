/*global Vue*/

import Page from '../components/page-large-app-bar.js'
import Modal from '../components/modal.js'

import FoodHelper from '../helpers/food.js'
import { DayHelper } from '../helpers/progress.js'

const FOOD_PARAMETERS = ['calories', 'fat', 'carbs', 'sugar', 'proteins', 'alcohol']

//TODO: Add content

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
      if (this.healthy) return '/nutrition/healthy'
      else return '/nutrition/casual'
    },
    writtenType() {
      if (this.healthy) return 'healthy'
      else return 'casual'
    }
  },
  template:
  `<page :title="foodItem.title" :parent="parent" :class="writtenType + ' green'">
    <div class="card mb-16-p-16">
      <h2>Description</h2>
      <p>{{ foodItem.description || 'No description provided' }}</p>
    </div>
    <div class="card mb-16-p-16">
      <h2>Preparation</h2>
      <p>{{ foodItem.preparation || 'No instructions provided' }}</p>
    </div>
    <div class="card mb-16-p-16">
      <h2>Portion <small class="p">({{ foodItem.unit }})</small></h2>
      <input v-model="foodItem.serving" aria-label="Portion" type="number"></input>
    </div>
    <div class="card mb-16-p-16">
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
          <label for="proteins">Protein (g)</label>
          <input readonly id="proteins" :value="getActualValue(foodItem.proteins)" type="number"></input>
        </div>
        <div>
          <label for="alcohol">Alcohol (vol)<label>
          <input readonly id="alcohol" :value="getActualValue(foodItem.alcohol)" type="number"></input>
        </div>
      </div>
    </div>
    <div class="grid-2 gap-16 mb-16">
      <button type="button" v-on:click="onEditClicked()">Edit</button>
      <button type="button" v-on:click="onDeleteClicked()">Delete</button>
    </div>
    <button class="w-100" type="button" v-on:click="onConsumeClicked()">Consume</button>
  </page>`,
  components: {
      Page
  },
  methods: {
    getActualValue(value) {
      return Math.round(value / this.foodItem.portion * this.foodItem.serving)
    },
    onEditClicked() {
      this.$router.push('/nutrition/' + this.writtenType + '/food-item?item=' + this.$route.query.item)
    },
    onDeleteClicked() {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Delete Item',
          message: 'Are you sure you want to delete this item? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            var foodArray = []
            if (this.healthy) foodArray = FoodHelper.getHealthyFood()
            else foodArray = FoodHelper.getCasualFood()
            if (this.$route.query.item != null) {
              foodArray.splice(this.$route.query.item, 1)
              if (this.healthy) localStorage.setItem('healthy-food', JSON.stringify(foodArray))
              else localStorage.setItem('casual-food', JSON.stringify(foodArray))
            }
            setTimeout(() => { this.$router.push(this.parent) }, 1000)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onConsumeClicked() {
      var dayHelper = new DayHelper()
      FOOD_PARAMETERS.forEach(item => {
        dayHelper.progress[item] += this.getActualValue(this.foodItem[item])
      })
      dayHelper.saveProgress()

      if (this.healthy) FoodHelper.addHealthyFoodToStatistics(this.foodItem)
      else FoodHelper.addCasualFoodToStatistics(this.foodItem)
      navigator.vibrate(1)
      this.$router.push(this.parent)
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
    if (this.$route.query.item == null) {
      this.$router.push('/nutrition/' + this.writtenType + '/food-item')
    }
  }
}
