export default {
  healthy: [
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
  notSoHealthy: [
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
    return array || this.healthy
  },
  getNotSoHealthyFood() {
    var array = []
    try {
      array = JSON.parse(localStorage.getItem('not-so-healthy-food'))
    } catch (e) {
      console.warn(e)
      array = undefined
    }
    return array || this.notSoHealthy
  }
}
