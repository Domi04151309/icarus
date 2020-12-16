import Identifiers from '../helpers/identifiers.js'

export default {
  maxWater: '12',
  maxCalories: '3000',
  maxCarbs: '325',
  maxProteins: '56',
  maxFat: '77',
  maxExercises: '1',
  maxSleep: '9',
  calculateDayProgress(dateId) {
    return ((parseInt(localStorage.getItem(dateId + '_water'), 10) || 0) / this.maxWater
    + (parseInt(localStorage.getItem(dateId + '_calories'), 10) || 0) / this.maxCalories
    + (parseInt(localStorage.getItem(dateId + '_carbs'), 10) || 0) / this.maxCarbs
    + (parseInt(localStorage.getItem(dateId + '_proteins'), 10) || 0) / this.maxProteins
    + (parseInt(localStorage.getItem(dateId + '_fat'), 10) || 0) / this.maxFat
    + (parseInt(localStorage.getItem(dateId + '_exercises'), 10) || 0) / this.maxExercises
    + (parseInt(localStorage.getItem(dateId + '_sleep'), 10) || 0) / this.maxSleep) / 7
  },
  calculateWeekProgress(dateId) {
    var progress = 0
    var date = Identifiers.dateIdToDate(dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (var i = 0; i < 7; i++) {
      progress += this.calculateDayProgress(Identifiers.getDateId(date))
      date.setDate(date.getDate() + 1)
    }
    progress /= 7
    return progress
  },
  calculateWeekWaterProgress(dateId) {
    var progress = 0
    var date = Identifiers.dateIdToDate(dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (var i = 0; i < 7; i++) {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_water'), 10) || 0
      date.setDate(date.getDate() + 1)
    }
    progress /= this.maxWater
    progress /= 7
    return progress
  },
  calculateWeekFoodProgress(dateId) {
    var progress = 0
    var date = Identifiers.dateIdToDate(dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (var i = 0; i < 7; i++) {
      progress += ((parseInt(localStorage.getItem(dateId + '_calories'), 10) || 0) / this.maxCalories
      + (parseInt(localStorage.getItem(dateId + '_carbs'), 10) || 0) / this.maxCarbs
      + (parseInt(localStorage.getItem(dateId + '_proteins'), 10) || 0) / this.maxProteins
      + (parseInt(localStorage.getItem(dateId + '_fat'), 10) || 0) / this.maxFat) / 4
      date.setDate(date.getDate() + 1)
    }
    progress /= 7
    return progress
  },
  calculateWeekExercisesProgress(dateId) {
    var progress = 0
    var date = Identifiers.dateIdToDate(dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (var i = 0; i < 7; i++) {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_exercises'), 10) || 0
      date.setDate(date.getDate() + 1)
    }
    progress /= this.maxExercises
    progress /= 7
    return progress
  },
  calculateWeekSleepProgress(dateId) {
    var progress = 0
    var date = Identifiers.dateIdToDate(dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (var i = 0; i < 7; i++) {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_sleep'), 10) || 0
      date.setDate(date.getDate() + 1)
    }
    progress /= this.maxSleep
    progress /= 7
    return progress
  },
  calculateMonthProgress(dateId) {
    var progress = 0
    var days = 0
    var date = Identifiers.dateIdToDate(dateId)
    var month = date.getMonth()
    date.setDate(1)
    while (date.getMonth() == month) {
      progress += this.calculateDayProgress(Identifiers.getDateId(date))
      days++
      date.setDate(date.getDate() + 1)
    }
    progress /= days
    return progress
  }
}
