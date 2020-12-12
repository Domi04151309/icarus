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
    var array = []
    try {
      array = JSON.parse(localStorage.getItem('healthy-food'))
    } catch (e) {
      console.warn(e)
      array = undefined
    }
    return array || this.defaultHealthyFood
  },
  getNotSoHealthyFood() {
    var array = []
    try {
      array = JSON.parse(localStorage.getItem('not-so-healthy-food'))
    } catch (e) {
      console.warn(e)
      array = undefined
    }
    return array || this.defaultNotSoHealthyFood
  },
  defaultFoodStatistics: {
    healthy: 0,
    notSoHealthy: 0
  },
  getFoodStatistics() {
    var object = {}
    try {
      object = JSON.parse(localStorage.getItem('food-statistics'))
    } catch (e) {
      console.warn(e)
      object = this.defaultFoodStatistics
    }
    return object || this.defaultFoodStatistics
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
