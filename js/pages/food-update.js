/*global Vue*/

import Page from '../components/page.js'
import FoodListItem from '../components/food-list-item.js'
import Modal from '../components/modal.js'

import Food from '../data/food.js'
import FoodHelper from '../helpers/food.js'
import JsonHelper from '../helpers/json.js'

const CATEGORY_HEALTHY = 1
const CATEGORY_CASUAL = 2

export default {
  name: 'food-update',
  data() {
    return {
      items: [],
      localHealthy: JsonHelper.get('healthy-food', () => JSON.parse(JSON.stringify(Food.healthy))),
      localCasual: JsonHelper.get('casual-food', () => JSON.parse(JSON.stringify(Food.casual)))
    }
  },
  template:
  `<page title="Nutrition Updates" parent="/nutrition" class="green">
    <p class="mb-24">
      Find new food items that we added and that are not yet present in your local database below.
    </p>
    <div class="grid-2 gap-16 search">
      <food-list-item v-for="(item, index) in items" :key="index" v-on:click.native="onItemClicked(index)" :title="item.title" icon="menu_book"></food-list-item>
    </div>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">sync</div>
  </page>`,
  components: {
    Page,
    FoodListItem
  },
  methods: {
    addItem(item) {
      const category = item.category
      delete item.category
      if (category == CATEGORY_HEALTHY) this.localHealthy.push(item)
      else this.localCasual.push(item)
    },
    storeData() {
      localStorage.setItem('healthy-food', JSON.stringify(this.localHealthy))
      localStorage.setItem('casual-food', JSON.stringify(this.localCasual))
      FoodHelper.generateNewScores()
    },
    onItemClicked(index) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Add Item',
          message: 'Do you want to add "' + this.items[index].title + '" to your local list?',
          positiveText: 'Yes',
          negativeText: 'No',
          positiveFunction: () => {
            this.addItem(this.items[index])
            this.storeData()
            this.items.splice(index, 1)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onFabClicked() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Add All Items',
          message: 'Are you sure you want to add all items to your local list?',
          positiveText: 'Yes',
          negativeText: 'No',
          positiveFunction: () => {
            this.items.forEach(item => this.addItem(item))
            this.storeData()
            this.items = []
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)

    const healthy = JSON.parse(JSON.stringify(Food.healthy))
    healthy.forEach(item => item.category = CATEGORY_HEALTHY)
    const casual = JSON.parse(JSON.stringify(Food.casual))
    casual.forEach(item => item.category = CATEGORY_CASUAL)
    const whole = healthy.concat(casual)
    const localWhole = this.localHealthy.concat(this.localCasual)

    whole.forEach(item => {
      if (!localWhole.some(a => a.title == item.title)) this.items.push(item)
    })

    this.items.sort((a, b) => a.title.localeCompare(b.title))
  }
}
