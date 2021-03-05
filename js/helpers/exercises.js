import Exercises from '../data/exercises.js'

const EXERCISE_SCORES = 'exercise_scores'
const PARAMETER_LIST = ['muscleGain', 'cardio', 'endurance', 'arms', 'shoulders', 'back', 'chest', 'abs', 'booty', 'legs']

export default {
  getScore(posX, posY) {
    return this.loadScores()[posX][posY]
  },
  categoryScore(posX) {
    var scores = this.loadScores()
    var score = 0
    scores[posX].forEach(item => {
      score += item
    })
    return score / scores[posX].length
  },
  loadScores() {
    var stored = localStorage.getItem(EXERCISE_SCORES)
    if (stored == null) return this.generateNewScores()
    else return JSON.parse(stored)
  },
  generateNewScores() {
    var array = []
    var innerArray = []
    Exercises.forEach(item => {
      innerArray = []
      item.variations.forEach(innerItem => {
        innerArray.push(this.calculateScore(innerItem))
      })
      array.push(innerArray)
    })
    localStorage.setItem(EXERCISE_SCORES, JSON.stringify(array))
    return array
  },
  calculateScore(exercise) {
    var parameters = null
    var stored = localStorage.getItem('fitness')
    if (stored === null) return 0
    else parameters = JSON.parse(stored)

    var score = 100 * PARAMETER_LIST.length
    PARAMETER_LIST.forEach(item => {
      score += parseInt(parameters[item], 10) * exercise[item]
    })
    score /= 100

    return score
  }
}
