import Page from '../components/page.js'
import SimpleQuestion from '../components/simple-question.js'

import FoodHelper from '../helpers/food.js'

export default {
  name: 'food-item',
  props: {
    healthy: Boolean
  },
  data() {
    return {
      foodItem: {
        title: 'New Food Item',
        unit: 'g',
        portion: 100,
        serving: 100,
        calories: 0,
        fat: 0,
        carbs: 0,
        sugar: 0,
        protein: 0,
        alcohol: 0,
        vegetarian: false,
        vegan: false
      }
    }
  },
  computed: {
    title: () => 'Food Item',
    parent() {
      if (this.$route.query.item) {
        return this.healthy
          ? '/nutrition/healthy/food-details?item=' + this.$route.query.item
          : '/nutrition/casual/food-details?item=' + this.$route.query.item
      } else {
        return this.healthy ? '/nutrition/healthy' : '/nutrition/casual'
      }
    },
    icon() {
      return this.healthy ? 'restaurant_menu' : 'fastfood'
    }
  },
  template:
  `<page :title="title" :parent="parent" class="green">
    <h2 class="flex center mt-0">
      <div class="material-icons-round accent img">{{ icon }}</div>
      <div>{{ foodItem.title }}</div>
    </h2>
    <p class="mb-16">
      Below you can see the values of this item.
      Use the button in the bottom right corner to save the item.
    </p>
    <label for="title">Title</label>
    <input id="title" v-model="foodItem.title" class="mb-16" type="text" autocomplete="off"></input>
    <label for="description">Description</label>
    <textarea id="description" v-model="foodItem.description" class="mb-16" autocomplete="off"></textarea>
    <label for="preparation">Preparation</label>
    <textarea id="preparation" v-model="foodItem.preparation" class="mb-16" autocomplete="off"></textarea>
    <label for="unit">Unit <small>(for portion and serving)<small></label>
    <select id="unit" v-model="foodItem.unit" class="mb-16">
      <option>g</option>
      <option>ml</option>
    </select>
    <div class="grid-2 gap-16 mb-48">
      <div>
        <label for="portion">Portion ({{ foodItem.unit }})</label>
        <input id="portion" v-model="foodItem.portion" type="number"></input>
      </div>
      <div>
        <label for="serving">Serving ({{ foodItem.unit }})</label>
        <input id="serving" v-model="foodItem.serving" type="number"></input>
      </div>
        <div>
          <label for="calories">Calories (kcal)</label>
          <input id="calories" v-model="foodItem.calories" type="number"></input>
        </div>
        <div>
          <label for="fat">Fat (g)</label>
          <input id="fat" v-model="foodItem.fat" type="number"></input>
        </div>
      <div>
        <label for="carbs">Carbs (g)</label>
        <input id="carbs" v-model="foodItem.carbs" type="number"></input>
      </div>
      <div>
        <label for="sugar">Sugar (g)</label>
        <input id="sugar" v-model="foodItem.sugar" type="number"></input>
      </div>
      <div>
        <label for="protein">Protein (g)</label>
        <input id="protein" v-model="foodItem.protein" type="number"></input>
      </div>
      <div>
        <label for="alcohol">Alcohol (vol)<label>
        <input id="alcohol" v-model="foodItem.alcohol" type="number"></input>
      </div>
      <simple-question question="Vegetarian" class="text-center mt-16" v-model="foodItem.vegetarian"></simple-question>
      <simple-question question="Vegan" class="text-center mt-16" v-model="foodItem.vegan"></simple-question>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
      Page,
      SimpleQuestion
  },
  methods: {
    onFabClicked() {
      let foodArray = []
      if (this.healthy) foodArray = FoodHelper.getHealthyFood()
      else foodArray = FoodHelper.getCasualFood()
      if (this.$route.query.item == null) {
        foodArray.push(this.foodItem)
        if (this.healthy) localStorage.setItem('healthy-food', JSON.stringify(foodArray))
        else localStorage.setItem('casual-food', JSON.stringify(foodArray))
      } else {
        foodArray[this.$route.query.item] = this.foodItem
        if (this.healthy) localStorage.setItem('healthy-food', JSON.stringify(foodArray))
        else localStorage.setItem('casual-food', JSON.stringify(foodArray))
      }
      FoodHelper.generateNewScores()
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
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
