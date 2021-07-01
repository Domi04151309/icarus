import JsonHelper from './json.js'

import Workouts from '../data/workouts.js'

const PARAMETERS = 'fitness'
const SCORES = 'workout_scores'
const PARAMETER_LIST = ['muscleGain', 'cardio', 'endurance', 'arms', 'shoulders', 'back', 'chest', 'abs', 'booty', 'legs']

export default {
  getRecommended() {
    const scores = JsonHelper.get(SCORES, () => this.generateNewScores())
    let workouts = JSON.parse(JSON.stringify(Workouts))
    workouts.forEach((category, i) => {
      category.types.forEach((type, j) => {
        type.pos = j
      })
      category.types.sort((a, b) => scores[i][b.pos] - scores[i][a.pos])
    })
    return workouts
  },
  getScore(posX, posY) {
    try {
      return JsonHelper.get(SCORES, () => this.generateNewScores())[posX][posY]
    } catch {
      return this.generateNewScores()[posX][posY]
    }
  },
  generateNewScores() {
    const categoryArray = []
    let typeArray = []
    Workouts.forEach(category => {
      typeArray = []
      category.types.forEach(type => {
        typeArray.push(this.calculateScore(type))
      })
      categoryArray.push(typeArray)
    })
    JsonHelper.set(SCORES, categoryArray)
    return categoryArray
  },
  calculateScore(workout) {
    const parameters = JsonHelper.get(PARAMETERS, () => 0)

    let score = 100 * PARAMETER_LIST.length
    score += PARAMETER_LIST.reduce((acc, item) => acc + parseInt(parameters[item], 10) * workout[item], 0)

    return score / 100
  }
}
