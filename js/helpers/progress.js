import Identifiers from '../helpers/identifiers.js'

const ProgressCompanion = {
  maxWater: '12',
  maxCalories: '3000',
  maxCarbs: '325',
  maxProteins: '56',
  maxFat: '77',
  maxExercises: '1',
  maxSleep: '9'
}

class DayHelper {
  constructor(dateId) {
    this.dateId = dateId
  }
  getProgress() {
    return ((parseInt(localStorage.getItem(this.dateId + '_water'), 10) || 0) / ProgressCompanion.maxWater
    + (parseInt(localStorage.getItem(this.dateId + '_calories'), 10) || 0) / ProgressCompanion.maxCalories
    + (parseInt(localStorage.getItem(this.dateId + '_carbs'), 10) || 0) / ProgressCompanion.maxCarbs
    + (parseInt(localStorage.getItem(this.dateId + '_proteins'), 10) || 0) / ProgressCompanion.maxProteins
    + (parseInt(localStorage.getItem(this.dateId + '_fat'), 10) || 0) / ProgressCompanion.maxFat
    + (parseInt(localStorage.getItem(this.dateId + '_exercises'), 10) || 0) / ProgressCompanion.maxExercises
    + (parseInt(localStorage.getItem(this.dateId + '_sleep'), 10) || 0) / ProgressCompanion.maxSleep) / 7
  }
}

class WeekHelper {
  constructor(dateId) {
    this.dateId = dateId
  }
  forDayInWeek(action) {
    var date = Identifiers.dateIdToDate(this.dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (var i = 0; i < 7; i++) {
      action(date)
      date.setDate(date.getDate() + 1)
    }
  }
  getProgress() {
    var progress = 0
    var dayHelper = null
    this.forDayInWeek(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.getProgress()
    })
    return progress / 7
  }
  getWaterProgress() {
    var progress = 0
    this.forDayInWeek(date => {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_water'), 10) || 0
    })
    return progress / (ProgressCompanion.maxWater * 7)
  }
  getFoodProgress() {
    var progress = 0
    var dateId = null
    this.forDayInWeek(date => {
      dateId = Identifiers.getDateId(date)
      progress += ((parseInt(localStorage.getItem(dateId + '_calories'), 10) || 0) / ProgressCompanion.maxCalories
      + (parseInt(localStorage.getItem(dateId + '_carbs'), 10) || 0) / ProgressCompanion.maxCarbs
      + (parseInt(localStorage.getItem(dateId + '_proteins'), 10) || 0) / ProgressCompanion.maxProteins
      + (parseInt(localStorage.getItem(dateId + '_fat'), 10) || 0) / ProgressCompanion.maxFat)
    })
    return progress / (4 * 7)
  }
  getExercisesProgress() {
    var progress = 0
    this.forDayInWeek(date => {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_exercises'), 10) || 0
    })
    return progress / (ProgressCompanion.maxExercises * 7)
  }
  getSleepProgress() {
    var progress = 0
    this.forDayInWeek(date => {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_sleep'), 10) || 0
    })
    return progress / (ProgressCompanion.maxSleep * 7)
  }
}

class MonthHelper {
  constructor(dateId) {
    this.dateId = dateId
  }
  forDayInMonth(action) {
    var days = 0
    var date = Identifiers.dateIdToDate(this.dateId)
    var month = date.getMonth()
    date.setDate(1)
    while (date.getMonth() == month) {
      action(date)
      days++
      date.setDate(date.getDate() + 1)
    }
    return days
  }
  getProgress() {
    var progress = 0
    var dayHelper = null
    var days = this.forDayInMonth(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.getProgress()
    })
    return progress / days
  }
  getWaterProgress() {
    var progress = 0
    var days = this.forDayInMonth(date => {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_water'), 10) || 0
    })
    return progress / (ProgressCompanion.maxWater * days)
  }
  getFoodProgress() {
    var progress = 0
    var dateId = null
    var days = this.forDayInMonth(date => {
      dateId = Identifiers.getDateId(date)
      progress += ((parseInt(localStorage.getItem(dateId + '_calories'), 10) || 0) / ProgressCompanion.maxCalories
      + (parseInt(localStorage.getItem(dateId + '_carbs'), 10) || 0) / ProgressCompanion.maxCarbs
      + (parseInt(localStorage.getItem(dateId + '_proteins'), 10) || 0) / ProgressCompanion.maxProteins
      + (parseInt(localStorage.getItem(dateId + '_fat'), 10) || 0) / ProgressCompanion.maxFat)
    })
    return progress / (4 * days)
  }
  getExercisesProgress() {
    var progress = 0
    var days = this.forDayInMonth(date => {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_exercises'), 10) || 0
    })
    return progress / (ProgressCompanion.maxExercises * days)
  }
  getSleepProgress() {
    var progress = 0
    var days = this.forDayInMonth(date => {
      progress += parseInt(localStorage.getItem(Identifiers.getDateId(date) + '_sleep'), 10) || 0
    })
    return progress / (ProgressCompanion.maxSleep * days)
  }
}

export {
  ProgressCompanion, DayHelper, WeekHelper, MonthHelper
}
