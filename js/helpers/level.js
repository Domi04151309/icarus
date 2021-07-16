import FoodHelper from './food.js'
import ExerciseHelper from './exercises.js'

export default {
  getExp() {
    return 1 + FoodHelper.getFoodStatistics().healthy.length * 2 + ExerciseHelper.getStatistics().reduce((acc, item) => acc + (item.item.exp || 2), 0)
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
      neededSectionExp: nearestPowerOf2,
      neededTotalExp: nearestPowerOf2 << 1
    }
  }
}
