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
    },
    {
      title: 'Orange',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    },
    {
      title: 'Lettuce',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    },
    {
      title: 'Fruit Salad',
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
    },
    {
      title: 'Chicken Wings',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    },
    {
      title: 'Pizza',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    },
    {
      title: 'Chickenburger',
      calories: 50,
      carbs: 50,
      proteins: 50,
      fat: 50
    }
  ],
  getHealthyFood() {
    return JsonHelper.getData('healthy-food', () => this.defaultHealthyFood)
  },
  getNotSoHealthyFood() {
    return JsonHelper.getData('casual-food', () => this.defaultNotSoHealthyFood)
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
