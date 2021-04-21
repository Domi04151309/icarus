import Identifiers from './identifiers.js'
import JsonHelper from './json.js'

const ProgressCompanion = {
  maxWater: 12,
  maxCalories: 3000,
  maxFat: 77,
  maxCarbs: 325,
  maxProteins: 56,
  maxExercises: 1,
  maxSleep: 9
}

const DefaultObject = {
  water: 0,
  calories: 0,
  fat: 0,
  carbs: 0,
  proteins: 0,
  exercises: 0,
  sleep: 0
}

function getAverageProgress(progressObj, companionObj, keys) {
  var progress = 0
  keys.forEach(key => {
    progress += progressObj[key] / companionObj['max' + key.charAt(0).toUpperCase() + key.slice(1)]
  })
  return progress / keys.length
}

class DayHelper {
  constructor(dateId) {
    this.dateId = dateId
    this.progress = JsonHelper.getData(dateId, () => DefaultObject)
  }
  saveProgress() {
    localStorage.setItem(this.dateId, JSON.stringify(this.progress))
  }
  getFoodProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['calories', 'fat', 'carbs', 'proteins'])
  }
  getProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['water', 'calories', 'fat', 'carbs', 'proteins', 'exercises', 'sleep'])
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
  forDayHelperInWeek(action) {
    this.forDayInWeek(date => action(new DayHelper(Identifiers.getDateId(date))))
  }
  getProgress() {
    var progress = 0
    this.forDayHelperInWeek(helper => {
      progress += helper.getProgress()
    })
    return progress / 7
  }
  getWaterProgress() {
    var progress = 0
    this.forDayHelperInWeek(helper => {
      progress += helper.progress.water
    })
    return progress / (ProgressCompanion.maxWater * 7)
  }
  getFoodProgress() {
    var progress = 0
    this.forDayHelperInWeek(helper => {
      progress += helper.getFoodProgress()
    })
    return progress / 7
  }
  getExercisesProgress() {
    var progress = 0
    this.forDayHelperInWeek(helper => {
      progress += helper.progress.exercises
    })
    return progress / (ProgressCompanion.maxExercises * 7)
  }
  getSleepProgress() {
    var progress = 0
    this.forDayHelperInWeek(helper => {
      progress += helper.progress.sleep
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
  forDayHelperInMonth(action) {
    return this.forDayInMonth(date => action(new DayHelper(Identifiers.getDateId(date))))
  }
  getProgress() {
    var progress = 0
    var days = this.forDayHelperInMonth(helper => {
      progress += helper.getProgress()
    })
    return progress / days
  }
  getWaterProgress() {
    var progress = 0
    var days = this.forDayHelperInMonth(helper => {
      progress += helper.progress.water
    })
    return progress / (ProgressCompanion.maxWater * days)
  }
  getFoodProgress() {
    var progress = 0
    var days = this.forDayHelperInMonth(helper => {
      progress += helper.getFoodProgress()
    })
    return progress / (4 * days)
  }
  getExercisesProgress() {
    var progress = 0
    var days = this.forDayHelperInMonth(helper => {
      progress += helper.progress.exercises
    })
    return progress / (ProgressCompanion.maxExercises * days)
  }
  getSleepProgress() {
    var progress = 0
    var days = this.forDayHelperInMonth(helper => {
      progress += helper.progress.sleep
    })
    return progress / (ProgressCompanion.maxSleep * days)
  }
}

export {
  ProgressCompanion, DayHelper, WeekHelper, MonthHelper
}
