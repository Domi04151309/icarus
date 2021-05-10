import FoodHelper from './food.js'
import ExerciseHelper from './exercises.js'

export default {
  getExp() {
    return FoodHelper.getFoodStatistics().healthy.length + ExerciseHelper.getStatistics().length + 1
  },
  getNearestPowerOf2(n) {
    return 1 << 31 - Math.clz32(n)
  },
  getLevelData() {
    const exp = this.getExp()
    const nearestPowerOf2 = this.getNearestPowerOf2(exp)
    return {
      level: Math.log2(nearestPowerOf2),
      sectionExp: exp - nearestPowerOf2,
      totalExp: exp,
      neededSectionExp: Math.pow(2, Math.log2(nearestPowerOf2) + 1) - nearestPowerOf2,
      neededTotalExp: Math.pow(2, Math.log2(nearestPowerOf2) + 1)
    }
  }
}
