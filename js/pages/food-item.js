import Page from '../components/page.js'

import FoodHelper from '../helpers/food.js'

export default {
  name: 'food-item',
  props: {
    healthy: Boolean
  },
  data() {
    return {
      foodItem: {
        title: 'New Food Item'
      }
    }
  },
  computed: {
    title: () => 'Food Item',
    parent() {
      if (this.$route.query.item) {
        if (this.healthy) return '/nutrition/healthy/food-details?item=' + this.$route.query.item
        else return '/nutrition/casual/food-details?item=' + this.$route.query.item
      } else {
        if (this.healthy) return '/nutrition/healthy'
        else return '/nutrition/casual'
      }
    },
    icon() {
      if (this.healthy) return 'restaurant_menu'
      else return 'fastfood'
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
    <label for="foodTitle">Title</label>
    <input id="foodTitle" v-model="foodItem.title" class="mb-16" type="text" autocomplete="off"></input>
    <label for="foodDescription">Description</label>
    <textarea id="foodDescription" v-model="foodItem.description" class="mb-16" autocomplete="off"></textarea>
    <label for="foodPreparation">Preparation</label>
    <textarea id="foodPreparation" v-model="foodItem.preparation" class="mb-16" autocomplete="off"></textarea>
    <div class="grid-2 gap-16 mb-16">
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
        <label for="proteins">Proteins (g)</label>
        <input id="proteins" v-model="foodItem.proteins" type="number"></input>
      </div>
      <div>
        <label for="alcohol">Alcohol (vol)<label>
        <input id="alcohol" v-model="foodItem.alcohol" type="number"></input>
      </div>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
      Page
  },
  methods: {
    onFabClicked() {
      var foodArray = []
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
