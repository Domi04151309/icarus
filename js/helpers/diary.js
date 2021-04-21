import ExerciseHelper from '../helpers/exercises.js'
import FoodHelper from '../helpers/food.js'
import IndefiniteArticle from '../helpers/indefinite-article.js'

export default {
  getItems() {
    var items = []
    var food = FoodHelper.getFoodStatistics()
    food.healthy.forEach(item => {
      if (item.item != null) item.type = `You ate ${IndefiniteArticle(item.item.title)} ${item.item.title.toLowerCase()}`
      else item.type = 'You ate something healthy'
      item.icon = 'restaurant_menu'
      item.details = 'You gained one extra point with this item!'
      items.push(item)
    })
    food.casual.forEach(item => {
      if (item.item != null) item.type = `You ate ${IndefiniteArticle(item.item.title)} ${item.item.title.toLowerCase()}`
      else item.type = 'You ate something casual'
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
    var food = FoodHelper.getFoodStatistics()
    for (let i = 0; i < food.healthy.length; i++) {
      if (food.healthy[i].time == time) {
        food.healthy.splice(i, 1)
        localStorage.setItem('food-statistics', JSON.stringify(food))
        return
      }
    }
    for (let i = 0; i < food.casual.length; i++) {
      if (food.casual[i].time == time) {
        food.casual.splice(i, 1)
        localStorage.setItem('food-statistics', JSON.stringify(food))
        return
      }
    }
    var exercises = ExerciseHelper.getStatistics()
    for (let i = 0; i < exercises.length; i++) {
      if (exercises[i].time == time) {
        exercises.splice(i, 1)
        localStorage.setItem('exercise_statistics', JSON.stringify(exercises))
        return
      }
    }
  }
}
