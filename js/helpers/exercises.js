export default {
  getScore(exercise) {
    var parameters = null
    var stored = localStorage.getItem('fitness')
    if (stored === null) return 0
    else parameters = JSON.parse(stored)

    var parameterList = ['muscleGain', 'cardio', 'endurance', 'arms', 'shoulders', 'back', 'chest', 'abs', 'booty', 'legs']
    var score = 100 * parameterList.length
    parameterList.forEach(item => {
      score += parseInt(parameters[item], 10) * exercise[item]
    })
    score /= 100

    return score
  }
}
