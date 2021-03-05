import Exercises from '../data/exercises.js'

const EXERCISE_SCORES = 'exercise_scores'
const PARAMETER_LIST = ['muscleGain', 'cardio', 'endurance', 'arms', 'shoulders', 'back', 'chest', 'abs', 'booty', 'legs']

export default {
  getScore(posX, posY) {
    var scores = null
    var stored = localStorage.getItem(EXERCISE_SCORES)
    if (stored == null) scores = this.generateNewScores()
    else scores = JSON.parse(stored)
    return scores[posX][posY]
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
