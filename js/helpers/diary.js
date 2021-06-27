import ExerciseHelper from '../helpers/exercises.js'
import FoodHelper from '../helpers/food.js'
import IndefiniteArticle from '../helpers/indefinite-article.js'
import JsonHelper from '../helpers/json.js'

export default {
  getItems() {
    const food = FoodHelper.getFoodStatistics()
    let items = []
    food.healthy.forEach(item => {
      item.type = 'nutrition'
      if (item.item != null) item.text = `You consumed ${IndefiniteArticle(item.item.title)} ${item.item.title.toLowerCase()}`
      else item.text = 'You consumed something healthy'
      if (item.item.unit == 'ml') item.icon = 'emoji_food_beverage'
      else item.icon = 'restaurant_menu'
      item.details = 'You earned 2 exp for this item!'
      items.push(item)
    })
    food.casual.forEach(item => {
      item.type = 'nutrition'
      if (item.item != null) item.text = `You consumed ${IndefiniteArticle(item.item.title)} ${item.item.title.toLowerCase()}`
      else item.text = 'You consumed something casual'
      if (item.item.unit == 'ml') item.icon = 'local_bar'
      else item.icon = 'fastfood'
      items.push(item)
    })
    ExerciseHelper.getStatistics().forEach(item => {
      item.type = 'exercise'
      if (item.item != null) item.text = item.item.title
      else item.text = 'You did an exercise'
      switch (item.item.category) {
        case 1:
          item.icon = 'self_improvement'
          break
        case 2:
          item.icon = 'fitness_center'
          break
        default:
          item.icon = 'directions_run'
      }
      item.details = 'You earned ' + item.item.exp + ' exp for this item!'
      items.push(item)
    })
    items = items.sort((a, b) => { return b.time - a.time })
    return items
  },
  deleteItem(time) {
    const equalTime = item => item.time == time
    let found = -1

    const food = FoodHelper.getFoodStatistics()
    found = food.healthy.findIndex(equalTime)
    if (found != -1) {
      food.healthy.splice(found, 1)
      JsonHelper.set('food_statistics', food)
      return
    }
    found = food.casual.findIndex(equalTime)
    if (found != -1) {
      food.casual.splice(found, 1)
      JsonHelper.set('food_statistics', food)
      return
    }

    const exercises = ExerciseHelper.getStatistics()
    found = exercises.findIndex(equalTime)
    if (found != -1) {
      exercises.splice(found, 1)
      JsonHelper.set('exercise_statistics', exercises)
      return
    }
  }
}
