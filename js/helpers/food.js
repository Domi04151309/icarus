import JsonHelper from './json.js'

import Food from '../data/food.js'

const SCORES = 'food_scores'
const RECENTS = 'food_recents'
const STATISTICS = 'food_statistics'
const PARAMETER_LIST = ['calories', 'fat', 'carbs', 'proteins']

export default {
  getRecommended(length = 2) {
    const images = ['./images/food/breakfast.jpg', './images/food/lunch.jpg']
    const scores = JsonHelper.get(SCORES, () => this.generateNewScores())
    const recents = JsonHelper.get(RECENTS, () => [])
    let food = JSON.parse(JSON.stringify(this.getHealthyFood()))
    recents.forEach(item => {
      scores[item] = 0
    })
    food.forEach((item, i) => {
      item.link = '/nutrition/healthy/food-details?item=' + i
      item.i = i
    })
    food.sort((a, b) => scores[b.i] - scores[a.i])
    food = food.slice(0, length)
    food.forEach((item, i) => {
      item.image = images[i]
    })
    return food
  },
  addRecent(position) {
    const recents = JsonHelper.get(RECENTS, () => [])
    recents.unshift(position)
    JsonHelper.set(RECENTS, recents.slice(0, 4))
  },
  getHealthyFood() {
    return this.filterFood(JsonHelper.get('healthy-food', () => Food.healthy))
  },
  getCasualFood() {
    return this.filterFood(JsonHelper.get('casual-food', () => Food.casual))
  },
  filterFood(array) {
    const nutrition = JsonHelper.get('nutrition', () => null)
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
    return JsonHelper.get(STATISTICS, () => this.defaultFoodStatistics)
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
      JsonHelper.set(STATISTICS, object)
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
      JsonHelper.set(STATISTICS, object)
    } catch (e) {
      console.warn(e)
    }
  },
  generateNewScores() {
    const array = []
    this.getHealthyFood().forEach(item => {
      array.push(this.calculateScore(item))
    })
    JsonHelper.set(SCORES, array)
    return array
  },
  calculateScore(food) {
    const fitness = JsonHelper.get('fitness')
    const nutrition = JsonHelper.get('nutrition')

    let score = 100 * PARAMETER_LIST.length
    score += PARAMETER_LIST.reduce((acc, item) => acc + parseInt(fitness.muscleGain, 10) * parseInt(food[item], 10), 0)
    score += PARAMETER_LIST.reduce((acc, item) => acc - parseInt(nutrition.fatLoss, 10) * parseInt(food[item], 10), 0)

    return score / 100
  }
}
