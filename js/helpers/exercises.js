import JsonHelper from './json.js'

import Exercises from '../data/exercises.js'

const EXERCISE_PARAMETERS = 'fitness'
const EXERCISE_SCORES = 'exercise_scores'
const EXERCISE_RECENTS = 'exercise_recents'
const PARAMETER_LIST = ['muscleGain', 'cardio', 'endurance', 'arms', 'shoulders', 'back', 'chest', 'abs', 'booty', 'legs']

export default {
  getRecommended() {
    var images = ['./images/exercises/cycling.jpg', './images/setup/welcome.jpg', './images/setup/info.jpg', './images/setup/finish.jpg']
    var exercises = []
    var scores = JsonHelper.getData(EXERCISE_SCORES, () => this.generateNewScores())
    var recents = JsonHelper.getData(EXERCISE_RECENTS, () => [])
    recents.forEach(item => {
      scores[item[0]][item[1]] = []
    })
    scores.forEach((category, i) => {
      category.forEach((exercise, j) => {
        var k = exercise.indexOf(Math.max(...exercise))
        if (k != -1) exercises.push({
          score: scores[i][j][k],
          posX: i,
          posY: j,
          posZ: k
        })
      })
    })
    exercises.sort((a, b) => b.score - a.score)
    exercises = exercises.splice(0, 4)
    exercises.forEach((item, i) => {
      item.title = Exercises[item.posX].exercises[item.posY].title
      item.image = images[i]
    })
    return exercises
  },
  addRecentExercise(position) {
    var recents = JsonHelper.getData(EXERCISE_RECENTS, () => [])
    recents.unshift(position)
    localStorage.setItem(EXERCISE_RECENTS, JSON.stringify(recents.slice(0, 8)))
  },
  getScore(posX, posY, posZ) {
    try {
      return JsonHelper.getData(EXERCISE_SCORES, () => this.generateNewScores())[posX][posY][posZ]
    } catch {
      return this.generateNewScores()[posX][posY][posZ]
    }
  },
  categoryScore(posX, posY) {
    var scores = JsonHelper.getData(EXERCISE_SCORES, () => this.generateNewScores())[posX]
    var score = 0
    scores[posY].forEach(item => {
      score += item
    })
    return score / scores[posY].length
  },
  generateNewScores() {
    var categoryArray = []
    var exerciseArray = []
    var variationArray = []
    Exercises.forEach(category => {
      exerciseArray = []
      category.exercises.forEach(exercise => {
        variationArray = []
        exercise.variations.forEach(innerItem => {
          variationArray.push(this.calculateScore(innerItem))
        })
        exerciseArray.push(variationArray)
      })
      categoryArray.push(exerciseArray)
    })
    localStorage.setItem(EXERCISE_SCORES, JSON.stringify(categoryArray))
    return categoryArray
  },
  calculateScore(exercise) {
    var parameters = JsonHelper.getData(EXERCISE_PARAMETERS, () => 0)
    
    var score = 100 * PARAMETER_LIST.length
    PARAMETER_LIST.forEach(item => {
      score += parseInt(parameters[item], 10) * exercise[item]
    })
    score /= 100

    return score
  }
}
