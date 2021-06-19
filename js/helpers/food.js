import JsonHelper from './json.js'

import Food from '../data/food.js'

const SCORES = 'food_scores'
const RECENTS = 'food_recents'
const STATISTICS = 'food_statistics'

export default {
  getRecommended(length = 2) {
    const images = ['./images/food/breakfast.jpg', './images/food/lunch.jpg', './images/food/dinner.jpg', './images/food/healthy.jpg']
    const scores = JsonHelper.get(SCORES, () => this.generateNewScores())
    const recents = JsonHelper.get(RECENTS, () => [])
    let food = this.getHealthyFood()
    recents.forEach(item => {
      scores[item] = 0
    })
    food.forEach((item, i) => {
      item.link = '/nutrition/healthy/food-details?item=' + i
      item.i = i
    })
    food.sort((a, b) => scores[b.i] - scores[a.i])
    food = food.slice(0, length)

    let imageCounter = 0
    food.forEach(item => {
      item.image = images[imageCounter]
      if (imageCounter < images.length - 1) imageCounter++
      else imageCounter = 0
    })
    return food
  },
  addRecent(position) {
    const recents = JsonHelper.get(RECENTS, () => [])
    recents.unshift(position)
    JsonHelper.set(RECENTS, recents.slice(0, 8))
  },
  getHealthyFood() {
    return this.filterFood(JsonHelper.get('healthy-food', () => JSON.parse(JSON.stringify(Food.healthy))))
  },
  getCasualFood() {
    return this.filterFood(JsonHelper.get('casual-food', () => JSON.parse(JSON.stringify(Food.casual))))
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

    const fatLoss = parseInt(nutrition.fatLoss, 10)
    const muscleGain = parseInt(fitness.muscleGain, 10)
    const lessSweets = nutrition.lessSweets ? 100 : 0
    const endurance = parseInt(fitness.endurance, 10)
    const moreWater = nutrition.moreWater ? 100 : 0

    const PARAMETER_LIST = ['calories', 'fat', 'carbs', 'sugar', 'protein', 'alcohol']
    const MODIFIERS_FAT_LOSS = [-1, -1, -1, 0, 1, -1]
    const MODIFIERS_MUSCLE_GAIN = [1, 1, 1, 0, 1, -1]
    const MODIFIERS_LESS_SWEETS = [0, 0, -1, -1, 0, 0]
    const MODIFIERS_ENDURANCE = [0, 0, 1, 0, 1, -1]
    const MODIFIERS_MORE_WATER = [0, 0, 0, 0, 0, -1]

    let score = 100 * PARAMETER_LIST.length
    score += PARAMETER_LIST.reduce((acc, key, i) => {
      const normalizedPropertyValue = parseInt(food[key], 10) / parseInt(food.portion, 10) * parseInt(food.serving, 10)
      return acc
        + fatLoss * normalizedPropertyValue * MODIFIERS_FAT_LOSS[i]
        + muscleGain * normalizedPropertyValue * MODIFIERS_MUSCLE_GAIN[i]
        + lessSweets * normalizedPropertyValue * MODIFIERS_LESS_SWEETS[i]
        + endurance * normalizedPropertyValue * MODIFIERS_ENDURANCE[i]
        + moreWater * normalizedPropertyValue * MODIFIERS_MORE_WATER[i]
    }, 0)

    return score / 100
  }
}
