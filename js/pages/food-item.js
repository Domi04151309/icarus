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
        title: 'New Food Item',
        calories: 0,
        carbs: 0,
        proteins: 0,
        fat: 0
      }
    }
  },
  computed: {
    title: () => 'Food Item',
    parent() {
      if (this.healthy) return '/nutrition/healthy'
      else return '/nutrition/casual'
    },
    icon() {
      if (this.healthy) return 'restaurant_menu'
      else return 'fastfood'
    }
  },
  template:
  `<page :title="title" :parent="parent">
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
    <div class="grid-2 gap-16 mb-16">
      <div>
        <label for="calories">Calories</label>
        <input id="calories" v-model="foodItem.calories" type="number" value="0"></input>
      </div>
      <div>
        <label for="carbs">Carbs</label>
        <input id="carbs" v-model="foodItem.carbs" type="number" value="0"></input>
      </div>
      <div class="mb-16">
        <label for="proteins">Proteins</label>
        <input id="proteins" v-model="foodItem.proteins" type="number" value="0"></input>
      </div>
      <div class="mb-16">
        <label for="fat">Fat</label>
        <input id="fat" v-model="foodItem.fat" type="number" value="0"></input>
      </div>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  methods: {
    onFabClicked() {
      var foodArray = []
      if (this.healthy) foodArray = FoodHelper.getHealthyFood()
      else foodArray = FoodHelper.getNotSoHealthyFood()
      if (this.$route.query.item == undefined) {
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
  mounted() {
    if (this.$route.query.item != undefined) {
      if (this.healthy)
        this.foodItem = FoodHelper.getHealthyFood()[this.$route.query.item]
      else
        this.foodItem = FoodHelper.getNotSoHealthyFood()[this.$route.query.item]
    }
    setTimeout(() => { this.$refs.fab.classList.remove('hidden') }, 500)
  },
  components: {
      Page
  }
}
