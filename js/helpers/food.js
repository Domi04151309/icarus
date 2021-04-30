import JsonHelper from './json.js'

import Food from '../data/food.js'

const STATISTICS = 'food_statistics'

export default {
  getRecommended() {
    var images = ['./images/food/breakfast.jpg', './images/food/lunch.jpg']
    var food = JSON.parse(JSON.stringify(this.getHealthyFood()))
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
    return JsonHelper.getData('healthy-food', () => Food.healthy)
  },
  getCasualFood() {
    return JsonHelper.getData('casual-food', () => Food.casual)
  },
  defaultFoodStatistics: {
    healthy: [],
    casual: []
  },
  getFoodStatistics() {
    return JsonHelper.getData(STATISTICS, () => this.defaultFoodStatistics)
  },
  addHealthyFoodToStatistics(item = null) {
    var date = new Date()
    var object = {}
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
    var date = new Date()
    var object = {}
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
