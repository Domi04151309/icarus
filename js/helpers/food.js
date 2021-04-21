import JsonHelper from './json.js'

import Food from '../data/food.js'

const STATISTICS = 'food_statistics'

export default {
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
