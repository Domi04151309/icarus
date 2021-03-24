import FoodHelper from './food.js'
import ExerciseHelper from './exercises.js'

export default {
  getMotivationQuota() {
    return FoodHelper.getFoodStatistics().healthy + ExerciseHelper.getStatistics()
  }
}
