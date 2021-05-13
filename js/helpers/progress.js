import Identifiers from './identifiers.js'
import JsonHelper from './json.js'

const ProgressCompanion = {
  maxWater: 16,
  maxCalories: 2500,
  maxFat: 77,
  maxCarbs: 325,
  maxProteins: 56,
  maxExercises: 1,
  maxYoga: 1,
  maxSleep: 9,
  maxMeditation: 1
}

function getDefaultObject() {
  return {
    water: 0,
    calories: 0,
    fat: 0,
    carbs: 0,
    proteins: 0,
    exercises: 0,
    yoga: 0,
    sleep: 0,
    meditation: 0
  }
}

function getAverageProgress(progressObj, companionObj, keys) {
  return keys.reduce((acc, key) => acc + (progressObj[key] || 0) / companionObj['max' + key.charAt(0).toUpperCase() + key.slice(1)], 0) / keys.length
}

class DayHelper {
  constructor(dateId = Identifiers.getDateId()) {
    this.dateId = dateId
    this.progress = JsonHelper.get(dateId, getDefaultObject)
  }
  saveProgress() {
    JsonHelper.set(this.dateId, this.progress)
  }
  getSleepProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['sleep'])
  }
  getWaterProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['water'])
  }
  getFoodProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['calories', 'fat', 'carbs', 'proteins'])
  }
  getExerciseProgress() {
    return getAverageProgress(this.progress, ProgressCompanion, ['exercises', 'yoga']) * 2
  }
  getProgress() {
    return (2 * this.getSleepProgress() + 2 * this.getWaterProgress() + 2 * this.getFoodProgress() + this.getExerciseProgress()) / 7
  }
}

class WeekHelper {
  constructor(dateId = Identifiers.getDateId()) {
    this.dateId = dateId
  }
  forDayInWeek(action) {
    const date = Identifiers.dateIdToDate(this.dateId)
    date.setDate((date.getDate() - date.getDay()))
    for (let i = 0; i < 7; i++) {
      action(date)
      date.setDate(date.getDate() + 1)
    }
  }
  getWeeksProgress(action) {
    let progress = 0
    this.forDayInWeek(date => {
      progress += action(new DayHelper(Identifiers.getDateId(date)))
    })
    return progress / 7
  }
  getProgress() {
    return this.getWeeksProgress(helper => helper.getProgress())
  }
  getSleepProgress() {
    return this.getWeeksProgress(helper => helper.getSleepProgress())
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
}

class MonthHelper {
  constructor(dateId = Identifiers.getDateId()) {
    this.dateId = dateId
  }
  forDayInMonth(action) {
    const date = Identifiers.dateIdToDate(this.dateId)
    const month = date.getMonth()
    let days = 0
    date.setDate(1)
    while (date.getMonth() == month) {
      action(date)
      days++
      date.setDate(date.getDate() + 1)
    }
    return days
  }
  getMonthsProgress(action) {
    let progress = 0
    const days = this.forDayInMonth(date => {
      progress += action(new DayHelper(Identifiers.getDateId(date)))
    })
    return progress / days
  }
  getProgress() {
    return this.getMonthsProgress(helper => helper.getProgress())
  }
  getSleepProgress() {
    return this.getMonthsProgress(helper => helper.getSleepProgress())
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
}

const Achievement = {
  show(message = '') {
    navigator.vibrate(1)

    const node = document.createElement('div')
    node.classList.add('card', 'achievement', 'normal')

    const icon = document.createElement('span')
    icon.classList.add('material-icons-round')
    icon.appendChild(document.createTextNode('emoji_events'))

    node.appendChild(icon)
    node.appendChild(document.createTextNode(message))
    document.body.appendChild(node)

    setTimeout(() => {
      node.classList.remove('normal')
    }, 1000)
    setTimeout(() => {
      node.classList.add('reverse')
    }, 5000)
    setTimeout(() => {
      node.remove()
    }, 6000)
  }
}

export {
  ProgressCompanion, DayHelper, WeekHelper, MonthHelper, Achievement
}
