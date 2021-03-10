import JsonHelper from './json.js'

export default {
  defaultHealthyFood: [
    {
      title: 'Apple',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    },
    {
      title: 'Banana',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    },
    {
      title: 'Salad',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    }
  ],
  defaultNotSoHealthyFood: [
    {
      title: 'Hamburger',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    },
    {
      title: 'Cheeseburger',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    },
    {
      title: 'Fries',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    }
  ],
  getHealthyFood() {
    return JsonHelper.getData('healthy-food') || this.defaultHealthyFood
  },
  getNotSoHealthyFood() {
    return JsonHelper.getData('casual-food') || this.defaultNotSoHealthyFood
  },
  defaultFoodStatistics: {
    healthy: 0,
    notSoHealthy: 0
  },
  getFoodStatistics() {
    return JsonHelper.getData('food-statistics') || this.defaultFoodStatistics
  },
  addOneHealthyFoodToStatistics() {
    var object = {}
    try {
      object = this.getFoodStatistics()
      object.healthy += 1
      localStorage.setItem('food-statistics', JSON.stringify(object))
    } catch (e) {
      console.warn(e)
    }
  },
  addOneNotSoHealthyFoodToStatistics() {
    var object = {}
    try {
      object = this.getFoodStatistics()
      object.notSoHealthy += 1
      localStorage.setItem('food-statistics', JSON.stringify(object))
    } catch (e) {
      console.warn(e)
    }
  }
}
