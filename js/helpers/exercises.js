export default {
  getScore(exercise) {
    var parameters = null
    var stored = localStorage.getItem('fitness')
    if (stored === null) return 0
    else parameters = JSON.parse(stored)

    var score = 0
    score += parseInt(parameters.muscleGain, 10) * exercise.muscleGain
    score += parseInt(parameters.cardio, 10) * exercise.cardio
    score += parseInt(parameters.endurance, 10) * exercise.endurance
    score += parseInt(parameters.arms, 10) * exercise.arms
    score += parseInt(parameters.shoulders, 10) * exercise.shoulders
    score += parseInt(parameters.back, 10) * exercise.back
    score += parseInt(parameters.chest, 10) * exercise.chest
    score += parseInt(parameters.abs, 10) * exercise.abs
    score += parseInt(parameters.booty, 10) * exercise.booty
    score += parseInt(parameters.legs, 10) * exercise.legs

    return score
  }
}
