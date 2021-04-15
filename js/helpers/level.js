import FoodHelper from './food.js'
import ExerciseHelper from './exercises.js'

export default {
  getExp() {
    return FoodHelper.getFoodStatistics().healthy.length + ExerciseHelper.getStatistics().length
  },
  getNearestPowerOf2(n) {
    return 1 << 31 - Math.clz32(n)
  },
  getLevelData() {
    var exp = this.getExp()
    var nearestPowerOf2 = this.getNearestPowerOf2(exp)
    return {
      level: Math.log2(nearestPowerOf2),
      sectionExp: exp - nearestPowerOf2,
      totalExp: exp,
      neededSectionExp: Math.pow(Math.log2(nearestPowerOf2) + 1, 2) - nearestPowerOf2,
      neededTotalExp: Math.pow(Math.log2(nearestPowerOf2) + 1, 2)
    }
  }
}
