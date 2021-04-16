import JsonHelper from './json.js'

import Food from '../data/food.js'

export default {
  getHealthyFood() {
    return JsonHelper.getData('healthy-food', () => Food.healthy)
  },
  getNotSoHealthyFood() {
    return JsonHelper.getData('casual-food', () => Food.casual)
  },
  defaultFoodStatistics: {
    healthy: [],
    notSoHealthy: []
  },
  getFoodStatistics() {
    return JsonHelper.getData('food-statistics', () => this.defaultFoodStatistics)
  },
  addOneHealthyFoodToStatistics() {
    var date = new Date()
    var object = {}
    try {
      object = this.getFoodStatistics()
      object.healthy.push({
        time: date.getTime()
      })
      localStorage.setItem('food-statistics', JSON.stringify(object))
    } catch (e) {
      console.warn(e)
    }
  },
  addOneNotSoHealthyFoodToStatistics() {
    var date = new Date()
    var object = {}
    try {
      object = this.getFoodStatistics()
      object.notSoHealthy.push({
        time: date.getTime()
      })
      localStorage.setItem('food-statistics', JSON.stringify(object))
    } catch (e) {
      console.warn(e)
    }
  }
}
