import Identifiers from './identifiers.js'
import JsonHelper from './json.js'

const ProgressCompanion = {
  maxWater: '12',
  maxCalories: '3000',
  maxCarbs: '325',
  maxProteins: '56',
  maxFat: '77',
  maxExercises: '1',
  maxSleep: '9'
}

const DefaultObject = {
  water: 0,
  calories: 0,
  carbs: 0,
  proteins: 0,
  fat: 0,
  exercises: 0,
  sleep: 0
}

class DayHelper {
  constructor(dateId) {
    this.dateId = dateId
    this.progress = JsonHelper.getData(dateId, () => DefaultObject)
  }
  saveProgress() {
    localStorage.setItem(this.dateId, JSON.stringify(this.progress))
  }
  getProgress() {
    return (this.progress.water / ProgressCompanion.maxWater
    + this.progress.calories / ProgressCompanion.maxCalories
    + this.progress.carbs / ProgressCompanion.maxCarbs
    + this.progress.proteins / ProgressCompanion.maxProteins
    + this.progress.fat / ProgressCompanion.maxFat
    + this.progress.exercises / ProgressCompanion.maxExercises
    + this.progress.sleep / ProgressCompanion.maxSleep) / 7
  }
  getFoodProgress() {
    return (this.progress.calories / ProgressCompanion.maxCalories
    + this.progress.carbs / ProgressCompanion.maxCarbs
    + this.progress.proteins / ProgressCompanion.maxProteins
    + this.progress.fat / ProgressCompanion.maxFat) / 4
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
    var dayHelper = null
    this.forDayInWeek(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.progress.water
    })
    return progress / (ProgressCompanion.maxWater * 7)
  }
  getFoodProgress() {
    var progress = 0
    var dayHelper = null
    this.forDayInWeek(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.getFoodProgress()
    })
    return progress / 7
  }
  getExercisesProgress() {
    var progress = 0
    var dayHelper = null
    this.forDayInWeek(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.progress.exercises
    })
    return progress / (ProgressCompanion.maxExercises * 7)
  }
  getSleepProgress() {
    var progress = 0
    var dayHelper = null
    this.forDayInWeek(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.progress.sleep
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
    var dayHelper = null
    var days = this.forDayInMonth(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.progress.water
    })
    return progress / (ProgressCompanion.maxWater * days)
  }
  getFoodProgress() {
    var progress = 0
    var dayHelper = null
    var days = this.forDayInMonth(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.getFoodProgress()
    })
    return progress / (4 * days)
  }
  getExercisesProgress() {
    var progress = 0
    var dayHelper = null
    var days = this.forDayInMonth(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.progress.exercises
    })
    return progress / (ProgressCompanion.maxExercises * days)
  }
  getSleepProgress() {
    var progress = 0
    var dayHelper = null
    var days = this.forDayInMonth(date => {
      dayHelper = new DayHelper(Identifiers.getDateId(date))
      progress += dayHelper.progress.sleep
    })
    return progress / (ProgressCompanion.maxSleep * days)
  }
}

export {
  ProgressCompanion, DayHelper, WeekHelper, MonthHelper
}
