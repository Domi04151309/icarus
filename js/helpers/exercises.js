import JsonHelper from './json.js'

import Exercises from '../data/exercises.js'

const PARAMETERS = 'fitness'
const SCORES = 'exercise_scores'
const RECENTS = 'exercise_recents'
const STATISTICS = 'exercise_statistics'
const PARAMETER_LIST = ['muscleGain', 'cardio', 'endurance', 'arms', 'shoulders', 'back', 'chest', 'abs', 'booty', 'legs']

export default {
  getRecommended() {
    const images = ['./images/exercises/hiking.jpg', './images/setup/welcome.jpg', './images/setup/info.jpg', './images/setup/finish.jpg']
    const scores = JsonHelper.get(SCORES, () => this.generateNewScores())
    const recents = JsonHelper.get(RECENTS, () => [])
    let exercises = []
    recents.forEach(item => {
      scores[item[0]][item[1]] = []
    })
    scores.forEach((category, i) => {
      category.forEach((exercise, j) => {
        let k = exercise.indexOf(exercise.reduce((a, b) => a >b ? a : b, 0))
        if (k != -1) exercises.push({
          score: scores[i][j][k],
          posX: i,
          posY: j,
          posZ: k
        })
      })
    })
    exercises.sort((a, b) => b.score - a.score)
    exercises = exercises.slice(0, 4)
    exercises.forEach((item, i) => {
      item.title = Exercises[item.posX].exercises[item.posY].title
      item.image = images[i]
    })
    return exercises
  },
  addRecent(position) {
    const recents = JsonHelper.get(RECENTS, () => [])
    recents.unshift(position)
    JsonHelper.set(RECENTS, recents.slice(0, 8))
  },
  getStatistics() {
    return JsonHelper.get(STATISTICS, () => [])
  },
  addExerciseToStatistic(item = null) {
    const date = new Date()
    const array = this.getStatistics()
    array.push({
      time: date.getTime(),
      item: item
    })
    JsonHelper.set(STATISTICS, array)
  },
  getScore(posX, posY, posZ) {
    try {
      return JsonHelper.get(SCORES, () => this.generateNewScores())[posX][posY][posZ]
    } catch {
      return this.generateNewScores()[posX][posY][posZ]
    }
  },
  categoryScore(posX, posY) {
    try {
      const scores = JsonHelper.get(SCORES, () => this.generateNewScores())[posX][posY]
      return scores.reduce((acc, item) => acc + item) / scores.length
    } catch(e) {
      this.generateNewScores()
      return this.categoryScore(posX, posY)
    }
  },
  generateNewScores() {
    const categoryArray = []
    let exerciseArray = []
    let variationArray = []
    Exercises.forEach(category => {
      exerciseArray = []
      category.exercises.forEach(exercise => {
        variationArray = []
        exercise.variations.forEach(innerItem => {
          if (category.title == 'HIIT') variationArray.push(0)
          else variationArray.push(this.calculateScore(innerItem))
        })
        exerciseArray.push(variationArray)
      })
      categoryArray.push(exerciseArray)
    })
    JsonHelper.set(SCORES, categoryArray)
    return categoryArray
  },
  calculateScore(exercise) {
    const parameters = JsonHelper.get(PARAMETERS, () => 0)

    let score = 100 * PARAMETER_LIST.length
    score += PARAMETER_LIST.reduce((acc, item) => acc + parseInt(parameters[item], 10) * exercise[item], 0)

    return score / 100
  }
}
