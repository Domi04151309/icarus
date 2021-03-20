/*global Vue*/

import Page from '../components/page-large-app-bar.js'
import Modal from '../components/modal.js'

import FoodHelper from '../helpers/food.js'
import Identifiers from '../helpers/identifiers.js'

//TODO: Add content

export default {
  name: 'food-details',
  props: {
    healthy: Boolean
  },
  data() {
    return {
      foodItem: {
        title: '',
        calories: 0,
        carbs: 0,
        proteins: 0,
        fat: 0
      }
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
  `<page :title="foodItem.title" :parent="parent" :class="writtenType">
    <div class="card mb-16-p-16">
      <h2>Description</h2>
      <p>{{ foodItem.description || 'No description provided' }}</p>
    </div>
    <div class="card mb-16-p-16">
      <h2>Preparation</h2>
      <p>{{ foodItem.preparation || 'No instructions provided' }}</p>
    </div>
    <div class="card mb-16-p-16">
      <h2>Values</h2>
      <div class="grid-2 gap-16">
        <div>
          <label for="calories">Calories</label>
          <input id="calories" v-model="foodItem.calories" type="number"></input>
        </div>
        <div>
          <label for="carbs">Carbs</label>
          <input id="carbs" v-model="foodItem.carbs" type="number"></input>
        </div>
        <div class="mb-16">
          <label for="proteins">Proteins</label>
          <input id="proteins" v-model="foodItem.proteins" type="number"></input>
        </div>
        <div class="mb-16">
          <label for="fat">Fat</label>
          <input id="fat" v-model="foodItem.fat" type="number"></input>
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
            else foodArray = FoodHelper.getNotSoHealthyFood()
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
      var dateId = Identifiers.getDateId()
      localStorage.setItem(
        dateId + '_calories',
        (parseInt(localStorage.getItem(dateId + '_calories'), 10) || 0) + this.foodItem.calories
      )
      localStorage.setItem(
        dateId + '_carbs',
        (parseInt(localStorage.getItem(dateId + '_carbs'), 10) || 0) + this.foodItem.carbs
      )
      localStorage.setItem(
        dateId + '_proteins',
        (parseInt(localStorage.getItem(dateId + '_proteins'), 10) || 0) + this.foodItem.proteins
      )
      localStorage.setItem(
        dateId + '_fat',
        (parseInt(localStorage.getItem(dateId + '_fat'), 10) || 0) + this.foodItem.fat
      )
      if (this.healthy) FoodHelper.addOneHealthyFoodToStatistics()
      else FoodHelper.addOneNotSoHealthyFoodToStatistics()
      this.$router.push(this.parent)
    }
  },
  created() {
    if (this.$route.query.item != null) {
      if (this.healthy)
        this.foodItem = FoodHelper.getHealthyFood()[this.$route.query.item]
      else
        this.foodItem = FoodHelper.getNotSoHealthyFood()[this.$route.query.item]
    }
  },
  mounted() {
    if (this.$route.query.item == null) {
      this.$router.push('/nutrition/' + this.writtenType + '/food-item')
    }
  }
}
