/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'
import ModalInput from '../components/modal-input.js'

import FoodHelper from '../helpers/food.js'
import Identifiers from '../helpers/identifiers.js'

//TODO: Dynamic suggestions

export default {
  name: 'add-food',
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
    title: () => 'Add Food',
    parent() {
      if (this.healthy) return '/experience/healthy'
      else return '/experience/not-so-healthy'
    },
    icon() {
      if (this.healthy) return 'restaurant_menu'
      else return 'fastfood'
    }
  },
  template:
  '<page :title="title" :parent="parent">\
    <h2 class="flex center mt-0">\
      <div class="material-icons-round accent img">{{ icon }}</div>\
      <div>{{ foodItem.title }}</div>\
    </h2>\
    <p class="mb-16">\
      Below you can see the values of this item.\
      Use the button in the bottom right corner to complete the action.\
    </p>\
    <div ref="title">\
      <label for="foodTitle">Title</label>\
      <input id="foodTitle" v-model="foodItem.title" class="simple-input mb-16" type="text" autocomplete="off"></input>\
    </div>\
    <div class="grid-2 gap-16 mb-16">\
      <div>\
        <label for="calories">Calories</label>\
        <input id="calories" v-model="foodItem.calories" class="simple-input" type="number" value="0"></input>\
      </div>\
      <div>\
        <label for="carbs">Carbs</label>\
        <input id="carbs" v-model="foodItem.carbs" class="simple-input" type="number" value="0"></input>\
      </div>\
      <div class="mb-16">\
        <label for="proteins">Proteins</label>\
        <input id="proteins" v-model="foodItem.proteins" class="simple-input" type="number" value="0"></input>\
      </div>\
      <div class="mb-16">\
        <label for="fat">Fat</label>\
        <input id="fat" v-model="foodItem.fat" class="simple-input" type="number" value="0"></input>\
      </div>\
      <button ref="rename" type="button" v-on:click="onRenameClicked()">Rename</button>\
      <button ref="delete" type="button" v-on:click="onDeleteClicked()">Delete</button>\
    </div>\
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>\
  </page>',
  methods: {
    onRenameClicked() {
      var ComponentClass = Vue.extend(ModalInput)
      var instance = new ComponentClass({
        propsData: {
          title: 'Rename Item',
          inputType: 'text',
          initialValue: this.foodItem.title,
          positiveFunction: () => {
            var foodArray = []
            if (this.healthy) foodArray = FoodHelper.getHealthyFood()
            else foodArray = FoodHelper.getNotSoHealthyFood()
            if (this.$route.query.item != undefined) {
              this.foodItem.title = instance.$refs.input.value
              foodArray[this.$route.query.item].title = instance.$refs.input.value
              if (this.healthy) localStorage.setItem('healthy-food', JSON.stringify(foodArray))
              else localStorage.setItem('not-so-healthy-food', JSON.stringify(foodArray))
            }
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
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
            if (this.$route.query.item != undefined) {
              foodArray.splice(this.$route.query.item, 1)
              if (this.healthy) localStorage.setItem('healthy-food', JSON.stringify(foodArray))
              else localStorage.setItem('not-so-healthy-food', JSON.stringify(foodArray))
            }
            this.$router.push(this.parent)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    onFabClicked() {
      var foodArray = []
      if (this.healthy) foodArray = FoodHelper.getHealthyFood()
      else foodArray = FoodHelper.getNotSoHealthyFood()
      if (this.$route.query.item == undefined) {
        foodArray.push(this.foodItem)
        if (this.healthy) localStorage.setItem('healthy-food', JSON.stringify(foodArray))
        else localStorage.setItem('not-so-healthy-food', JSON.stringify(foodArray))
      } else {
        foodArray[this.$route.query.item] = this.foodItem
        if (this.healthy) localStorage.setItem('healthy-food', JSON.stringify(foodArray))
        else localStorage.setItem('not-so-healthy-food', JSON.stringify(foodArray))

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
      this.$refs.title.classList.add('hidden')
    } else {
      this.$refs.rename.classList.add('hidden')
      this.$refs.delete.classList.add('hidden')
    }
    setTimeout(() => { this.$refs.fab.classList.remove('hidden') }, 500)
  },
  components: {
      Page
  }
}
