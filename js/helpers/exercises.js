import JsonHelper from './json.js'

import Exercises from '../data/exercises.js'

const PARAMETERS = 'fitness'
const SCORES = 'exercise_scores'
const RECENTS = 'exercise_recents'
const STATISTICS = 'exercise_statistics'
const PARAMETER_LIST = ['muscleGain', 'cardio', 'endurance', 'arms', 'shoulders', 'back', 'chest', 'abs', 'booty', 'legs']

export default {
  getRecommended() {
    var images = ['./images/exercises/hiking.jpg', './images/setup/welcome.jpg', './images/setup/info.jpg', './images/setup/finish.jpg']
    var exercises = []
    var scores = JsonHelper.getData(SCORES, () => this.generateNewScores())
    var recents = JsonHelper.getData(RECENTS, () => [])
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
    var recents = JsonHelper.getData(RECENTS, () => [])
    recents.unshift(position)
    localStorage.setItem(RECENTS, JSON.stringify(recents.slice(0, 8)))
  },
  getStatistics() {
    return JsonHelper.getData(STATISTICS, () => [])
  },
  addExerciseToStatistic(item = null) {
    var date = new Date()
    var array = this.getStatistics()
    array.push({
      time: date.getTime(),
      item: item
    })
    localStorage.setItem(STATISTICS, JSON.stringify(array))
  },
  getScore(posX, posY, posZ) {
    try {
      return JsonHelper.getData(SCORES, () => this.generateNewScores())[posX][posY][posZ]
    } catch {
      return this.generateNewScores()[posX][posY][posZ]
    }
  },
  categoryScore(posX, posY) {
    var scores = JsonHelper.getData(SCORES, () => this.generateNewScores())[posX]
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
    localStorage.setItem(SCORES, JSON.stringify(categoryArray))
    return categoryArray
  },
  calculateScore(exercise) {
    var parameters = JsonHelper.getData(PARAMETERS, () => 0)

    var score = 100 * PARAMETER_LIST.length
    PARAMETER_LIST.forEach(item => {
      score += parseInt(parameters[item], 10) * exercise[item]
    })
    score /= 100

    return score
  }
}
