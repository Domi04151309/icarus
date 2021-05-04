import ExerciseHelper from '../helpers/exercises.js'
import FoodHelper from '../helpers/food.js'
import IndefiniteArticle from '../helpers/indefinite-article.js'

export default {
  getItems() {
    var items = []
    var food = FoodHelper.getFoodStatistics()
    food.healthy.forEach(item => {
      if (item.item != null) item.type = `You consumed ${IndefiniteArticle(item.item.title)} ${item.item.title.toLowerCase()}`
      else item.type = 'You consumed something healthy'
      item.icon = 'restaurant_menu'
      item.details = 'You gained one extra point with this item!'
      items.push(item)
    })
    food.casual.forEach(item => {
      if (item.item != null) item.type = `You consumed ${IndefiniteArticle(item.item.title)} ${item.item.title.toLowerCase()}`
      else item.type = 'You consumed something casual'
      item.icon = 'fastfood'
      items.push(item)
    })
    ExerciseHelper.getStatistics().forEach(item => {
      if (item.item != null) item.type = item.item.title
      else item.type = 'You did an exercise'
      item.icon = 'directions_run'
      item.details = 'You gained one extra point with this item!'
      items.push(item)
    })
    items = items.sort((a, b) => { return b.time - a.time })
    return items
  },
  deleteItem(time) {
    const equalTime = item => item.time == time
    var found = -1

    var food = FoodHelper.getFoodStatistics()
    found = food.healthy.findIndex(equalTime)
    if (found != -1) {
      food.healthy.splice(found, 1)
      localStorage.setItem('food_statistics', JSON.stringify(food))
      return
    }
    found = food.casual.findIndex(equalTime)
    if (found != -1) {
      food.casual.splice(found, 1)
      localStorage.setItem('food_statistics', JSON.stringify(food))
      return
    }

    var exercises = ExerciseHelper.getStatistics()
    found = exercises.findIndex(equalTime)
    if (found != -1) {
      exercises.splice(found, 1)
      localStorage.setItem('exercise_statistics', JSON.stringify(exercises))
      return
    }
  }
}
