import Identifiers from './identifiers.js'
import JsonHelper from './json.js'

const ProgressCompanion = {
  maxWater: 16,
  maxCalories: 2500,
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
  return keys.reduce((acc, key) => acc + progressObj[key] / companionObj['max' + key.charAt(0).toUpperCase() + key.slice(1)], 0) / keys.length
}

class DayHelper {
  constructor(dateId) {
    this.dateId = dateId
    this.progress = JsonHelper.getData(dateId, () => DefaultObject)
  }
  saveProgress() {
    localStorage.setItem(this.dateId, JSON.stringify(this.progress))
  }
  getWaterProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['water'])
  }
  getFoodProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['calories', 'fat', 'carbs', 'proteins'])
  }
  getExerciseProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['exercises'])
  }
  getSleepProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['sleep'])
  }
  getProgress() {
    return (this.getWaterProgress() + this.getFoodProgress() + this.getExerciseProgress() + this.getSleepProgress()) / 4
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
  getWeeksProgress(action) {
    var progress = 0
    this.forDayInWeek(date => {
      progress += action(new DayHelper(Identifiers.getDateId(date)))
    })
    return progress / 7
  }
  getProgress() {
    return this.getWeeksProgress(helper => helper.getProgress())
  }
  getWaterProgress() {
    return this.getWeeksProgress(helper => helper.getWaterProgress())
  }
  getFoodProgress() {
    return this.getWeeksProgress(helper => helper.getFoodProgress())
  }
  getExerciseProgress() {
    return this.getWeeksProgress(helper => helper.getExerciseProgress())
  }
  getSleepProgress() {
    return this.getWeeksProgress(helper => helper.getSleepProgress())
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
  getMonthsProgress(action) {
    var progress = 0
    var days = this.forDayInMonth(date => {
      progress += action(new DayHelper(Identifiers.getDateId(date)))
    })
    return progress / days
  }
  getProgress() {
    return this.getMonthsProgress(helper => helper.getProgress())
  }
  getWaterProgress() {
    return this.getMonthsProgress(helper => helper.getWaterProgress())
  }
  getFoodProgress() {
    return this.getMonthsProgress(helper => helper.getFoodProgress())
  }
  getExerciseProgress() {
    return this.getMonthsProgress(helper => helper.getExerciseProgress())
  }
  getSleepProgress() {
    return this.getMonthsProgress(helper => helper.getSleepProgress())
  }
}

export {
  ProgressCompanion, DayHelper, WeekHelper, MonthHelper
}
