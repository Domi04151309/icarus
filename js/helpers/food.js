import JsonHelper from './json.js'

import Food from '../data/food.js'

const STATISTICS = 'food_statistics'

export default {
  getRecommended() {
    const images = ['./images/food/breakfast.jpg', './images/food/lunch.jpg']
    let food = JSON.parse(JSON.stringify(this.getHealthyFood()))
    food.forEach((item, i) => {
      item.link = '/nutrition/healthy/food-details?item=' + i
    })
    food = food.sort(() => 0.5 - Math.random()).slice(0, 2)
    food.forEach((item, i) => {
      item.image = images[i]
    })
    return food
  },
  getHealthyFood() {
    return this.filterFood(JsonHelper.getData('healthy-food', () => Food.healthy))
  },
  getCasualFood() {
    return this.filterFood(JsonHelper.getData('casual-food', () => Food.casual))
  },
  filterFood(array) {
    const nutrition = JsonHelper.getData('nutrition', () => null)
    let items = array
    if (nutrition?.vegetarian) items = items.filter(item => item.vegetarian == true)
    if (nutrition?.vegan) items = items.filter(item => item.vegan == true)
    return items
  },
  defaultFoodStatistics: {
    healthy: [],
    casual: []
  },
  getFoodStatistics() {
    return JsonHelper.getData(STATISTICS, () => this.defaultFoodStatistics)
  },
  addHealthyFoodToStatistics(item = null) {
    const date = new Date()
    let object = {}
    try {
      object = this.getFoodStatistics()
      object.healthy.push({
        time: date.getTime(),
        item: item
      })
      localStorage.setItem(STATISTICS, JSON.stringify(object))
    } catch (e) {
      console.warn(e)
    }
  },
  addCasualFoodToStatistics(item = null) {
    const date = new Date()
    let object = {}
    try {
      object = this.getFoodStatistics()
      object.casual.push({
        time: date.getTime(),
        item: item
      })
      localStorage.setItem(STATISTICS, JSON.stringify(object))
    } catch (e) {
      console.warn(e)
    }
  }
}
